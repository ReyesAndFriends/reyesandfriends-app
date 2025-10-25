from flask import request, jsonify
from app.models import WebPlanList, WebPlanRequest
from . import webPlans
from app.utils.middleware.check_ip_allowed import check_ip_allowed

@webPlans.route('/', methods=['GET'])
@check_ip_allowed
def get_web_plans():
    try:
        email = request.args.get('user_email')
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
        
        query = query.order_by(order_clause)
        
        paginated = query.paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )
        
        web_plans = []
        for plan in paginated.items:
            plan_dict = plan.to_dict()
            web_plans.append(plan_dict)
        
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
