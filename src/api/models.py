from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
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