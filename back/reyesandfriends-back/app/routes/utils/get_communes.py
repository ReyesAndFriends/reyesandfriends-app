from flask import request, jsonify
from app.models import Commune, Region
from . import utils

@utils.route('/communes/<int:region_id>', methods=['GET'])
def get_communes(region_id):
    communes = Commune.query.filter_by(region_id=region_id).all()
    communes_list = [{'id': commune.id, 'name': commune.name} for commune in communes]
    return jsonify(communes_list)