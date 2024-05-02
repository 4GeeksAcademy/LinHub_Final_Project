"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO, join_room, leave_room, send, emit, rooms, Namespace, disconnect, close_room
from api.models import db, Message


ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

socketio = SocketIO(app, cors_allowed_origins="*")

# JWT manager
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
jwt = JWTManager(app)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

@socketio.on('join')
def on_join(data):
    sender_id = data['sender_id']
    room = data['room']
    join_room(room)
    emit('joined', {'sender_id': sender_id, 'room': room}, to=room)
    print(f"User {sender_id} joined room {room}")

@socketio.on('leave')
def on_leave(data):
    sender_id = data['sender_id']
    room = data['room']
    leave_room(room)
    emit('left', {'sender_id': sender_id, 'room': room}, to=room)

@socketio.on('message')
def handle_message(data):
    sender_id = data['sender_id']
    message = data['message']
    room = data['room']
    if room in rooms():
        emit('message', {'sender_id': sender_id, 'message': message}, to=room)
        new_message = Message(sender_id=sender_id, message=message, chat_id=room)
        db.session.add(new_message)
        db.session.commit()
        print(new_message.serialize())
    else:
        emit('error', {'message': 'Room not found'}, to=request.sid)

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=3001)
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
