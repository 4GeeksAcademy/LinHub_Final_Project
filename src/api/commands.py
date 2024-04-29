
import click
from api.models import db, User, Language,Lesson,Module, Course, AvailableCourse, Question, Option, FriendshipRequest

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """

    @app.cli.command("insert-languages")
    def insert_test_languages():
        print("Creating languages")
        languages_arr = ["English", "Español"]

        for language in languages_arr:
            new_language = Language()
            new_language.language_name = language
            db.session.add(new_language)
            db.session.commit()

    @app.cli.command("insert-av_courses")
    def insert_test_courses():
        print("Creating av_courses")

        languages = db.session.query(Language).all()

        for language in languages:
            new_course = AvailableCourse()
            new_course.name = language.language_name
            new_course.language_id = language.id
            db.session.add(new_course)
            db.session.commit()

    @app.cli.command("insert-modules")
    def insert_modules():
        print("Creating modules")

        av_courses = db.session.query(AvailableCourse).all()

        for av_course in av_courses:
            new_module = Module()
            new_module.module_name = "First Steps" if av_course.name == "English" else "Primeros Pasos"
            new_module.available_course_id = av_course.id
            db.session.add(new_module)
            db.session.commit()

    @app.cli.command("insert-lessons")
    def insert_lessons():
        print("Creating lessons")

        en_lessons = [
            {'title': "Start a conversation!", 'desc': "Start a conversation with someone and practice your conversations skills"},
            {'title': "Introduce yourself!", 'desc': "Summon up your courage and take the first step towards what could be a beautiful learning relationship."},
            {'title': "Talk about your hobbies!", 'desc': "Having similar hobbies with another person simply leads to the perfect combination, share yours a bit!"},
            {'title': "Go out eating", 'desc': "I'm starting to get hungry, where do you think we should eat?"},
            {'title': "Ask someone out!", 'desc': "I think we know each other well enough, I'm waiting for you to invite me out..."},
            {'title': "Final Lesson", 'desc': "It's time to take the final step to talk to someone."},
        ]
        es_lessons = [
            {'title': "Empieza una conversacion!", 'desc': "Comienza una conversación con alguien y practica tus habilidades de conversación."},
            {'title': "Presentate!", 'desc': "Armate de valor y da el primer paso en lo que podria ser una linda relacion de aprenizaje"},
            {'title': "Habla de tus hobbies", 'desc': "Tener hobbies similares con otra persona lleva simplemente a la combinacion perfecta, comparte un poco los tuyos!"},
            {'title': "Sal a comer algo!", 'desc': "Estoy empezando a tener hambre, donde crees que deberiamos comer?"},
            {'title': "Invita a alguien a salir!", 'desc': "Creo que ya nos conocemos lo suficiente, estoy esperando a que me invites a salir..."},
            {'title': "Leccion Final", 'desc': "Es tiempo de dar el ultimo paso para hablar con alguien"},
        ]

        modules = db.session.query(Module).all()

        for module in modules:
            if module.available_course.name == "English":
                for lesson in en_lessons:
                    new_lesson = Lesson()
                    new_lesson.lesson_name = lesson["title"]
                    new_lesson.description = lesson["desc"]
                    new_lesson.module_id = module.id
                    db.session.add(new_lesson)
                    db.session.commit()
            else:
                for lesson in es_lessons:
                    new_lesson = Lesson()
                    new_lesson.lesson_name = lesson["title"]
                    new_lesson.description = lesson["desc"]
                    new_lesson.module_id = module.id
                    db.session.add(new_lesson)
                    db.session.commit()

    @app.cli.command("insert-questions")
    def insert_questions():

        print("Creating questions")

        questions = [
            ["Hello, how are you?", "Hi, whats your name?"],
            ["Hello!", "How old are you?"],
            ["What do you like to do?", "Do you like to read?"],
            ["Would you like to order now?", "What would you like to eat?"],
            ["Do you want to do something?", "I'm sooo bored"],
            ["Do you want to do something?", "I'm sooo bored"],
            ["Hola! ¿Como estas?", "Hola, ¿como te llamas?"],
            ["Hola!", "¿Que edad tienes?"],
            ["¿Que te gusta hacer?", "¿Te gusta leer?"],
            ["¿Le gustaria ordenar ahora?", "¿Que le gustaria comer?"],
            ["¿Quieres hacer algo?", "Estoy taaan aburrido"],
            ["¿Quieres hacer algo?", "Estoy taaan aburrido"],
        ]

        lessons = db.session.query(Lesson).all()

        for lesson, question_set in zip(lessons, questions):
            for question_text in question_set:
                question = Question(question=question_text, lesson_id=lesson.id)
                db.session.add(question)
                db.session.commit()

    @app.cli.command("insert-options")
    def insert_options():

        print("Creating options")
        
        questions = db.session.query(Question).all()
        option_sets = [
            [
                {"option": "Fine thank you, what about you", "correct": True},
                {"option": "No thanks", "correct": False},
                {"option": "Maybe later", "correct": False}
            ],
            [
                {"option": "My name is Valen", "correct": True},
                {"option": "No thanks", "correct": False},
                {"option": "Maybe later", "correct": False}
            ],
            [
                {"option": "Hello, nice to meet you", "correct": True},
                {"option": "No thanks", "correct": False},
                {"option": "Maybe later", "correct": False}
            ],
            [
                {"option": "I am 23 years old", "correct": True},
                {"option": "No thanks", "correct": False},
                {"option": "Maybe later", "correct": False}
            ],
            [
                {"option": "My name is samuel and i love to learn using linhub", "correct": True},
                {"option": "No thanks", "correct": False},
                {"option": "Maybe later", "correct": False}
            ],
            [
                {"option": "I'm more into movies hehe", "correct": True},
                {"option": "No thanks", "correct": False},
                {"option": "Maybe later", "correct": False}
            ],
            [
                {"option": "Yes, please", "correct": True},
                {"option": "No thanks", "correct": False},
                {"option": "Maybe later", "correct": False}
            ],
            [
                {"option": "I will have a pizza please", "correct": True},
                {"option": "No thanks", "correct": False},
                {"option": "Maybe later", "correct": False}
            ],
            [
                {"option": "Yes! let's go eating", "correct": True},
                {"option": "No thanks", "correct": False},
                {"option": "Maybe later", "correct": False}
            ],
            [
                {"option": "Would you like to netflix and chill?", "correct": True},
                {"option": "No thanks", "correct": False},
                {"option": "Maybe later", "correct": False}
            ],
            [
                {"option": "Yes! let's go eating", "correct": True},
                {"option": "No thanks", "correct": False},
                {"option": "Maybe later", "correct": False}
            ],
            [
                {"option": "Would you like to netflix and chill?", "correct": True},
                {"option": "No thanks", "correct": False},
                {"option": "Maybe later", "correct": False}
            ],
            [
                {"option": "Hola, todo bien", "correct": True},
                {"option": "Esternocleidomastoideo", "correct": False},
                {"option": "Paralelepipedo", "correct": False}
            ],
            [
                {"option": "Hola, me llamo luis, ¿y tu?", "correct": True},
                {"option": "Esternocleidomastoideo", "correct": False},
                {"option": "Paralelepipedo", "correct": False}
            ],
            [
                {"option": "Hola, que tal estas?", "correct": True},
                {"option": "Esternocleidomastoideo", "correct": False},
                {"option": "Paralelepipedo", "correct": False}
            ],
            [
                {"option": "Tengo 23 años, ¿y tu?", "correct": True},
                {"option": "Esternocleidomastoideo", "correct": False},
                {"option": "Paralelepipedo", "correct": False}
            ],
            [
                {"option": "Me encanta ver clases y cononcer gente en LinHub", "correct": True},
                {"option": "Esternocleidomastoideo", "correct": False},
                {"option": "Paralelepipedo", "correct": False}
            ],
            [
                {"option": "Soy mas de ver peliculas", "correct": True},
                {"option": "Esternocleidomastoideo", "correct": False},
                {"option": "Paralelepipedo", "correct": False}
            ],
            [
                {"option": "Si, quisiera ordenar pasta carbonara", "correct": True},
                {"option": "Esternocleidomastoideo", "correct": False},
                {"option": "Paralelepipedo", "correct": False}
            ],
            [
                {"option": "Quiero una pizza de peperoni", "correct": True},
                {"option": "Esternocleidomastoideo", "correct": False},
                {"option": "Paralelepipedo", "correct": False}
            ],
            [
                {"option": "Si! ¿Te apetece ir a nadar?", "correct": True},
                {"option": "Esternocleidomastoideo", "correct": False},
                {"option": "Paralelepipedo", "correct": False}
            ],
            [
                {"option": "Yo tambien! Salgamos a caminar un rato", "correct": True},
                {"option": "Esternocleidomastoideo", "correct": False},
                {"option": "Paralelepipedo", "correct": False}
            ],
            [
                {"option": "Si! ¿Te apetece ir a nadar?", "correct": True},
                {"option": "Esternocleidomastoideo", "correct": False},
                {"option": "Paralelepipedo", "correct": False}
            ],
            [
                {"option": "Yo tambien! Salgamos a caminar un rato", "correct": True},
                {"option": "Esternocleidomastoideo", "correct": False},
                {"option": "Paralelepipedo", "correct": False}
            ],
        ]

        for question, option_set in zip(questions, option_sets):
            for option_data in option_set:
                new_option = Option(option=option_data["option"], correct=option_data["correct"], question_id=question.id)
                db.session.add(new_option)
                db.session.commit()