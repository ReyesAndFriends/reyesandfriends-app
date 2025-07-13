from flask import jsonify
from . import contact
from app.utils.db_utils import get_contact_categories

@contact.route('/categories')
def getCategories():
    categories = get_contact_categories()
    return jsonify(categories)
