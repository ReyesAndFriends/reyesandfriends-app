from flask import request, jsonify
from . import contact
from app.models import db, ContactForm, ContactFormReply, ContactStatus
from app.utils.middleware.check_ip_allowed import check_ip_allowed
from app import db

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
        return jsonify({"success": True, "reply": reply.to_dict()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
