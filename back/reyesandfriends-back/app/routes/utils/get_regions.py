from flask import request, jsonify
from app.models import Commune, Region
from . import utils

@utils.route('/regions', methods=['GET'])
def get_regions():
    regions = Region.query.all()
    regions_list = [{'id': region.id, 'name': region.name} for region in regions]
    return jsonify(regions_list)