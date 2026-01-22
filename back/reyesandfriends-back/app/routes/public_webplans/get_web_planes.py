from flask import jsonify
from app.models import WebPlanList, WebPlanImage
from . import web_planes

@web_planes.route('/', methods=['GET'])
def get_web_planes():
    try:
        web_plans = WebPlanList.query.all()
        result = []
        for plan in web_plans:
            plan_dict = plan.to_dict()

            images = WebPlanImage.query.filter_by(webplan_id=plan.id).limit(1).all()
            plan_dict['images'] = [image.to_dict() for image in images]
            result.append(plan_dict)
        
        return jsonify({
            'success': True,
            'web_plans': result
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
