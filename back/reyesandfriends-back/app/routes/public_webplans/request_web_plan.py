from flask import jsonify, request
from app.models import db, WebPlanList, Region, Commune, WebPlanRequest
from . import web_planes
from sqlalchemy import func
from datetime import datetime

@web_planes.route('/request', methods=['POST'])
def request_web_plan():
    data = request.get_json()
    required_fields = [
        "first_name", "last_name", "email", "cellphone",
        "address", "region_id", "commune_id", "plan_slug"
    ]
    # Validate required fields
    missing_fields = [field for field in required_fields if not data.get(field)]
    if missing_fields:
        return jsonify({
            "error": "Faltan campos obligatorios",
            "missing_fields": missing_fields
        }), 422

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

    return jsonify(new_request.to_dict()), 201