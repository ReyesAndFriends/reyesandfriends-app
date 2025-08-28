from flask import jsonify, request
from . import webPlans
from app.models import WebPlanRequest, db

@webPlans.route('/request', methods=['POST'])
def request_web_plan():
    data = request.json

    required_fields = ["first_name", "last_name", "correo", "rut", "rut_type", "cellphone"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    first_name = data["first_name"]
    last_name = data["last_name"]
    correo = data["correo"]
    rut = data["rut"]
    rut_type = data["rut_type"]
    cellphone = data["cellphone"]

    if not isinstance(first_name, str) or not isinstance(last_name, str) or not isinstance(correo, str):
        return jsonify({"error": "first_name, last_name y correo deben ser strings"}), 400

    if not isinstance(rut, str) or not rut.isdigit():
        return jsonify({"error": "rut debe ser un string solo con números"}), 400

    if rut_type not in ["natural", "empresa"]:
        return jsonify({"error": "rut_type debe ser 'natural' o 'empresa'"}), 400

    try:
        cellphone_int = int(cellphone)
    except (ValueError, TypeError):
        return jsonify({"error": "cellphone debe ser un número entero"}), 400

    web_plan_request = WebPlanRequest(
        first_name=first_name,
        last_name=last_name,
        correo=correo,
        rut=rut,
        rut_type=rut_type,
        cellphone=cellphone
    )
    db.session.add(web_plan_request)
    db.session.commit()

    return jsonify({"message": "Web plan requested successfully."}), 201
