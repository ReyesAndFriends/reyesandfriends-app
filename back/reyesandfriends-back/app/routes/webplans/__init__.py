from flask import Blueprint

webPlans = Blueprint('webPlans', __name__)

from . import requestWebPlan, get_webPlans, get_webPlan