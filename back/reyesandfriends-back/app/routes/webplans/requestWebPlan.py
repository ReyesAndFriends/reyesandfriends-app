from flask import jsonify, request
from . import webPlans
from app.models import WebPlanRequest, db
from datetime import datetime
from flask_mail import Message
from app import mail
import os
from dotenv import load_dotenv
from flask import render_template

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

def formatRut(rut):
    """
    Format RUT to stylish format.
    Example: '123456789' -> '12.345.678-9'
    """
    rut = rut.replace(".", "").replace("-", "")
    if len(rut) < 2:
        return rut
    cuerpo = rut[:-1]
    dv = rut[-1]
    cuerpo_formateado = "{:,}".format(int(cuerpo)).replace(",", ".")
    return f"{cuerpo_formateado}-{dv}"


@webPlans.route('/request', methods=['POST'])
def request_web_plan():
    data = request.json

    required_fields = ["first_name", "last_name", "email", "rut", "rut_type", "cellphone"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    first_name = data["first_name"]
    last_name = data["last_name"]
    email = data["email"]
    rut = data["rut"]
    rut_type = data["rut_type"]
    cellphone = data["cellphone"]

    if not isinstance(first_name, str) or not isinstance(last_name, str) or not isinstance(email, str):
        return jsonify({"error": "first_name, last_name y email deben ser strings"}), 400

    if not isinstance(rut, str) or not rut.isdigit():
        return jsonify({"error": "rut debe ser un string solo con números"}), 400

    if rut_type not in ["natural", "empresa"]:
        return jsonify({"error": "rut_type debe ser 'natural' o 'empresa'"}), 400

    try:
        cellphone_int = int(cellphone)
    except (ValueError, TypeError):
        return jsonify({"error": "cellphone debe ser un número entero"}), 400

    request_number = generate_request_number()

    try:
    
        web_plan_request = WebPlanRequest(
            first_name=first_name,
            last_name=last_name,
            user_email=email,
            rut=rut,
            rut_type=rut_type,
            cellphone=cellphone,
            request_number=request_number
        )
        db.session.add(web_plan_request)
        db.session.commit()

        user_name = f"{data['first_name']} {data['last_name']}"

        formated_rut = formatRut(rut)

        email_html = render_template(
                'emails/webplan-success.html',
                user_name=user_name,
                rut=formated_rut,
                rut_type=rut_type.capitalize(),
                cellphone=cellphone,
                request_number=request_number
            )

        msg = Message(
                subject="Solicitud de contacto recibida",
                sender=mail_username,
                recipients=[data['email']],
                html=email_html
            )
            
        mail.send(msg)

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

    return jsonify({
        "message": f"¡Gracias por tu solicitud, {first_name}! Hemos recibido tu solicitud de Plan Web Fijo correctamente. Pronto nos pondremos en contacto contigo. Tu número de solicitud es: {request_number}",
        "request_number": request_number
        }), 201
