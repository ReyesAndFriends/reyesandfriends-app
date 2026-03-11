from flask import jsonify, request, render_template, current_app
import os
import requests
from app.models import db, WebPlanList, Region, Commune, WebPlanRequest
from . import web_planes
from dotenv import load_dotenv
from sqlalchemy import func
from datetime import datetime
from app import mail
from flask_mail import Message

load_dotenv()
TURNSTILE_SECRET_KEY = os.getenv("TURNSTILE_SECRET_KEY")
if not TURNSTILE_SECRET_KEY:
    raise RuntimeError("TURNSTILE_SECRET_KEY is not set in the environment variables.")

@web_planes.route('/request', methods=['POST'])
def request_web_plan():
    data = request.get_json()
    required_fields = [
        "first_name", "last_name", "email", "cellphone",
        "address", "region_id", "commune_id", "plan_slug", "turnstile_token"
    ]
    # Validate required fields
    missing_fields = [field for field in required_fields if not data.get(field)]
    if missing_fields:
        return jsonify({
            "error": "Faltan campos obligatorios",
            "missing_fields": missing_fields
        }), 422

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

    # Validate length and format
    if len(data["email"]) > 255:
        return jsonify({"error": "El email debe tener máximo 255 caracteres"}), 400
    if len(data["cellphone"]) != 12:
        return jsonify({"error": "El celular debe tener exactamente 12 caracteres"}), 400
    if len(data["address"]) > 255:
        return jsonify({"error": "La dirección debe tener máximo 255 caracteres"}), 400
    if len(data["plan_slug"]) > 255:
        return jsonify({"error": "El plan_slug debe tener máximo 255 caracteres"}), 400

    # Search Web Plan
    plan = WebPlanList.query.filter_by(slug=data["plan_slug"]).first()
    if not plan:
        return jsonify({"error": "Plan no encontrado"}), 404

    # Search Region and Commune
    region = Region.query.get(data["region_id"])
    if not region:
        return jsonify({"error": "Región no encontrada"}), 404
    commune = Commune.query.get(data["commune_id"])
    if not commune:
        return jsonify({"error": "Comuna no encontrada"}), 404

    # Generate unique request_number
    current_year = datetime.now().year
    count = db.session.query(func.count(WebPlanRequest.id)).filter(
        func.extract('year', WebPlanRequest.created_at) == current_year
    ).scalar() or 0
    request_number = f"WR-{current_year}-{str(count + 1).zfill(3)}"

    new_request = WebPlanRequest(
        request_number=request_number,
        first_name=data["first_name"],
        last_name=data["last_name"],
        email=data["email"],
        cellphone=data["cellphone"],
        webplan_id=plan.id,
        region=region.name,
        commune=commune.name,
        address=data["address"],
    )
    db.session.add(new_request)
    db.session.commit()

    email_html = render_template(
        'emails/web_plan_request.html',
        user_name=f"{data['first_name']} {data['last_name']}",
        request_number=request_number,
        plan_name=plan.name,
        region_name=region.name,
        commune_name=commune.name,
        address=data["address"],
        current_year=current_year
    )

    msg = Message(
        subject="Confirmación de Solicitud de Plan Web",
        sender=current_app.config['MAIL_USERNAME'],
        recipients=[data['email']],
        html=email_html
    )
    mail.send(msg)

    return jsonify(new_request.to_dict()), 201