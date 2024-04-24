"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Language,Lesson,Module, Course, AvailableCourse, Question, Option
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

#Obtener la informacion del usuario actual
@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    users = list(map(lambda x: x.serialize(), users))
    return jsonify(users), 200

@api.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    if user is None:
        raise APIException('User not found', status_code=404)
    return jsonify(user.serialize()), 200

@api.route('/languages', methods=['GET'])
def get_languages():
    languages = Language.query.all()
    languages = list(map(lambda x: x.serialize(), languages))
    return jsonify(languages), 200

@api.route('/availableCourses', methods=['GET'])
def get_avilable_courses():
    courses_av = AvailableCourse.query.all()
    courses_av = list(map(lambda x: x.serialize(), courses_av))
    return jsonify(courses_av), 200

# Obtain lessons
@api.route('/lessons', methods=['GET'])
def get_lessons():
    lessons = Lesson.query.all()
    lessons = list(map(lambda x: x.serialize(), lessons))
    return jsonify(lessons), 200

# Obtain Module
# @api.route('/module', methods=['GET'])
# def get_module():
#     module = Module.query.all()
#     module = list(map(lambda x: x.serialize(), module))
#     return jsonify(module), 200

# Get module lessons depending on the user
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

    lessons = db.session.query(Module, Lesson.id, Lesson.lesson_name)\
    .join(Lesson, Module.id == Lesson.module_id)\
    .filter(Module.available_course_id == available_course.id).all()
    
    courses_lessons = []

    for lesson in lessons:
        lesson_dict = {
            'lesson_id': lesson.id,
            'lesson_name': lesson.lesson_name,
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

# Get Questions from lesson
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

# Get Correct or Incorrect
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

# Crear Module
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

# Register End Point
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
            return jsonify({"msg": "Error creating course", "error": str(e)}), 500

        return jsonify([new_user.serialize(), {"hash": hash_password.decode('utf-8'), "salt": salt.decode('utf-8'), "check":check}]), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error creating user", "error": str(e)}), 500
    

# Login management end point    
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
   

    image = upload_file(request)  # Obtener la URL de la imagen
    if not image:
        return jsonify({"msg": "Error uploading image"}), 500


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
        if image != None: 
            user.image = image 

        db.session.add(user)
        try:
            db.session.commit()
            return jsonify(user.serialize()), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"msg": "Error Updating user", "error": str(e)}), 500
        
    return jsonify({"msg": "User not found"}), 404  


@api.route('/image', methods=["POST"])
def upload_file(request):
    
    image = request.files.get("image", None)

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

    # Retornar la URL permanente
    return jsonify({"success": "La imagen ha sido cargada correctamente", "url": url}), 200 


# @api.route('profile/<str:username>')
# @jwt_required
# def profile_info(username):