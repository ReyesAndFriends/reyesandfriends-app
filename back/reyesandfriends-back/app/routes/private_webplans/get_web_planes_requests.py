from flask import jsonify, request
from app.models import WebPlanRequest
from . import private_web_planes
from app.utils.middleware.check_ip_allowed import check_ip_allowed

@private_web_planes.route('/requests', methods=['GET'])
@check_ip_allowed
def get_private_web_plan_requests():
    try:
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 10))
        paginated = WebPlanRequest.query.paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )
        requests_data = [request.to_dict() for request in paginated.items]
        return jsonify({
            'status': 'success',
            'data': requests_data,
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
        return jsonify({'status': 'error', 'message': str(e)}), 500
