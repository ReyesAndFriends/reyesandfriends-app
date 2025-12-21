from flask import jsonify, request
from . import webPlans
from app.models import WebPlanRequest, WebPlanList, db
from datetime import datetime
from flask_mail import Message
from app import mail
import os
from dotenv import load_dotenv
from flask import render_template
import re

load_dotenv()

mail_username = os.getenv("MAIL_USERNAME")

if not mail_username:
    raise RuntimeError("MAIL_USERNAME is not set in the environment variables.")

def generate_request_number():
    """Generate a unique request number in the format WP-YYYY-NNN"""
    year = datetime.utcnow().year
    prefix = f"WP-{year}-"
    last_request = (
        WebPlanRequest.query
        .filter(WebPlanRequest.request_number.like(f"{prefix}%"))
        .order_by(WebPlanRequest.id.desc())
        .first()
    )
    if last_request and last_request.request_number:
        try:
            last_seq = int(last_request.request_number.split("-")[-1])
        except Exception:
            last_seq = 0
    else:
        last_seq = 0
    next_seq = last_seq + 1
    return f"{prefix}{next_seq:03d}"

def is_valid_rut(rut):
    """
    Validates Chilean RUT format: 7 or 8 digits, hyphen, 1 digit or 'K'.
    Examples: 99999999-9, 9999999-9, 12345678-K
    """
    return bool(re.fullmatch(r"\d{7,8}-[\dkK]", rut))

MAX_FIRST_NAME_LEN = 50
MAX_LAST_NAME_LEN = 50
MAX_EMAIL_LEN = 100

@webPlans.route('', methods=['POST'])
def request_web_plan():
    data = request.json

    required_fields = ["first_name", "last_name", "email", "rut", "cellphone", "webplan_slug"]
    missing_fields = [field for field in required_fields if field not in data]

    if missing_fields:
        return jsonify({
            "error": "Faltan campos requeridos",
            "missing_fields": missing_fields
        }), 422

    first_name = data["first_name"]
    last_name = data["last_name"]
    email = data["email"]
    rut = data["rut"]
    cellphone = data["cellphone"]
    webplan_slug = data["webplan_slug"]
    whatsapp_response = data.get("whatsapp_response", False)

    if not isinstance(first_name, str) or not isinstance(last_name, str) or not isinstance(email, str):
        return jsonify({"error": "first_name, last_name y email deben ser cadenas de texto"}), 400

    if len(first_name) > MAX_FIRST_NAME_LEN:
        return jsonify({"error": f"first_name no debe exceder {MAX_FIRST_NAME_LEN} caracteres"}), 400
    if len(last_name) > MAX_LAST_NAME_LEN:
        return jsonify({"error": f"last_name no debe exceder {MAX_LAST_NAME_LEN} caracteres"}), 400
    if len(email) > MAX_EMAIL_LEN:
        return jsonify({"error": f"email no debe exceder {MAX_EMAIL_LEN} caracteres"}), 400

    if not isinstance(rut, str):
        return jsonify({"error": "rut debe ser una cadena de texto"}), 400

    if not is_valid_rut(rut):
        return jsonify({"error": "rut debe tener el formato correcto: 7 u 8 dígitos, guion, dígito o 'K'. Ejemplo: 99999999-9"}), 400

    if not isinstance(cellphone, str):
        return jsonify({"error": "cellphone debe ser una cadena de texto"}), 400

    if not isinstance(webplan_slug, str):
        return jsonify({"error": "webplan_slug debe ser una cadena de texto"}), 400

    if not isinstance(whatsapp_response, bool):
        return jsonify({"error": "whatsapp_response debe ser un valor booleano"}), 400

    webplan = WebPlanList.query.filter_by(slug=webplan_slug).first()
    if not webplan:
        return jsonify({"error": "No se encontró el plan web para el slug proporcionado"}), 404

    request_number = generate_request_number()

    try:
        web_plan_request = WebPlanRequest(
            first_name=first_name,
            last_name=last_name,
            user_email=email,
            rut=rut,
            webplan_id=webplan.id,
            cellphone=cellphone,
            whatsapp_response=whatsapp_response,
            request_number=request_number
        )
        db.session.add(web_plan_request)
        db.session.commit()

        user_name = f"{first_name} {last_name}"

        email_html = render_template(
            'emails/webplan-success.html',
            user_name=user_name,
            rut=rut,
            cellphone=cellphone,
            request_number=request_number,
            webplan_name=webplan.name,
            webplan_description=webplan.description,
            webplan_price=webplan.price_clp,
            webplan_demo_url=webplan.demo_url,
            current_year=datetime.utcnow().year,
            whatsapp_response="Sí" if whatsapp_response else "No"
        )

        msg = Message(
            subject="Solicitud de Plan Web Recibida",
            sender=mail_username,
            recipients=[email],
            html=email_html
        )
        mail.send(msg)
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

    return jsonify({
        "message": f"¡Gracias por tu solicitud, {first_name}! Tu solicitud de Plan Web ha sido recibida exitosamente. Te contactaremos pronto. Tu número de solicitud es: {request_number}",
        "request_number": request_number
    }), 201
