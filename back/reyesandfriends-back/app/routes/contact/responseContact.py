from flask import request, jsonify
from . import contact
from app.models import db, ContactForm, ContactFormReply, ContactStatus
from app.utils.middleware.check_ip_allowed import check_ip_allowed

@contact.route('/response', methods=['POST'])
@check_ip_allowed
def post_contact_response():
    data = request.get_json()
    required_fields = ["contact_form_id", "sender", "message"]
    errors = {field: "es requerido." for field in required_fields if field not in data or not data[field]}
    if errors:
        return jsonify(errors), 422

    contact_form = ContactForm.query.get(data["contact_form_id"])
    if not contact_form:
        return jsonify({"error": "El mensaje de contacto no existe."}), 404

    sent_status = ContactStatus.query.filter_by(name='sent').first()
    answered_status = ContactStatus.query.filter_by(name='answered').first()
    if not sent_status or not answered_status:
        return jsonify({"error": "Los estados de contacto requeridos no existen en la base de datos."}), 500

    if contact_form.replies and len(contact_form.replies) > 0:
        return jsonify({"error": "Este mensaje de contacto ya fue respondido."}), 409

    reply = ContactFormReply(
        contact_form_id=data["contact_form_id"],
        sender=data["sender"],
        message=data["message"]
    )
    try:
        db.session.add(reply)
        contact_form.status_id = answered_status.id
        db.session.commit()
        return jsonify({"success": True, "reply": reply.to_dict()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
