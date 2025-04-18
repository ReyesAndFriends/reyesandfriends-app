from flask import jsonify, request
from . import contact
from app.utils.post_mongo_connection import insert_to_mongo
@contact.route('', methods=['POST'])
def postContact():
    try:
        data = request.get_json()

        required_fields = ["name", "last_name", "cellphone", "email", "category", "message"]
        errors = [f"'{field}' is required" for field in required_fields if field not in data or not data[field]]

        if errors:
            return jsonify({"errors": errors}), 422

        inserted_id = insert_to_mongo("contact_forms", data)

        return jsonify({"message": "Contact form submitted successfully", "id": inserted_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
