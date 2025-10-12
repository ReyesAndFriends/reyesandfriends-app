from flask import Blueprint, jsonify
from app.models import ProjectQuote, ProjectQuoteStatus
from app.utils.middleware.check_ip_allowed import check_ip_allowed
from . import quote

get_quote_bp = Blueprint('get_quote', __name__)

@quote.route('/<int:quote_id>', methods=['GET'])
@check_ip_allowed
def get_quote(quote_id):
    try:
        quote = ProjectQuote.query.get(quote_id)
        if not quote:
            return jsonify({
                'success': False,
                'error': 'Cotización no encontrada.'
            }), 404
        
        # Get status info
        status_info = None
        if quote.status_id:
            status = ProjectQuoteStatus.query.get(quote.status_id)
            if status:
                status_info = {'name': status.name, 'slug': status.slug}
        
        quote_data = {
            'id': quote.id,
            'quote_number': quote.quote_number,
            'customer_name': f"{quote.first_name} {quote.last_name}",
            'email': quote.email,
            'project_type': quote.project_type,
            'company_name': quote.company_name,
            'status': status_info,
            'created_at': quote.created_at.isoformat(),
            'submitted_at': quote.submitted_at.isoformat() if quote.submitted_at else None
        }
        
        return jsonify({
            'success': True,
            'quote': quote_data,
            'phases': quote.to_phases_dict()
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
