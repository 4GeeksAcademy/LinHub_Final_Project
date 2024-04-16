"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Language
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

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

# @api.route('/idioms', methods=['POST'])
# def post_idioms():
#     for idiom in idioms:
#         new_idiom = Idiom(idiom_name=idiom["idiom_name"])
#         db.session.add(new_idiom)
#     db.session.commit()
#     return jsonify({"msg": "Idioms created successfully"}), 200

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
S
# @api.route('/users', methods=['POST'])
# def create_user():
#     request_body = request.get_json()
#     if not request_body:
#         return jsonify({"msg": "No data provided"}), 400


    first_name = request_body.get('first_name')
    last_name = request_body.get('last_name')
    email = request_body.get('email')
    password = request_body.get('password')
    learning_language = Idiom.query.filter_by(idiom_name=request_body.get("learning_language")).first()
    native_language = Idiom.query.filter_by(idiom_name=request_body.get("native_language")).first()
    is_active = True

#     if not first_name or not last_name:
#         return jsonify({"msg": "First name and last name are required"}), 400

#     new_user = User(
#         first_name=first_name,
#         last_name=last_name,
#         email=email,
#         password=password,
#         is_active=is_active,
#         learning_language=learning_language,
#         native_language=native_language
#     )
#     db.session.add(new_user)
#     try:
#         db.session.commit()
#         return jsonify(new_user.serialize()), 201
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"msg": "Error creating user", "error": str(e)}), 500