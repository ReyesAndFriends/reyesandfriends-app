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
    from .routes.contact_form import contact_form_bp
    
    app.register_blueprint(example_bp, url_prefix='/example')
    app.register_blueprint(contact_form_bp, url_prefix='/contact')

    return app
