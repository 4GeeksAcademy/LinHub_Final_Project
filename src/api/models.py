from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    native_language = db.Column(db.String(80), unique=False, nullable=True)
    target_language = db.Column(db.String(80), unique=False, nullable=True)
    user_type = db.Column(db.String(80), unique=False, nullable=True)
    user_name = db.Column(db.String(80), unique=False, nullable=True)
    user_last_name = db.Column(db.String(80), unique=False, nullable=True)
    user_age = db.Column(db.Integer, unique=False, nullable=True)

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active,
            "native_language": self.native_language,
            "target_language": self.target_language,
            "user_type": self.user_type,
            "user_name": self.user_name,
            "user_last_name": self.user_last_name,
            "user_age": self.user_age
            # do not serialize the password, its a security breach
        }