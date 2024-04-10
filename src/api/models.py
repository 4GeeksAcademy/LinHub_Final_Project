from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    # user native language
    learning_language_id = db.Column(db.Integer, db.ForeignKey('idioms.id'))
    learning_language = db.relationship('Idiom', backref = "learning_users")

    # user learning languege
    native_language = db.relationship('Idiom', backref = "native_users")

    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    # native_language = db.Column(db.String(80), unique=False, nullable=True)
    # target_language = db.Column(db.String(80), unique=False, nullable=True)
    # user_type = db.Column(db.String(80), unique=False, nullable=True)
    # user_name = db.Column(db.String(80), unique=False, nullable=True)
    # user_last_name = db.Column(db.String(80), unique=False, nullable=True)
    # user_age = db.Column(db.Integer, unique=False, nullable=True)

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "learning_idiom": self.learning_language.serialize()["idiom_name"] if self.learning_language else "",
            "native_idiom": self.native_language.serialize()["idiom_name"] if self.learning_language else "",
            "is_active": self.is_active
        }

class Idiom(db.Model):
    __tablename__ = "idioms"

    id = db.Column(db.Integer, primary_key=True)
    idiom_name = db.Column(db.String, unique=True)

    def __repr__(self):
        return f'<Idiom {self.idiom_name}'

    def serialize(self):
        return{
            "id": self.id,
            "idiom_name": self.idiom_name
        }