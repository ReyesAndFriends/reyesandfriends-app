from flask import Blueprint

webPlans = Blueprint('webPlans', __name__)

from . import get_web_plans, request_web_plan, get_web_plan