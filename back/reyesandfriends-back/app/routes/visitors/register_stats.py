from flask import Blueprint, jsonify, request
from datetime import datetime, timedelta
from sqlalchemy import func, desc, and_
from app.models import VisitersCounter
from app import db
from . import visitors

@visitors.route('/stats', methods=['GET'])
def get_stats():
    """Get comprehensive visitor statistics"""
    try:
        # Get query parameters
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')
        country = request.args.get('country')
        limit = request.args.get('limit', 100, type=int)
        
        # Build filter conditions
        filters = []
        
        if start_date:
            start_date = datetime.strptime(start_date, '%Y-%m-%d')
            filters.append(VisitersCounter.date_visited >= start_date)
        
        if end_date:
            end_date = datetime.strptime(end_date, '%Y-%m-%d') + timedelta(days=1)
            filters.append(VisitersCounter.date_visited < end_date)
            
        if country:
            filters.append(VisitersCounter.country == country.upper())
        
        # Base query with filters
        if filters:
            base_filter = and_(*filters)
        else:
            base_filter = True
        
        # Get total visits
        total_visits = VisitersCounter.query.filter(base_filter).count()
        
        # Get last visit
        last_visit = VisitersCounter.query.filter(base_filter).order_by(desc(VisitersCounter.date_visited)).first()
        
        # Get visits by country
        country_stats = db.session.query(
            VisitersCounter.country,
            VisitersCounter.country_name,
            func.count(VisitersCounter.id).label('count')
        ).filter(base_filter).group_by(
            VisitersCounter.country, 
            VisitersCounter.country_name
        ).order_by(desc('count')).limit(limit).all()
        
        # Get daily visits for the last 30 days
        thirty_days_ago = datetime.utcnow() - timedelta(days=30)
        daily_stats = db.session.query(
            func.date(VisitersCounter.date_visited).label('date'),
            func.count(VisitersCounter.id).label('count')
        ).filter(
            VisitersCounter.date_visited >= thirty_days_ago
        ).group_by(
            func.date(VisitersCounter.date_visited)
        ).order_by('date').all()
        
        # Get unique visitors (unique IPs)
        unique_visitors = db.session.query(
            func.count(func.distinct(VisitersCounter.ip_address))
        ).filter(base_filter).scalar()
        
        # Format response
        stats = {
            'summary': {
                'total_visits': total_visits,
                'unique_visitors': unique_visitors,
                'last_visit': {
                    'date': last_visit.date_visited.isoformat() if last_visit else None,
                    'country': last_visit.country_name if last_visit else None,
                    'ip': last_visit.ip_address if last_visit else None
                }
            },
            'countries': [
                {
                    'country_code': stat.country,
                    'country_name': stat.country_name,
                    'visits': stat.count
                }
                for stat in country_stats
            ],
            'daily_visits': [
                {
                    'date': stat.date.isoformat(),
                    'visits': stat.count
                }
                for stat in daily_stats
            ],
            'filters_applied': {
                'start_date': start_date.strftime('%Y-%m-%d') if start_date else None,
                'end_date': (end_date - timedelta(days=1)).strftime('%Y-%m-%d') if end_date else None,
                'country': country,
                'limit': limit
            }
        }
        
        return jsonify(stats), 200
        
    except ValueError as e:
        return jsonify({
            'error': 'Formato de fecha inválido. Use YYYY-MM-DD',
            'details': str(e)
        }), 400
    except Exception as e:
        return jsonify({
            'error': 'Error al obtener estadísticas',
            'details': str(e)
        }), 500

@visitors.route('/stats/top-countries', methods=['GET'])
def get_top_countries():
    """Get top countries by visits"""
    try:
        limit = request.args.get('limit', 10, type=int)
        
        top_countries = db.session.query(
            VisitersCounter.country,
            VisitersCounter.country_name,
            func.count(VisitersCounter.id).label('visits'),
            func.count(func.distinct(VisitersCounter.ip_address)).label('unique_visitors')
        ).group_by(
            VisitersCounter.country,
            VisitersCounter.country_name
        ).order_by(desc('visits')).limit(limit).all()
        
        result = [
            {
                'country_code': country.country,
                'country_name': country.country_name,
                'total_visits': country.visits,
                'unique_visitors': country.unique_visitors
            }
            for country in top_countries
        ]
        
        return jsonify({
            'top_countries': result,
            'limit': limit
        }), 200
        
    except Exception as e:
        return jsonify({
            'error': 'Error al obtener países principales',
            'details': str(e)
        }), 500
