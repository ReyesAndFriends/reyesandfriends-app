from flask import Blueprint

webPlans = Blueprint('webPlans', __name__)

from . import request_web_plan, get_web_plans, get_web_plan