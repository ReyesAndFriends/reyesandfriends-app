from flask import Blueprint, jsonify, request
from datetime import datetime, timedelta
from app.models import VisitersCounter
from app import db
from sqlalchemy.exc import IntegrityError
from . import visitors

register_visit_bp = Blueprint('register_visit', __name__)

@visitors.route('/register', methods=['POST'])
def register_visit():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'message': 'Datos requeridos',
                'error': 'No se recibieron datos'
            }), 400
            
        ip_address = data.get('ipAddress')
        country = data.get('country')
        
        if not ip_address or not country:
            return jsonify({
                'message': 'Campos requeridos faltantes',
                'error': 'ipAddress y country son obligatorios'
            }), 400
        
        # Search last visit by this IP
        last_visit = VisitersCounter.query.filter(
            VisitersCounter.ip_address == ip_address
        ).order_by(VisitersCounter.date_visited.desc()).first()
        
        # If IP, check last 24h
        if last_visit:
            twenty_four_hours_ago = datetime.utcnow() - timedelta(hours=24)
            if last_visit.date_visited > twenty_four_hours_ago:
                return jsonify({
                    'message': 'Su visita ya ha sido registrada en las últimas 24 horas. Muchas gracias.',
                    'status': 'already_registered'
                }), 200
        
        new_visit = VisitersCounter(
            ip_address=ip_address,
            country=country,
            country_name=country,
            date_visited=datetime.utcnow()  # Server time
        )
        
        db.session.add(new_visit)
        db.session.commit()
        
        return jsonify({
            'message': 'Visita registrada exitosamente. Muchas gracias.',
            'status': 'registered',
            'visit': new_visit.to_dict()
        }), 201
        
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({
            'message': 'Error de integridad en la base de datos',
            'error': str(e)
        }), 500
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'message': 'Error al registrar la visita',
            'error': str(e)
        }), 500
