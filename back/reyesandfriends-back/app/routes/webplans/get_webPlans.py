from flask import request, jsonify
from app.models import WebPlanRequest
from . import webPlans
from app.utils.middleware.check_ip_allowed import check_ip_allowed

@webPlans.route('/', methods=['GET'])
@check_ip_allowed
def get_web_plans():
    try:
        email = request.args.get('user_email')
        rut_type = request.args.get('rut_type')
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 10))
        order_by = request.args.get('order_by', 'created_at')
        order_dir = request.args.get('order_dir', 'desc').lower()
        
        allowed_order_fields = {
            'id': WebPlanRequest.id,
            'request_number': WebPlanRequest.request_number,
            'first_name': WebPlanRequest.first_name,
            'last_name': WebPlanRequest.last_name,
            'user_email': WebPlanRequest.user_email,
            'rut': WebPlanRequest.rut,
            'rut_type': WebPlanRequest.rut_type,
            'cellphone': WebPlanRequest.cellphone,
            'created_at': WebPlanRequest.created_at
        }
        
        order_column = allowed_order_fields.get(order_by, WebPlanRequest.created_at)
        if order_dir == 'asc':
            order_clause = order_column.asc()
        else:
            order_clause = order_column.desc()
        
        query = WebPlanRequest.query
        
        if email:
            query = query.filter(WebPlanRequest.user_email == email)
        if rut_type:
            query = query.filter(WebPlanRequest.rut_type == rut_type)
        
        query = query.order_by(order_clause)
        
        paginated = query.paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )
        
        web_plans = []
        for plan in paginated.items:
            web_plans.append({
                'id': plan.id,
                'request_number': plan.request_number,
                'customer_name': f"{plan.first_name} {plan.last_name}",
                'user_email': plan.user_email,
                'rut': plan.rut,
                'rut_type': plan.rut_type,
                'cellphone': plan.cellphone,
                'created_at': plan.created_at.isoformat()
            })
        
        return jsonify({
            'success': True,
            'web_plans': web_plans,
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
