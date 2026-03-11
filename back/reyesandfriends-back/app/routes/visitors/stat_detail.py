from flask import Blueprint, jsonify, request
from datetime import datetime, timedelta
from sqlalchemy import func, desc, and_
from app.models import VisitersCounter
from app import db
from app.utils.middleware.check_ip_allowed import check_ip_allowed
from . import visitors

@visitors.route('/stats/<int:id>', methods=['GET'])
@check_ip_allowed
def get_stat_detail(id):

    stat = VisitersCounter.query.filter_by(id=id).first()

    if not stat:
        return jsonify({"error": "Stat not found"}), 404
    
    ip_visit_count = VisitersCounter.query.filter_by(ip_address=stat.ip_address).count()

    return jsonify({
        "id": stat.id,
        "ipAddress": stat.ip_address,
        "country": stat.country,
        "countryName": stat.country_name,
        "dateVisited": stat.date_visited.isoformat() if stat.date_visited else None,
        "ip_visit_count": ip_visit_count
    }), 200