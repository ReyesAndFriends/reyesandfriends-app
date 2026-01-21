from flask import Blueprint

visitors = Blueprint('visitors', __name__)

from . import register_visit, stat_detail ,register_stats