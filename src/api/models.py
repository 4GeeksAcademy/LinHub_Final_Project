from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    username = db.Column(db.String(120), unique = True, nullable = False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), unique=False, nullable=False)
    salt = db.Column(db.String(90), unique=False, nullable=False)
    lives = db.Column(db.Integer, default=99)
    last_wrong = db.Column(db.DateTime, default=datetime.now())
    streak = db.Column(db.Integer, default=0)
    last_login = db.Column(db.DateTime, default=datetime.now())
    image= db.Column (db.String(3000), nullable=True)

    # user native language
    learning_language_id = db.Column(db.Integer, db.ForeignKey('languages.id'))

    # user learning languege
    native_language_id = db.Column(db.Integer, db.ForeignKey('languages.id'))

    def __init__(self, first_name, last_name, username, email, salt, password, learning_language_id, native_language_id):
        self.first_name = first_name
        self.last_name = last_name
        self.username = username
        self.email = email
        self.password = password
        self.salt = salt
        self.learning_language_id = learning_language_id
        self.native_language_id = native_language_id

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "username": self.username,
            "email": self.email,
            "lives": self.lives,
            "streak": self.streak,
            "image": self.image,
            "learning_language": self.learning_language_id,
            "native_language": self.native_language_id
        }
    
    def serialize_recommended(self):
        return{
            "id": self.id,
            "username": self.username,
            "native_language": self.native_language_id
        }

class FriendshipRequest(db.Model):
    __tablename__ = 'friendship_requests'

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    accepted = db.Column(db.Boolean, default=False)
    timestamp = db.Column(db.DateTime, default=datetime.now())

    # Relation with user
    sender = db.relationship(User, foreign_keys=[sender_id])
    receiver = db.relationship(User, foreign_keys=[receiver_id])

    def serialize(self):
        return{
            'id': self.id,
            'sender': self.sender.serialize(),
            'receiver': self.receiver.serialize(),
            'accepted': self.accepted
        }

class Chat(db.Model):
    __tablename__ = 'chats'

    id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user2_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user1 = db.relationship(User, foreign_keys=[user1_id])
    user2 = db.relationship(User, foreign_keys=[user2_id])

    def serialize(self):
        return{
            'id': self.id,
            'user1': self.user1.serialize(),
            'user2': self.user2.serialize()
        }

class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    chat_id = db.Column(db.Integer, db.ForeignKey('chats.id'), nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message = db.Column(db.String(1000), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.now())

    chat = db.relationship(Chat, foreign_keys=[chat_id])
    sender = db.relationship(User, foreign_keys=[sender_id])

    def serialize(self):
        return{
            'id': self.id,
            'sender': self.sender.serialize(),
            'message': self.message,
            'timestamp': self.timestamp
        }

class Language(db.Model):
    __tablename__ = "languages"

    id = db.Column(db.Integer, primary_key=True)
    language_name = db.Column(db.String, unique=True)

    def __repr__(self):
        return f'<Language {self.language_name}'

    def serialize(self):
        return{
            "id": self.id,
            "language_name": self.language_name
        }
    
class AvailableCourse(db.Model):
    __tablename__ = "available_courses"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable=False, unique = True)
    language_id = db.Column(db.Integer, db.ForeignKey('languages.id'))
    language = db.relationship(Language)

    def __repr__(self):
        return f'<AvailableCourse {self.id}'
    
    def serialize(self):
        return{
            "id": self.id,
            "name": self.name,
            "language_id": self.language_id
        }


class Course(db.Model):
    __tablename__ = "courses"

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    available_course_id = db.Column(db.Integer, db.ForeignKey('available_courses.id'))
    available_course = db.relationship(AvailableCourse)
    user = db.relationship(User)

    def __repr__(self):
        return f'<Course {self.id}'
    
    def serialize(self):
        return{
            'user': self.user_id,
            "available_course_id": self.available_course_id
        }

class Module(db.Model):
    __tablename__ = "modules"

    id = db.Column(db.Integer, primary_key = True)
    available_course_id = db.Column(db.Integer, db.ForeignKey('available_courses.id'))
    module_name = db.Column(db.String, nullable = False)
    available_course = db.relationship(AvailableCourse)
    lessons = db.relationship("Lesson")
    
    def __repr__(self):
        return f'<Module {self.module_name}'
    
    def serialize(self):
        return{
            "id": self.id,
            "module_name": self.module_name,
            "lessons": [ item.serialize() for item in self.lessons ]
        }
            
class Lesson(db.Model):
    __tablename__ = "lessons"

    id = db.Column(db.Integer, primary_key = True)
    lesson_name = db.Column(db.String, nullable = False)
    description = db.Column(db.String, nullable= True)
    image = db.Column(db.String, nullable=True)
    module_id = db.Column(db.Integer, db.ForeignKey('modules.id'))
    module = db.relationship(Module, overlaps="lessons")

    def __repr__(self):
        return f'<Lesson {self.lesson_name}'
    
    def serialize(self):
        return {
            "id": self.id,
            "lesson_name":self.lesson_name,
            "module_id": self.module_id
        }

class Question(db.Model):
    __tablename__ = "questions"

    id = db.Column(db.Integer, primary_key = True)
    question = db.Column(db.String, nullable = False)
    lesson_id = db.Column(db.Integer, db.ForeignKey('lessons.id'))
    lesson = db.relationship(Lesson)

    def __repr__(self):
        return f'<Question {self.question}'
    
    def serialize(self):
        return{
            "id":self.id,
            "question": self.question
        }

class Option(db.Model):
    __tablename__ = "options"

    id = db.Column(db.Integer, primary_key = True)
    option = db.Column(db.String, nullable = False)
    correct = db.Column(db.Boolean, nullable = False)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'))
    question = db.relationship(Question)

    def __repr__(self):
        return f'<Option {self.option}'

# class Progress(db.Model):
#     __tablename__ = "progress"




