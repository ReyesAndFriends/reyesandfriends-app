from flask import Blueprint, jsonify

contact_form_bp = Blueprint('contact_form', __name__)

@contact_form_bp.route('/', methods=['POST'])
def index():
    return jsonify({'message': 'Hello from the contact form blueprint!'})