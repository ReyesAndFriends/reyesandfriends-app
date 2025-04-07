from flask import Flask
from flask_cors import CORS
from flask_mail import Mail

mail = Mail()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    CORS(app)
    mail.init_app(app)

    from .routes.example import example_bp
    
    app.register_blueprint(example_bp, url_prefix='/api/example')

    return app
