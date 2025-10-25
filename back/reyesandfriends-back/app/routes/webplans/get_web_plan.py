from flask import Blueprint, jsonify
from app.models import WebPlanRequest
from app.utils.middleware.check_ip_allowed import check_ip_allowed
from . import webPlans

get_webPlan_bp = Blueprint('get_webPlan', __name__)

@webPlans.route('/<int:plan_id>', methods=['GET'])
@check_ip_allowed
def get_web_plan(plan_id):
    try:
        web_plan = WebPlanRequest.query.get(plan_id)
        if not web_plan:
            return jsonify({
                'success': False,
                'error': 'Solicitud de plan web no encontrada.'
            }), 404
        web_plan_dict = web_plan.to_dict()
        webplan = None
        if web_plan.webplan_id:
            from app.models import WebPlanList
            webplan_obj = WebPlanList.query.get(web_plan.webplan_id)
            if webplan_obj:
                webplan = webplan_obj.to_dict()
        web_plan_dict['webplan'] = webplan
        return jsonify({
            'success': True,
            'web_plan': web_plan_dict
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
