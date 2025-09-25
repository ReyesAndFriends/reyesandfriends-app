from flask import Blueprint

visitors = Blueprint('visitors', __name__)

from . import register_visit, register_stats