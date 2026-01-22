from flask import jsonify
from app.models import WebPlanList, WebPlanImage
from . import web_planes

@web_planes.route('/<string:slug>', methods=['GET'])
def get_web_plan_by_slug(slug):
    try:
        plan = WebPlanList.query.filter_by(slug=slug).first()
        if not plan:
            return jsonify({
                'success': False,
                'error': 'Web plan not found'
            }), 404
        
        plan_dict = plan.to_dict()
        images = WebPlanImage.query.filter_by(id=plan.id).all()
        plan_dict['images'] = [image.to_dict() for image in images]
        
        return jsonify({
            'success': True,
            'web_plan': plan_dict
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500