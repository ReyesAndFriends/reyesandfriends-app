from flask import Flask, render_template_string
from flask_cors import CORS
from flask_mail import Mail
from flask_migrate import Migrate
from .models import db

mail = Mail()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    CORS(app, resources={r"/*": {"origins": "*"}})
    
    # Initialize database
    db.init_app(app)
    migrate.init_app(app, db)
    
    # Initialize mail
    mail.init_app(app)

    # Index route (redirect to reyesandfriends.cl)
    @app.route('/')
    def index_route():
        index_html = """
                <html>
                <head>
                    <link rel="icon" href="https://reyesandfriends.cl/img/logo/crown_red.svg" type="image/x-icon">
                    <title>API Reyes&Friends</title>
                </head>
                    <body>
                       <h1>API Reyes&Friends</h1>
                        <p>Este recurso es usado solamente como servicio trasero de Reyes&Friends, no como una página web pública.</p>
                        <p>Visita <a href="https://www.reyesandfriends.cl">www.reyesandfriends.cl</a> para más información.</p>
                    </body>
                </html>
            """
        return render_template_string(index_html)
    
    @app.errorhandler(404)
    def not_found(error):
        return render_template_string("<h1>404 No Encontrado</h1><p>El recurso solicitado no pudo ser encontrado.</p>"), 404

    # Blueprint routes registration
    from .routes.contact import contact as contact_bp
    app.register_blueprint(contact_bp, url_prefix='/contact')
    
    from .routes.quote import quote as quote_bp
    app.register_blueprint(quote_bp, url_prefix='/quotes')

    from .routes.webplans import webPlans as webplans_bp
    app.register_blueprint(webplans_bp, url_prefix='/webplans')

    from .routes.visitors import visitors as visitors_bp
    app.register_blueprint(visitors_bp, url_prefix='/visitors')

    return app
