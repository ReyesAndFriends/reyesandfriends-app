from flask import request, jsonify
from app.models import db, ProjectQuote
from . import quote

@quote.route('/quote/<int:quote_id>/status', methods=['PUT'])
def update_quote_status(quote_id):
    try:
        data = request.get_json()
        if not data or 'status' not in data:
            return jsonify({
                'success': False,
                'error': 'Status is required'
            }), 400
        valid_statuses = ['submitted', 'reviewed', 'approved', 'rejected']
        if data['status'] not in valid_statuses:
            return jsonify({
                'success': False,
                'error': 'Invalid status'
            }), 400
        quote = ProjectQuote.query.get(quote_id)
        if not quote:
            return jsonify({
                'success': False,
                'error': 'Quote not found'
            }), 404
        quote.status = data['status']
        if 'admin_notes' in data:
            quote.admin_notes = data['admin_notes']
        db.session.commit()
        return jsonify({
            'success': True,
            'message': 'Quote status updated successfully',
            'quote': {
                'id': quote.id,
                'quote_number': quote.quote_number,
                'status': quote.status,
                'admin_notes': quote.admin_notes
            }
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
