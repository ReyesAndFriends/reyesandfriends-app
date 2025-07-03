from flask import jsonify, request
from . import contact
from app.models import ContactForm

@contact.route('/', methods=['GET'])
def get_all_contacts():
    try:
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 10))
        order_by = request.args.get('order_by', 'created_date')
        order_dir = request.args.get('order_dir', 'desc').lower()
        allowed_order_fields = {
            'id': ContactForm.id,
            'first_name': ContactForm.first_name,
            'last_name': ContactForm.last_name,
            'cellphone': ContactForm.cellphone,
            'email': ContactForm.email,
            'category': ContactForm.category,
            'created_date': ContactForm.created_date,
            'created_time': ContactForm.created_time,
            'category_id': ContactForm.category_id
        }
        order_column = allowed_order_fields.get(order_by, ContactForm.created_date)
        if order_dir == 'asc':
            order_clause = order_column.asc()
        else:
            order_clause = order_column.desc()
        query = ContactForm.query.order_by(order_clause)
        paginated = query.paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )
        result = []
        for c in paginated.items:
            result.append({
                "id": c.id,
                "first_name": c.first_name,
                "last_name": c.last_name,
                "cellphone": c.cellphone,
                "email": c.email,
                "category": c.category,
                "message": c.message,
                "created_date": c.created_date,
                "created_time": c.created_time,
                "category_id": c.category_id
            })
        return jsonify({
            'success': True,
            'contacts': result,
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
