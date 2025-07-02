import os
from flask import request, abort
from functools import wraps

allowed_ips = [ip.strip() for ip in os.getenv("ALLOWED_IPS", "").split(",") if ip.strip()]

def check_ip_allowed(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        client_ip = request.remote_addr
        if client_ip not in allowed_ips:
            abort(403, description="IP not allowed. waja")
        return f(*args, **kwargs)
    return decorated_function