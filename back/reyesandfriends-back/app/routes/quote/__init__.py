from flask import Blueprint

quote = Blueprint('quote', __name__)

from . import get_quote, get_quotes, submit_quote, update_quote_status
