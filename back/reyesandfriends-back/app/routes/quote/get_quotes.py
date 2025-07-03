from flask import request, jsonify
from app.models import ProjectQuote
from . import quote
from app.utils.middleware.check_ip_allowed import check_ip_allowed

@quote.route('/', methods=['GET'])
@check_ip_allowed
def get_quotes():
    try:
        status = request.args.get('status')
        email = request.args.get('email')
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 10))
        order_by = request.args.get('order_by', 'created_at')
        order_dir = request.args.get('order_dir', 'desc').lower()
        allowed_order_fields = {
            'id': ProjectQuote.id,
            'quote_number': ProjectQuote.quote_number,
            'status': ProjectQuote.status,
            'first_name': ProjectQuote.first_name,
            'last_name': ProjectQuote.last_name,
            'email': ProjectQuote.email,
            'project_type': ProjectQuote.project_type,
            'company_name': ProjectQuote.company_name,
            'created_at': ProjectQuote.created_at,
            'submitted_at': ProjectQuote.submitted_at
        }
        order_column = allowed_order_fields.get(order_by, ProjectQuote.created_at)
        if order_dir == 'asc':
            order_clause = order_column.asc()
        else:
            order_clause = order_column.desc()
        query = ProjectQuote.query
        if status:
            query = query.filter(ProjectQuote.status == status)
        if email:
            query = query.filter(ProjectQuote.email == email)
        query = query.order_by(order_clause)
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
