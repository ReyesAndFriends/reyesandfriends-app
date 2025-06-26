from flask import Flask
from flask_cors import CORS
from flask_mail import Mail
from flask_migrate import Migrate
from .models import db

mail = Mail()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    CORS(app)
    
    # Initialize database
    db.init_app(app)
    migrate.init_app(app, db)
    
    # Initialize mail
    mail.init_app(app)

    # Register blueprints
    from .routes.contact import contact as contact_bp
    app.register_blueprint(contact_bp, url_prefix='/contact')
    
    from .routes.quote.simpleQuoteRoutes import quote_bp
    app.register_blueprint(quote_bp, url_prefix='/api')

    return app
