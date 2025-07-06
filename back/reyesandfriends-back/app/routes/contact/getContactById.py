from flask import jsonify
from . import contact
from app.models import ContactForm
from app.utils.middleware.check_ip_allowed import check_ip_allowed
from app import db

@contact.route('/<int:contact_id>', methods=['GET'])
@check_ip_allowed
def get_contact_by_id(contact_id):
    contact = ContactForm.query.get(contact_id)
    if not contact:
        return jsonify({"error": "Mensaje de contacto no encontrado."}), 404

    # Update the contact status to "Leído (Sin responder)" if it's not already read or responded
    if contact.status_id not in (2, 3):
        contact.status_id = 2
        db.session.commit()

    result = {
        "id": contact.id,
        "first_name": contact.first_name,
        "last_name": contact.last_name,
        "cellphone": contact.cellphone,
        "email": contact.email,
        "category": contact.category_ref.name if contact.category_ref else None,
        "status": contact.status.name if contact.status else None,
        "message": contact.message,
        "created_date": contact.created_date,
        "created_time": contact.created_time,
        "category_id": contact.category_id
    }
    return jsonify(result), 200
