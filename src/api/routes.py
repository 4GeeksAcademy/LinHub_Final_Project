"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Language,Lesson,Module
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

import bcrypt


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

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

# Obtain lessons
@api.route('/lessons', methods=['GET'])
def get_lessons():
    lessons = Lesson.query.all()
    lessons = list(map(lambda x: x.serialize(), lessons))
    return jsonify(lessons), 200

# Obtain Module
@api.route('/module', methods=['GET'])
def get_module():
    module = Module.query.all()
    module = list(map(lambda x: x.serialize(), module))
    return jsonify(module), 200

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
    request_body = request.get_json()
    if not request_body:
        return jsonify({"msg": "No data provided"}), 400

    first_name = request_body.get('first_name')
    last_name = request_body.get('last_name')
    username = request_body.get('username')
    email = request_body.get('email')
    password = request_body.get('password')
    learning_language = Language.query.filter_by(language_name=request_body.get("learning_language")).first()
    native_language = Language.query.filter_by(language_name=request_body.get("native_language")).first()
    is_active = True

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
        is_active=is_active,
        learning_language=learning_language,
        native_language=native_language
    )

    db.session.add(new_user)
    try:
        db.session.commit()
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
            return jsonify({'token': access_token, 'identity': user.username}), 200
        else:
            return jsonify({'msg': 'wrong password'}) , 404
    else:
        return jsonify({'msg': 'user not found'}), 404


@api.route("/user", methods=["PUT"])
@jwt_required()
def update_user():

    first_name = request.json.get("first_name", None)
    last_name = request.json.get("last_name", None)
    username = request.json.get("username", None)

    if first_name == None or last_name == None or username == None:
        return jsonify({"msg": "Name, last name or user name cannot be empty"}), 400
    email = get_jwt_identity()

    user = User.query.filter_by(email=email).one_or_none() 
    
    if user != None:
        user.first_name= first_name 
        user.last_name= last_name
        user.username= username
        db.session.add(user)
        try:
            db.session.commit()
            return jsonify(user.serialize()), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"msg": "Error Updating user", "error": str(e)}), 500
     
        
    return jsonify({"msg": "User not found"}), 404  


# @api.route('profile/<str:username>')
# @jwt_required
# def profile_info(username):
