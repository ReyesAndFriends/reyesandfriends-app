from flask import request, jsonify
from app.models import ProjectQuote
from . import quote

@quote.route('/quotes', methods=['GET'])
def get_quotes():
    try:
        status = request.args.get('status')
        email = request.args.get('email')
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 10))
        query = ProjectQuote.query
        if status:
            query = query.filter(ProjectQuote.status == status)
        if email:
            query = query.filter(ProjectQuote.email == email)
        query = query.order_by(ProjectQuote.created_at.desc())
        paginated = query.paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )
        quotes = []
        for quote in paginated.items:
            quotes.append({
                'id': quote.id,
                'quote_number': quote.quote_number,
                'status': quote.status,
                'customer_name': f"{quote.first_name} {quote.last_name}",
                'email': quote.email,
                'project_type': quote.project_type,
                'company_name': quote.company_name,
                'created_at': quote.created_at.isoformat(),
                'submitted_at': quote.submitted_at.isoformat() if quote.submitted_at else None
            })
        return jsonify({
            'success': True,
            'quotes': quotes,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': paginated.total,
                'pages': paginated.pages,
                'has_next': paginated.has_next,
                'has_prev': paginated.has_prev
            }
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
