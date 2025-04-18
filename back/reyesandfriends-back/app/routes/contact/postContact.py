from flask import jsonify, request
from . import contact
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise ValueError("MONGO_URI is not defined on .env file")


@contact.route('', methods=['POST'])
def postContact():
    client = MongoClient(MONGO_URI)
    db = client.get_default_database()
    contact_forms = db.contact_forms

    try:

        data = request.get_json()


        required_fields = ["name", "last_name", "cellphone", "email", "category", "message"]
        errors = [f"'{field}' is required" for field in required_fields if field not in data or not data[field]]

        if errors:
            return jsonify({"errors": errors}), 422


        result = contact_forms.insert_one(data)


        return jsonify({"message": "Contact form submitted successfully", "id": str(result.inserted_id)}), 201
    except Exception as e:

        return jsonify({"error": str(e)}), 500
    finally:
        client.close()
