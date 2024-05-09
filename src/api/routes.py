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
import os

from datetime import datetime
import math

import bcrypt
import firebase_admin
from firebase_admin import credentials, storage

google_services = "././src/front/google_services/google-services.json" if os.getenv("FLASK_DEBUG") == "1" else "/etc/secrets/google-services.json"

cred = credentials.Certificate(google_services)

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

    lessons = db.session.query(Module, Lesson.id, Lesson.lesson_name, Lesson.description, Lesson.progress_required)\
    .join(Lesson, Module.id == Lesson.module_id)\
    .filter(Module.available_course_id == available_course.id).all()
    
    courses_lessons = []

    for lesson in lessons:
        lesson_dict = {
            'lesson_id': lesson.id,
            'lesson_name': lesson.lesson_name,
            'description': lesson.description,
            'progress': lesson.progress_required
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
        'data': courses_lessons,
        'progress': course.progress
    }

    return jsonify(returned_object)

@api.route('/get_friends', methods=['GET'])
@jwt_required()
def get_friends():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).one_or_none()

    if user is None:
        return jsonify({'msg': 'user not found'}), 404

    friends = FriendshipRequest.query.filter(
        (FriendshipRequest.sender_id == user.id) | (FriendshipRequest.receiver_id == user.id),
        FriendshipRequest.accepted == True
    ).all()

    friends = [
        request.sender.serialize() if request.sender_id != user.id else request.receiver.serialize()
        for request in friends
    ]

    return jsonify(friends), 200

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

    if chat.user1_id == user.id:
        friend = chat.user2.serialize()
    else:
        friend = chat.user1.serialize()

    if chat is None:
        return jsonify({'msg': 'chat not found'})

    return jsonify({'chat_id': chat.id, 'user': friend}), 200

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
        course = Course.query.filter_by(user_id = user.id).one_or_none()

        if course is None:
            return jsonify({'msg':'could not find the module'})
        
        if str(option_id) not in course.progress.split(','):
            course.progress += f"{option_id},"
            db.session.commit()
            return jsonify({'msg': 'correct answer, progress updated'}), 200
        else:
            return jsonify({'msg': 'correct answer, question already answered before'}), 200        



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

    existing_email = User.query.filter_by(email=email).first()
    existing_username = User.query.filter_by(username=username).first()

    if existing_email:
        return jsonify({'msg': 'Email already exists'}), 409
    
    if existing_username:
         return jsonify({'msg': 'Username already exists'}), 409
    
    
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
            existing_user = User.query.filter_by(username=username).first()
            if existing_user is not None and existing_user.id != user.id:
                return jsonify({"msg": "Username already exists"}), 400
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


@api.route('/filldb')
def insert_test_languages():
    print("Creating languages")
    languages_arr = ["English", "Español"]

    for language in languages_arr:
        new_language = Language()
        new_language.language_name = language
        db.session.add(new_language)
        db.session.commit()
    
    print("Creating av_courses")

    languages = db.session.query(Language).all()

    for language in languages:
        new_course = AvailableCourse()
        new_course.name = language.language_name
        new_course.language_id = language.id
        db.session.add(new_course)
        db.session.commit()

    print("Creating modules")

    av_courses = db.session.query(AvailableCourse).all()

    for av_course in av_courses:
        new_module = Module()
        new_module.module_name = "First Steps" if av_course.name == "English" else "Primeros Pasos"
        new_module.available_course_id = av_course.id
        db.session.add(new_module)
        db.session.commit()

    print("Creating lessons")

    en_lessons = [
        {'title': "Start a conversation!", 'desc': "Start a conversation with someone and practice your conversations skills", 'progress': 0},
        {'title': "Introduce yourself!", 'desc': "Take the first step towards what could be a beautiful learning relationship.", 'progress': 2},
        {'title': "Talk about your hobbies!", 'desc': "Hobbies are part of us, what if you talk about them!", 'progress': 4},
        {'title': "Go out eating", 'desc': "I'm starting to get hungry, where do you think we should eat?", 'progress': 6},
        {'title': "Ask someone out!", 'desc': "I think we know each other well enough, I'm waiting for you to invite me out...", 'progress': 8},
        {'title': "Final Lesson", 'desc': "It's time to take the final step to talk to someone.", 'progress': 10},
    ]
    es_lessons = [
        {'title': "Empieza una conversacion!", 'desc': "Comienza una conversación con alguien y practica tus habilidades de conversación.", 'progress': 0},
        {'title': "Presentate!", 'desc': "Da el primer paso en lo que podria ser una linda relacion de aprenizaje", 'progress': 2},
        {'title': "Habla de tus hobbies", 'desc': "Los hobbies son parte de nosotros, que tal si hablas de ellos!", 'progress': 4},
        {'title': "Sal a comer algo!", 'desc': "Estoy empezando a tener hambre, donde crees que deberiamos comer?", 'progress': 6},
        {'title': "Invita a alguien a salir!", 'desc': "Creo que ya nos conocemos lo suficiente, estoy esperando a que me invites a salir...", 'progress': 8},
        {'title': "Leccion Final", 'desc': "Es tiempo de dar el ultimo paso para hablar con alguien", 'progress': 10},
    ]

    modules = db.session.query(Module).all()

    for module in modules:
        if module.available_course.name == "English":
            for lesson in en_lessons:
                new_lesson = Lesson()
                new_lesson.lesson_name = lesson["title"]
                new_lesson.description = lesson["desc"]
                new_lesson.progress_required = lesson['progress']
                new_lesson.module_id = module.id
                db.session.add(new_lesson)
                db.session.commit()
        else:
            for lesson in es_lessons:
                new_lesson = Lesson()
                new_lesson.lesson_name = lesson["title"]
                new_lesson.description = lesson["desc"]
                new_lesson.progress_required = lesson['progress']
                new_lesson.module_id = module.id
                db.session.add(new_lesson)
                db.session.commit()

    print("Creating questions")

    questions = [
        ["Hello, how are you?", "Hi, whats your name?"],
        ["Hello!", "How old are you?"],
        ["What do you like to do?", "Do you like to read?"],
        ["Would you like to order now?", "What would you like to eat?"],
        ["Do you want to do something?", "I'm sooo bored"],
        ["Do you want to do something?", "I'm sooo bored"],
        ["Hola! ¿Como estas?", "Hola, ¿como te llamas?"],
        ["Hola!", "¿Que edad tienes?"],
        ["¿Que te gusta hacer?", "¿Te gusta leer?"],
        ["¿Le gustaria ordenar ahora?", "¿Que le gustaria comer?"],
        ["¿Quieres hacer algo?", "Estoy taaan aburrido"],
        ["¿Quieres hacer algo?", "Estoy taaan aburrido"],
    ]

    lessons = db.session.query(Lesson).all()

    for lesson, question_set in zip(lessons, questions):
        for question_text in question_set:
            question = Question(question=question_text, lesson_id=lesson.id)
            db.session.add(question)
            db.session.commit()

    print("Creating options")
    
    questions = db.session.query(Question).all()
    option_sets = [
        [
            {"option": "Fine thank you, what about you", "correct": True},
            {"option": "No thanks", "correct": False},
            {"option": "Maybe later", "correct": False}
        ],
        [
            {"option": "My name is Valen", "correct": True},
            {"option": "No thanks", "correct": False},
            {"option": "Maybe later", "correct": False}
        ],
        [
            {"option": "Hello, nice to meet you", "correct": True},
            {"option": "No thanks", "correct": False},
            {"option": "Maybe later", "correct": False}
        ],
        [
            {"option": "I am 23 years old", "correct": True},
            {"option": "No thanks", "correct": False},
            {"option": "Maybe later", "correct": False}
        ],
        [
            {"option": "My name is samuel and i love to learn using linhub", "correct": True},
            {"option": "No thanks", "correct": False},
            {"option": "Maybe later", "correct": False}
        ],
        [
            {"option": "I'm more into movies hehe", "correct": True},
            {"option": "No thanks", "correct": False},
            {"option": "Maybe later", "correct": False}
        ],
        [
            {"option": "Yes, please", "correct": True},
            {"option": "No thanks", "correct": False},
            {"option": "Maybe later", "correct": False}
        ],
        [
            {"option": "I will have a pizza please", "correct": True},
            {"option": "No thanks", "correct": False},
            {"option": "Maybe later", "correct": False}
        ],
        [
            {"option": "Yes! let's go eating", "correct": True},
            {"option": "No thanks", "correct": False},
            {"option": "Maybe later", "correct": False}
        ],
        [
            {"option": "Would you like to netflix and chill?", "correct": True},
            {"option": "No thanks", "correct": False},
            {"option": "Maybe later", "correct": False}
        ],
        [
            {"option": "Yes! let's go eating", "correct": True},
            {"option": "No thanks", "correct": False},
            {"option": "Maybe later", "correct": False}
        ],
        [
            {"option": "Would you like to netflix and chill?", "correct": True},
            {"option": "No thanks", "correct": False},
            {"option": "Maybe later", "correct": False}
        ],
        [
            {"option": "Hola, todo bien", "correct": True},
            {"option": "Esternocleidomastoideo", "correct": False},
            {"option": "Paralelepipedo", "correct": False}
        ],
        [
            {"option": "Hola, me llamo luis, ¿y tu?", "correct": True},
            {"option": "Esternocleidomastoideo", "correct": False},
            {"option": "Paralelepipedo", "correct": False}
        ],
        [
            {"option": "Hola, que tal estas?", "correct": True},
            {"option": "Esternocleidomastoideo", "correct": False},
            {"option": "Paralelepipedo", "correct": False}
        ],
        [
            {"option": "Tengo 23 años, ¿y tu?", "correct": True},
            {"option": "Esternocleidomastoideo", "correct": False},
            {"option": "Paralelepipedo", "correct": False}
        ],
        [
            {"option": "Me encanta ver clases y cononcer gente en LinHub", "correct": True},
            {"option": "Esternocleidomastoideo", "correct": False},
            {"option": "Paralelepipedo", "correct": False}
        ],
        [
            {"option": "Soy mas de ver peliculas", "correct": True},
            {"option": "Esternocleidomastoideo", "correct": False},
            {"option": "Paralelepipedo", "correct": False}
        ],
        [
            {"option": "Si, quisiera ordenar pasta carbonara", "correct": True},
            {"option": "Esternocleidomastoideo", "correct": False},
            {"option": "Paralelepipedo", "correct": False}
        ],
        [
            {"option": "Quiero una pizza de peperoni", "correct": True},
            {"option": "Esternocleidomastoideo", "correct": False},
            {"option": "Paralelepipedo", "correct": False}
        ],
        [
            {"option": "Si! ¿Te apetece ir a nadar?", "correct": True},
            {"option": "Esternocleidomastoideo", "correct": False},
            {"option": "Paralelepipedo", "correct": False}
        ],
        [
            {"option": "Yo tambien! Salgamos a caminar un rato", "correct": True},
            {"option": "Esternocleidomastoideo", "correct": False},
            {"option": "Paralelepipedo", "correct": False}
        ],
        [
            {"option": "Si! ¿Te apetece ir a nadar?", "correct": True},
            {"option": "Esternocleidomastoideo", "correct": False},
            {"option": "Paralelepipedo", "correct": False}
        ],
        [
            {"option": "Yo tambien! Salgamos a caminar un rato", "correct": True},
            {"option": "Esternocleidomastoideo", "correct": False},
            {"option": "Paralelepipedo", "correct": False}
        ],
    ]

    for question, option_set in zip(questions, option_sets):
        for option_data in option_set:
            new_option = Option(option=option_data["option"], correct=option_data["correct"], question_id=question.id)
            db.session.add(new_option)
            db.session.commit()
    return jsonify({'msg': 'success'})


