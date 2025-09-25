from flask import Blueprint, jsonify, request
from datetime import datetime, timedelta
import geoip2.database
import geoip2.errors
import os
import requests
import ipaddress
from app.models import VisitersCounter
from app import db
from . import visitors

register_visit_bp = Blueprint('register_visit', __name__)

def is_private_ip(ip):
    """Check if the IP is private, return True if it's private, False otherwise."""
    try:
        return ipaddress.ip_address(ip).is_private
    except ValueError:
        return False

def get_public_ip():
    """Get the real public IP by querying an external service, should only be used in development."""
    try:
        response = requests.get('https://api.ipify.org', timeout=5)
        return response.text.strip()
    except:
        try:
            response = requests.get('https://ifconfig.me/ip', timeout=5)
            return response.text.strip()
        except:
            return None

def get_country_from_ip(ip_address):
    """Get the country from an IP address using GeoIP2"""
    try:
        # If it's a private IP, get the public IP
        if is_private_ip(ip_address):
            public_ip = get_public_ip()
            if public_ip:
                ip_address = public_ip
            else:
                print("Could not obtain public IP")
                return None, None
        
        # GeoLite2 database path
        db_path = os.path.join(os.path.dirname(__file__), '..', '..', '..', 'app', 'utils', 'geoip2', 'GeoLite2-Country.mmdb')

        
        with geoip2.database.Reader(db_path) as reader:
            response = reader.country(ip_address)
            country_code = response.country.iso_code
            country_name = response.country.name
            return country_code, country_name
    except (geoip2.errors.AddressNotFoundError, geoip2.errors.GeoIP2Error, FileNotFoundError) as e:
        return None, None

@visitors.route('/register', methods=['POST'])
def register_visit():
    try:
        # Get client IP
        client_ip = request.environ.get('HTTP_X_FORWARDED_FOR', request.remote_addr)
        if client_ip:
            client_ip = client_ip.split(',')[0].strip()
        
        # Check if the IP already registered a visit in the last 24 hours
        twenty_four_hours_ago = datetime.utcnow() - timedelta(hours=24)
        existing_visit = VisitersCounter.query.filter(
            VisitersCounter.ip_address == client_ip,
            VisitersCounter.date_visited >= twenty_four_hours_ago
        ).first()
        
        if existing_visit:
            return jsonify({
                'message': 'Su visita ya ha sido registrada en las últimas 24 horas. Muchas gracias.',
                'status': 'already_registered'
            }), 200
        
        # Get country from IP
        country_code, country_name = get_country_from_ip(client_ip)
        
        # Save visit to database
        new_visit = VisitersCounter(
            ip_address=client_ip,
            country=country_code,
            country_name=country_name,
            date_visited=datetime.utcnow()
        )
        
        db.session.add(new_visit)
        db.session.commit()
        
        return jsonify({
            'message': 'Visita registrada exitosamente. Muchas gracias.',
            'status': 'registered',
            'visit': new_visit.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'message': 'Error al registrar la visita',
            'error': str(e)
        }), 500