from flask import Flask
from flask_cors import CORS
from flask_mail import Mail

mail = Mail()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    CORS(app)
    
    mail.init_app(app)

    from .routes.contact import contact as contact_bp
    
    app.register_blueprint(contact_bp, url_prefix='/contact')

    return app
