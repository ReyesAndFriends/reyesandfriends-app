from flask import jsonify
from app.models import WebPlanRequest
from . import private_web_planes
from app.utils.middleware.check_ip_allowed import check_ip_allowed

@private_web_planes.route('/requests/<int:request_id>', methods=['GET'])
@check_ip_allowed
def get_private_web_plan_request_by_id(request_id):
    try:
        web_plan_request = WebPlanRequest.query.get(request_id)
        if not web_plan_request:
            return jsonify({'status': 'error', 'message': 'Request not found'}), 404
        return jsonify({
            'status': 'success',
            'data': web_plan_request.to_dict()
        }), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500
