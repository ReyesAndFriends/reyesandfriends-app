from flask import Blueprint

private_web_planes = Blueprint('private_web_planes', __name__)

from . import get_web_planes_requests, get_web_planes_request