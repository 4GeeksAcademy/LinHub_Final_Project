"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Language,Lesson,Module, Course, AvailableCourse, Question, Option, FriendshipRequest, Message, Chat
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from datetime import datetime
import math

import bcrypt
import firebase_admin
from firebase_admin import credentials, storage

cred = credentials.Certificate("./google-services.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': "linhub-68184.appspot.com"
})

bucket = storage.bucket()

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api, supports_credentials= True)



##### INFO DEL USER ACTUAL #####
@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    users = list(map(lambda x: x.serialize(), users))
    return jsonify(users), 200


#### USER INFO USING ID ######
@api.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    if user is None:
        raise APIException('User not found', status_code=404)
    return jsonify(user.serialize()), 200



#### LANGUAGES ####
@api.route('/languages', methods=['GET'])
def get_languages():
    languages = Language.query.all()
    languages = list(map(lambda x: x.serialize(), languages))
    return jsonify(languages), 200



## AVAILABLE COURSES ###
@api.route('/availableCourses', methods=['GET'])
def get_avilable_courses():
    courses_av = AvailableCourse.query.all()
    courses_av = list(map(lambda x: x.serialize(), courses_av))
    return jsonify(courses_av), 200



### OBTAIN LESSONS ###
@api.route('/lessons', methods=['GET'])
def get_lessons():
    lessons = Lesson.query.all()
    lessons = list(map(lambda x: x.serialize(), lessons))
    return jsonify(lessons), 200



### GET LESSONS AND USER INFORMATION ###
@api.route('/courseinfo')
@jwt_required()
def get_lessons_by_lang():
    user_email = get_jwt_identity()

    user = User.query.filter_by(email = user_email).one_or_none()

    if user is None:
        return jsonify({'msg': 'user not found'})

    course = Course.query.filter_by(user_id = user.id).first()

    available_course = db.session.query(AvailableCourse, Language.language_name, AvailableCourse.id, AvailableCourse.name)\
    .join(Language, AvailableCourse.language_id == Language.id)\
    .filter(AvailableCourse.id == course.available_course_id).one_or_none()
    
    course = {
        'language_name': available_course.language_name,
        'id': available_course.id,
        'name': available_course.name
    }

    lessons = db.session.query(Module, Lesson.id, Lesson.lesson_name, Lesson.description)\
    .join(Lesson, Module.id == Lesson.module_id)\
    .filter(Module.available_course_id == available_course.id).all()
    
    courses_lessons = []

    for lesson in lessons:
        lesson_dict = {
            'lesson_id': lesson.id,
            'lesson_name': lesson.lesson_name,
            'description': lesson.description
        }
        courses_lessons.append(lesson_dict)

    ultimo_wrong = user.last_wrong # Fecha y hora del último error
    ultimo_ingreso = datetime.now()  # Fecha y hora del último ingreso a la página de lecciones

    # Calcula la diferencia entre los dos datetimes
    diferencia = ultimo_ingreso - ultimo_wrong

    # Calcula las horas transcurridas
    horas_transcurridas = math.floor(diferencia.total_seconds() / 3600)
    
    if horas_transcurridas > 0 and user.lives < 100:
        if (user.lives + horas_transcurridas) > 100:
            user.lives = 100
            db.session.commit()
        else: 
            user.lives = user.lives + horas_transcurridas
            db.session.commit()

    returned_object = {
        'user': user.serialize(),
        'data': courses_lessons
    }

    return jsonify(returned_object)



### RECEIVED AND FRIEND REQUESTS FOR A USER ###
@api.route('/friends_and_requests', methods=['GET'])
@jwt_required()
def get_user_friends_and_requests():
    # Obtener el idioma nativo del usuario actual
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).one_or_none()

    if user is None:
        return jsonify({'msg': 'user not found'}), 404

    native_language = user.native_language_id

    # Obtener todas las solicitudes aceptadas y pendientes donde el usuario es remitente o receptor

    accepted_requests = FriendshipRequest.query.filter(
        (FriendshipRequest.sender_id == user.id) | (FriendshipRequest.receiver_id == user.id),
        FriendshipRequest.accepted == True
    ).all()

    friends = [
        request.sender.serialize() if request.sender_id != user.id else request.receiver.serialize()
        for request in accepted_requests
    ]

    pending_requests = FriendshipRequest.query.filter(
        (FriendshipRequest.sender_id == user.id) | (FriendshipRequest.receiver_id == user.id),
        FriendshipRequest.accepted == False
    ).all()

    # Obtener usuarios que quieran aprender el idioma nativo del usuario actual
    recommended_users = User.query.filter_by(learning_language_id=native_language)\
    .filter(
        ~User.id.in_([request.sender_id for request in accepted_requests]) &
        ~User.id.in_([request.receiver_id for request in accepted_requests]) &
        ~User.id.in_([request.sender_id for request in pending_requests]) &
        ~User.id.in_([request.receiver_id for request in pending_requests])
    ).limit(3).all()


    # Serializar resultados
    accepted_and_pending = {
        "friends": friends,
        "pending": [request.serialize() for request in pending_requests],
        "recommended_users": [user.serialize() for user in recommended_users]
    }

    return jsonify(accepted_and_pending), 200



### ACCEPT A FRIEND REQUEST ###
@api.route('/accept_requests/<int:request_id>', methods=['GET'])
@jwt_required()
def accept_requests(request_id):
    # Obtain all request where user is sender or receiver
    user_email = get_jwt_identity()

    user = User.query.filter_by(email = user_email).one_or_none()

    if user is None:
        return jsonify({'msg': 'user not found'}), 404

    request = FriendshipRequest.query.filter_by(id = request_id).one_or_none()

    if request is None:
        return jsonify({'msg': 'request not found'}), 404
    
    if request.accepted is True:
        return jsonify({'msg': 'Request already accepted'}), 404
    
    request.accepted = True

    db.session.commit()

    chat = Chat(user1_id = user.id, user2_id = request.sender_id)

    db.session.add(chat)
    db.session.commit()


    return jsonify({'msg': 'request accepted'}), 200



### SENDING A FRINED REQUEST ###
@api.route('/send_request/<int:receiver_id>', methods=['GET'])
@jwt_required()
def send_friend_request(receiver_id):
    # check if user exists
    user_email = get_jwt_identity()
    user = User.query.filter_by(email = user_email).one_or_none()

    if user is None:
        return jsonify({'msg': 'user not found'}), 404

    receiver = User.query.get(receiver_id)
    if receiver is None:
        return jsonify({'error': 'El usuario receptor no existe'}), 404
    print(receiver.id)

    # avoid duplicated request
    friend_request = FriendshipRequest.query.filter_by(sender_id = user.id, receiver_id=receiver_id).first()

    if friend_request is not None:
        return jsonify({'msg': 'already sent a request to this user, or is added'}), 404

    # create friend request
    friendship_request = FriendshipRequest(sender_id=user.id, receiver_id=receiver_id, timestamp=datetime.now())

    # Add friend request to the db
    db.session.add(friendship_request)
    db.session.commit()

    return jsonify({'message': 'Friendship request sent'}), 201


### ACCESS A CHAT
@api.route('/get_chat/<int:friend_id>', methods=['GET'])
@jwt_required()
def access_chat(friend_id):
    # check if user exists
    user_email = get_jwt_identity()
    user = User.query.filter_by(email = user_email).one_or_none()

    if user is None:
        return jsonify({'msg': 'user not found'}), 404

    chat = Chat.query.filter(
        ((Chat.user1_id == user.id) & (Chat.user2_id == friend_id)) |
        ((Chat.user1_id == friend_id) & (Chat.user2_id == user.id))
    ).one_or_none()

    if chat is None:
        return jsonify({'msg': 'chat not found'})

    return jsonify({'chat_id': chat.id}), 200


### ACCESS CHAT MESSAGES
@api.route('/get_messages/<int:chat_id>', methods=['GET'])
@jwt_required()
def access_msgs(chat_id):

    messages = Message.query.filter_by(chat_id = chat_id).all()

    if messages is None:
        return jsonify({'msg': 'chat_id not found'})

    return jsonify([message.serialize() for message in messages])


### GET THE QUESTION FROM A SELECTED LESSON
@api.route('/lesson_questions/<int:lesson_id>')
def get_questions_by_lesson(lesson_id):
    lesson = Lesson.query.filter_by(id = lesson_id).first()

    questions = Question.query.filter_by(lesson_id = lesson.id).all()

    if questions is None:
        return jsonify({'msg': 'no questions for the selected lesson'}), 404
    
    info = []

    for question in questions:
        options = db.session.query(Question, Option.id, Option.option).join(Question, Question.id == Option.question_id).filter(question.id == Option.question_id).all()
        question_dic = {
            "question_id": question.id,
            "question": question.question,
            "options": [{'id':option.id, 'option':option.option} for option in options]
        }
        info.append(question_dic)

    return jsonify(info)



### CORRECT OR INCORRECT CHECK ###
@api.route('/correct_option/<int:option_id>')
@jwt_required()
def correct_option(option_id):
    user_email = get_jwt_identity()

    user = User.query.filter_by(email = user_email).one_or_none()

    if user is None:
        return jsonify({'msg': 'user not found'})

    option = Option.query.filter_by(id = option_id).one_or_none()
    
    if option is None:
        return jsonify({'msg': 'option not found'}), 404
    
    if option.correct == False:
        if user.lives > 0: 
            user.lives = user.lives - 1
            user.last_wrong = datetime.now()
            db.session.commit()
        return jsonify({'msg': 'wrong answer'}), 400
    
    if option.correct == True:
        return jsonify({'msg': 'correct answer'}), 200



### CREATE A MODULE ###
@api.route('/module', methods=['POST'])
def create_module(): 
    request_body = request.get_json()
    if not request_body:
        return jsonify({"msg": "No data provided"}), 400

    course_id = request_body.get('course_id')
    module_name = request_body.get('module_name')
    new_module = Module(module_name = module_name, course_id = course_id)
    db.session.add(new_module)
    db.session.commit()
    return "Sucess", 200



### REGISTER A USER ###
@api.route('/register', methods=['POST'])
def create_user():
    db.session.begin()

    request_body = request.get_json()
    if not request_body:
        return jsonify({"msg": "No data provided"}), 400

    first_name = request_body.get('first_name')
    last_name = request_body.get('last_name')
    username = request_body.get('username')
    email = request_body.get('email')
    password = request_body.get('password')
    learning_language = request_body.get("learning_language")
    native_language = request_body.get("native_language")

    if not first_name or not last_name:
        return jsonify({"msg": "First name and last name are required"}), 400
    
    if not username:
        return jsonify({'msg': 'username required'}), 400
    
    if not email:
        return jsonify({'msg': 'email required'}), 400
    
    if not password:
        return jsonify({'msg': 'password required'}), 400
    
    if not learning_language:
        return jsonify({'msg': 'learning language required'}), 400
    
    if not native_language:
        return jsonify({'msg': 'native language required'}), 400
    
    password_in_bytes = bytes(password, 'utf-8')

    # Generating Salt
    salt = bcrypt.gensalt()

    # Hashing Password
    hash_password = bcrypt.hashpw(    
        password=password_in_bytes,
        salt=salt
    )

    check = bcrypt.checkpw(
            password = password_in_bytes,
            hashed_password = hash_password
        )

    new_user = User(
        first_name=first_name,
        last_name=last_name,
        username=username,
        email=email,
        password=hash_password.decode('utf-8'),
        salt=salt.decode('utf-8'),
        learning_language_id = learning_language,
        native_language_id = native_language
    )


    db.session.add(new_user)
    try:
        db.session.commit()

        id_user = db.session.query(User.id).order_by(User.id.desc()).first()[0]

        available_course = AvailableCourse.query.filter_by(language_id = learning_language).first()
        print(available_course)
        new_course = Course(available_course_id = available_course.id, user_id = id_user)
        db.session.add(new_course)

        try:
            db.session.commit()
        except Exception as e:
            db.session.delete(new_user)
            db.session.rollback()
            return jsonify({"msg": "Error creating course", "error": str(e)}), 404

        return jsonify([new_user.serialize(), {"hash": hash_password.decode('utf-8'), "salt": salt.decode('utf-8'), "check":check}]), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error creating user", "error": str(e)}), 400
    


### LOGIN A USER ### 
@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email or not password:
        return jsonify({'msg': 'email and password required'}), 400
    
    user = User.query.filter_by(email = email).one_or_none()
    
    if user != None:
        check = bcrypt.checkpw(bytes(password, 'utf-8'), bytes(user.password, 'utf-8'))
        if check:
            access_token = create_access_token(identity=email)

            # variables for last login and current login
            last_login = user.last_login
            current_login = datetime.now()

            # sustraction between last login and current
            difference = current_login - last_login 

            # calculate hours passed
            hours_passed = math.floor(difference.total_seconds() / 3600)

            if hours_passed < 24:
                pass
            elif hours_passed > 24 and hours_passed < 48:
                user.streak += 1
                user.last_login = datetime.now()
                db.session.commit()
            elif hours_passed >= 48:
                user.streak = 1
                user.last_login = datetime.now()
                db.session.commit()

            return jsonify({'token': access_token, 'identity': user.serialize()}), 200
        else:
            return jsonify({'msg': 'wrong password'}) , 404
    else:
        return jsonify({'msg': 'user not found'}), 404


@api.route('/currentUser', methods=['GET'])
@jwt_required()
def get_current_user():

    email = get_jwt_identity()
    user = User.query.filter_by(email=email).one_or_none() 

    if user is None:
        raise APIException('User not found', status_code=404)
    return jsonify(user.serialize()), 200


@api.route("/user", methods=["PUT"])
@jwt_required()
def update_user():
    

    first_name = request.json.get("first_name", None)
    password = request.json.get("password", None)
    username = request.json.get("username", None)



    email = get_jwt_identity()

    user = User.query.filter_by(email=email).one_or_none() 
    
    if user != None:
        if first_name != None: 
            user.first_name= first_name
        if password != None:    
            user.password= password
        if username != None:    
            user.username= username
     
        db.session.add(user)
        try:
            db.session.commit()
            return jsonify(user.serialize()), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"msg": "Error Updating user", "error": str(e)}), 500
        
    return jsonify({"msg": "User not found"}), 404  



### SAVE A SELECTED IMAGE ###
@api.route('/image', methods=["POST"])
@jwt_required()
def upload_file():
    
    image = request.files.get("image", None)
    print(request.files)
    if image == None:
        return 'No hay image en la peticion', 400

    # Subir la imagen al Bucket
    blob = bucket.blob(image.filename)
    blob.upload_from_file(image, content_type=image.content_type)
    blob.make_public()
    
    # Generar la URL permanente
    url = blob.public_url
    from urllib.parse import quote
    # Generar la URL permanente manualmente
    bucket_name = "linhub-68184.appspot.com"
    encoded_image_name = quote(image.filename)
    url = f'https://storage.googleapis.com/{bucket_name}/{encoded_image_name}'

    email = get_jwt_identity()

    user = User.query.filter_by(email=email).one_or_none() 

    if user != None:
        if url != None: 
            user.image= url

    db.session.add(user)
    try:
        db.session.commit()
        return jsonify(user.serialize()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error Updating user", "error": str(e)}), 500