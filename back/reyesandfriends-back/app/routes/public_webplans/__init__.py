from flask import Blueprint

web_planes = Blueprint('web_planes', __name__)

from . import get_web_planes, get_web_plan