"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Language
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import bcrypt


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

languages = [
    {
        "language_name": "English"
    },
    {
        "language_name": "Español"
    }
]

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
        return jsonify({'msg': 'username required'})
    
    if not email:
        return jsonify({'msg': 'email required'})
    
    if not password:
        return jsonify({'msg': 'password required'})
    
    if not learning_language:
        return jsonify({'msg': 'learning language required'})
    
    if not native_language:
        return jsonify({'msg': 'native language required'})
    
    password_in_bytes = bytes(password, 'utf-8')

    # Generating Salt
    salt = bcrypt.gensalt()

    # Hashing Password
    hash_password = bcrypt.hashpw(    
        password=password_in_bytes,
        salt=salt
    )

    new_user = User(
        first_name=first_name,
        last_name=last_name,
        username=username,
        email=email,
        password=hash_password,
        is_active=is_active,
        learning_language=learning_language,
        native_language=native_language
    )

    db.session.add(new_user)
    try:
        db.session.commit()
        return jsonify([new_user.serialize(), {"hash": hash_password.decode('utf-8')}]), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error creating user", "error": str(e)}), 500
    
@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email or not password:
        return jsonify({'msg': 'email and password needed'})
    
    user = User.query.filter_by(email = email).one_or_none()
    
    if user != None:
        check = bcrypt.checkpw(
            password = bytes(password, 'utf-8'),
            hashed_password = bytes(user.password, 'utf-8')
        )
        if check:
            access_token = create_access_token(identity=email)
            return jsonify(access_token = access_token)
        else:
            return jsonify({'msg': 'wrong password'})
    else:
        return jsonify({'msg': 'user not found'})
