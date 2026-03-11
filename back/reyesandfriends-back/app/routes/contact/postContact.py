from flask import jsonify, request, render_template, current_app
import os
from datetime import datetime
from dotenv import load_dotenv
from flask_mail import Message
from . import contact
from app.models import db, ContactForm, BannedRut
from app.utils.db_utils import get_contact_category_by_slug
from app import mail 
import requests

load_dotenv()

TURNSTILE_SECRET_KEY = os.getenv("TURNSTILE_SECRET_KEY")
if not TURNSTILE_SECRET_KEY:
    raise RuntimeError("TURNSTILE_SECRET_KEY is not set in the environment variables.")

MAX_FIRST_NAME_LEN = 50
MAX_LAST_NAME_LEN = 50
MAX_EMAIL_LEN = 100
MIN_MESSAGE_LEN = 20
MAX_MESSAGE_LEN = 1000

@contact.route('', methods=['POST'])
def postContact():
    try:
        data = request.get_json()

        required_fields = ["first_name", "last_name", "cellphone", "email", "category", "message", "turnstile_token"]
        errors = {field: "es requerido." for field in required_fields if field not in data or not data[field]}

        # Validate lenght and format
        first_name = data.get("first_name", "")
        last_name = data.get("last_name", "")
        email = data.get("email", "")
        message = data.get("message", "")

        if not isinstance(first_name, str):
            errors["first_name"] = "Debe ser texto"
        elif len(first_name) > MAX_FIRST_NAME_LEN:
            errors["first_name"] = f"No debe exceder {MAX_FIRST_NAME_LEN} caracteres"

        if not isinstance(last_name, str):
            errors["last_name"] = "Debe ser texto"
        elif len(last_name) > MAX_LAST_NAME_LEN:
            errors["last_name"] = f"No debe exceder {MAX_LAST_NAME_LEN} caracteres"

        if not isinstance(email, str):
            errors["email"] = "Debe ser texto"
        elif len(email) > MAX_EMAIL_LEN:
            errors["email"] = f"No debe exceder {MAX_EMAIL_LEN} caracteres"
        elif not email or "@" not in email:
            errors["email"] = "Debe ser un email válido"

        if not isinstance(message, str):
            errors["message"] = "Debe ser texto"
        elif len(message) < MIN_MESSAGE_LEN:
            errors["message"] = f"Debe tener al menos {MIN_MESSAGE_LEN} caracteres"
        elif len(message) > MAX_MESSAGE_LEN:
            errors["message"] = f"No debe exceder {MAX_MESSAGE_LEN} caracteres"

        if errors:
            return jsonify(errors), 422

        # Validate Turnstile token
        turnstile_token = data["turnstile_token"]
        remoteip = request.remote_addr
        verify_resp = requests.post(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            data={
                "secret": TURNSTILE_SECRET_KEY,
                "response": turnstile_token,
                "remoteip": remoteip
            }
        )
        verify_data = verify_resp.json()
        if not verify_data.get("success"):
            return jsonify({"error": "No se pudo verificar el captcha. Intenta nuevamente."}), 400

        # Get the category to validate and obtain the ID
        category = get_contact_category_by_slug(data['category'])
        if not category:
            return jsonify({"category": "Categoría inválida."}), 422
        
        category_id = category.id

        now = datetime.now()
        contact_form = ContactForm(
            first_name=data['first_name'],
            last_name=data['last_name'],
            cellphone=data['cellphone'],
            email=data['email'],
            message=data['message'],
            created_date=now.strftime("%Y-%m-%d"),
            created_time=now.strftime("%H:%M:%S"),
            category_id=category_id
        )

        db.session.add(contact_form)
        db.session.commit()

        current_year = datetime.now().year

        user_name = f"{data['first_name']} {data['last_name']}"
        email_html = render_template(
            'emails/contact-success.html',
            user_name=user_name,
            current_year=current_year
        )

        msg = Message(
            subject="Solicitud de contacto recibida - Reyes&Friends",
            sender=current_app.config['MAIL_USERNAME'],
            recipients=[data['email']],
            html=email_html
        )
        
        mail.send(msg)

        return jsonify({
            "message": "¡Gracias por contactarnos! Dentro de poco recibirás un correo de confirmación sobre tu solicitud.",
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
