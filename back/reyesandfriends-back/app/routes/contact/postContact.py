from flask import jsonify, request, render_template
import os
from datetime import datetime
from dotenv import load_dotenv
from flask_mail import Message
from . import contact
from app.models import db, ContactForm
from app.utils.db_utils import get_contact_category_by_slug
from app import mail 
import requests

load_dotenv()

mail_username = os.getenv("MAIL_USERNAME")

if not mail_username:
    raise RuntimeError("MAIL_USERNAME is not set in the environment variables.")

@contact.route('', methods=['POST'])
def postContact():
    try:
        data = request.get_json()

        required_fields = ["first_name", "last_name", "cellphone", "email", "category", "message"]
        errors = {field: "es requerido." for field in required_fields if field not in data or not data[field]}

        if errors:
            return jsonify(errors), 422

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

        user_name = f"{data['first_name']} {data['last_name']}"
        email_html = render_template(
            'emails/contact-success.html',
            user_name=user_name,
        )

        msg = Message(
            subject="Solicitud de contacto recibida",
            sender=mail_username,
            recipients=[data['email']],
            html=email_html
        )
        
        mail.send(msg)

        # Send webhook to Reyes&Friends Admin panel

        laravel_webhook_url = os.getenv("LARAVEL_WEBHOOK_URL")
        laravel_token = os.getenv("LARAVEL_WEBHOOK_TOKEN")

        try:
            requests.post(
                laravel_webhook_url,
                json={
                    "event": "new_contact_form",
                    "notified_at": datetime.now().isoformat()
                },
                headers={
                    "X-FLASK-TOKEN": laravel_token
                },
                timeout=5
            )
        except Exception as webhook_error:
            print(f"[!] Webhook Laravel falló: {webhook_error}")

        return jsonify({
            "message": "¡Gracias por contactarnos! Dentro de poco recibirás un correo de confirmación sobre tu solicitud.",
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
