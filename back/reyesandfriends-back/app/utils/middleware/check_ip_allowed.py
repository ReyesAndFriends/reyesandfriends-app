import os
from flask import request, abort
from functools import wraps

allowed_ips = [ip.strip() for ip in os.getenv("ALLOWED_IPS", "").split(",") if ip.strip()]

def check_ip_allowed(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        client_ip = request.remote_addr
        if client_ip not in allowed_ips:
            abort(403, description=f"Lo sentimos, su dirección IP ({client_ip}) no está autorizada para acceder a este recurso. Regrese a la página anterior o vaya a ver cualquier otra cosa, si vos sabes que no deberías estar viendo esto! =)")
        return f(*args, **kwargs)
    return decorated_function