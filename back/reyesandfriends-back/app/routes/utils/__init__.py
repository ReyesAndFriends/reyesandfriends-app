from flask import Blueprint

utils = Blueprint('utils', __name__)

from . import get_regions, get_communes