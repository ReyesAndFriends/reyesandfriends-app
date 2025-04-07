from flask import Blueprint, jsonify

example_bp = Blueprint('example', __name__)

@example_bp.route('/', methods=['GET'])
def index():
    return jsonify({'message': 'Hello from the example blueprint!'})

@example_bp.route('/hello', methods=['GET'])
def hello():
    return jsonify({'message': 'Hello from the example blueprint!'})