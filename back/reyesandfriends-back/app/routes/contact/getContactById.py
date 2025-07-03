from flask import jsonify
from . import contact
from app.models import ContactForm

@contact.route('/<int:contact_id>', methods=['GET'])
def get_contact_by_id(contact_id):
    contact = ContactForm.query.get(contact_id)
    if not contact:
        return jsonify({"error": "Mensaje de contacto no encontrado."}), 404
    result = {
        "id": contact.id,
        "first_name": contact.first_name,
        "last_name": contact.last_name,
        "cellphone": contact.cellphone,
        "email": contact.email,
        "category": contact.category,
        "message": contact.message,
        "created_date": contact.created_date,
        "created_time": contact.created_time,
        "category_id": contact.category_id
    }
    return jsonify(result), 200
