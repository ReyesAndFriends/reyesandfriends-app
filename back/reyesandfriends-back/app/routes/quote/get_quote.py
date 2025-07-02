from flask import Blueprint, jsonify
from app.models import ProjectQuote
from app.utils.middleware.check_ip_allowed import check_ip_allowed
from . import quote

get_quote_bp = Blueprint('get_quote', __name__)

@quote.route('/quote/<int:quote_id>', methods=['GET'])
@check_ip_allowed
def get_quote(quote_id):
    try:
        quote = ProjectQuote.query.get(quote_id)
        if not quote:
            return jsonify({
                'success': False,
                'error': 'Quote not found'
            }), 404
        return jsonify({
            'success': True,
            'quote': quote.to_dict(),
            'phases': quote.to_phases_dict()
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
