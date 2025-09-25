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

    CORS(app)
    
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
                    <meta http-equiv="refresh" content="2;url=https://reyesandfriends.cl">
                    <link rel="icon" href="https://reyesandfriends.cl/img/logo/crown_red.svg" type="image/x-icon">
                    <title>Redirigiendo...</title>
                        <script type="text/javascript">
                            setTimeout(function(){
                                window.location.href = "https://reyesandfriends.cl";
                            }, 2000);
                        </script>
                </head>
                    <body>
                        <p>Bienvenido a la API de Reyes&Friends, serás redirigido a la página principal.</p>
                    </body>
                </html>
            """
        return render_template_string(index_html)

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
