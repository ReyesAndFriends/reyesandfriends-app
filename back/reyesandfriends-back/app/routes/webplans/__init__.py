from flask import Blueprint

webPlans = Blueprint('webPlans', __name__)

from . import requestWebPlan