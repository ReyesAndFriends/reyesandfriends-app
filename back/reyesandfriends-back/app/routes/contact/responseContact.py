from flask import request, jsonify, render_template
from datetime import datetime
import os
from dotenv import load_dotenv
from flask_mail import Message
from . import contact
from app.models import db, ContactForm, ContactFormReply
from app.utils.middleware.check_ip_allowed import check_ip_allowed
from app import db, mail

load_dotenv()

mail_username = os.getenv("MAIL_USERNAME")

if not mail_username:
    raise RuntimeError("MAIL_USERNAME is not set in the environment variables.")

MAX_FIRST_NAME_LEN = 50
MAX_LAST_NAME_LEN = 50
MAX_EMAIL_LEN = 100
MIN_MESSAGE_LEN = 20
MAX_MESSAGE_LEN = 1000

@contact.route('/response', methods=['POST'])
@check_ip_allowed
def post_contact_response():
    data = request.get_json()
    required_fields = ["contact_form_id", "sender", "message"]
    errors = {field: "es requerido." for field in required_fields if field not in data or not data[field]}
    
    # Validate lenght and format
    sender = data.get("sender", "")
    message = data.get("message", "")

    if not isinstance(sender, str):
        errors["sender"] = "Debe ser texto"
    elif len(sender) > MAX_EMAIL_LEN:
        errors["sender"] = f"No debe exceder {MAX_EMAIL_LEN} caracteres"
    elif not sender or "@" not in sender:
        errors["sender"] = "Debe ser un email válido"

    if not isinstance(message, str):
        errors["message"] = "Debe ser texto"
    elif len(message) < MIN_MESSAGE_LEN:
        errors["message"] = f"Debe tener al menos {MIN_MESSAGE_LEN} caracteres"
    elif len(message) > MAX_MESSAGE_LEN:
        errors["message"] = f"No debe exceder {MAX_MESSAGE_LEN} caracteres"

    if errors:
        return jsonify(errors), 422

    contact_form = ContactForm.query.get(data["contact_form_id"])
    if not contact_form:
        return jsonify({"error": "El mensaje de contacto no existe."}), 404

    if contact_form.replies and len(contact_form.replies) > 0:
        return jsonify({"error": "Este mensaje de contacto ya fue respondido."}), 409

    reply = ContactFormReply(
        contact_form_id=data["contact_form_id"],
        sender=data["sender"],
        message=data["message"]
    )
    try:
        db.session.add(reply)
        contact_form.status_id = 3
        db.session.commit()

        # Send response email to the user
        current_year = datetime.now().year
        user_name = f"{contact_form.first_name} {contact_form.last_name}"
        
        email_html = render_template(
            'emails/response-contact.html',
            user_name=user_name,
            sender=data["sender"],
            message=data["message"],
            original_message=contact_form.message,
            current_year=current_year
        )

        msg = Message(
            subject="Respuesta a tu consulta - Reyes&Friends",
            sender=mail_username,
            recipients=[contact_form.email],
            html=email_html
        )
        
        mail.send(msg)

        return jsonify({"success": True, "reply": reply.to_dict()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
