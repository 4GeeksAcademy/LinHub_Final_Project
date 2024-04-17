from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    username = db.Column(db.String(120), unique = True, nullable = False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    # user native language
    learning_language_id = db.Column(db.Integer, db.ForeignKey('languages.id'))
    learning_language = db.relationship('Language', backref = "learning_users", foreign_keys=[learning_language_id])

    # user learning languege
    native_language_id = db.Column(db.Integer, db.ForeignKey('languages.id'))
    native_language = db.relationship('Language', backref = "native_users", foreign_keys=[native_language_id])

    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __init__(self, first_name, last_name, email, password, is_active, learning_language, native_language):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password
        self.is_active = is_active
        self.learning_language = learning_language
        self.native_language = native_language

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "learning_language": self.learning_language.serialize()["language_name"] if self.learning_language else "",
            "native_language": self.native_language.serialize()["language_name"] if self.learning_language else "",
            "is_active": self.is_active
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

class Course(db.Model):
    __tablename__ = "courses"

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    course_language_id = db.Column(db.Integer, db.ForeignKey('languages.id'))

    def __repr__(self):
        return f'<Course {self.id}'

class Module(db.Model):
    __tablename__ = "modules"

    id = db.Column(db.Integer, primary_key = True)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'))
    module_name = db.Column(db.String, nullable = False)

    def __repr__(self):
        return f'<Module {self.course_name}'

class Lesson(db.Model):
    __tablename__ = "lessons"

    id = db.Column(db.Integer, primary_key = True)
    module_id = db.Column(db.Integer, db.ForeignKey('modules.id'))
    lesson_name = db.Column(db.String, nullable = False)

    def __repr__(self):
        return f'<Lesson {self.course_name}'

class Question(db.Model):
    __tablename__ = "questions"

    id = db.Column(db.Integer, primary_key = True)
    lesson_id = db.Column(db.Integer, db.ForeignKey('lessons.id'))
    question = db.Column(db.String, nullable = False)

    def __repr__(self):
        return f'<Question {self.question}'

class Option(db.Model):
    __tablename__ = "options"

    id = db.Column(db.Integer, primary_key = True)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'))
    option = db.Column(db.String, nullable = False)
    correct = db.Column(db.Boolean, nullable = False)

    def __repr__(self):
        return f'<Option {self.option}'
