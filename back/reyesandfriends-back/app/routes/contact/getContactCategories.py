from flask import jsonify
from . import contact
from app.utils.get_mongo_connection import get_data_from_collection

@contact.route('/categories')
def getCategories():
    categories = get_data_from_collection("contact_categories", {}, {"_id": 0})
    return jsonify(categories)
