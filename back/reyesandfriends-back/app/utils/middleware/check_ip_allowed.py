import os
from flask import request, abort
from functools import wraps
from app.models import NotAllowedIpRecord
from app import db

try:
    allowed_ips_env = os.getenv("ALLOWED_IPS", "")
    if not allowed_ips_env.strip():
        raise ValueError("ALLOWED_IPS no está configurado")
    allowed_ips = [ip.strip() for ip in allowed_ips_env.split(",") if ip.strip()]
    if not allowed_ips:
        raise ValueError("No hay direcciones IP válidas en ALLOWED_IPS")
except ValueError as e:
    print(f"Error de configuración: {e}")
    allowed_ips = []

def get_client_ip():
    if "X-Real-IP" in request.headers:
        return request.headers["X-Real-IP"]
    elif "X-Forwarded-For" in request.headers:
        # Original client IP
        return request.headers["X-Forwarded-For"].split(",")[0].strip()
    return request.remote_addr

def check_ip_allowed(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not allowed_ips:
            abort(
                403,
                description=(
                    "No se han configurado direcciones IP autorizadas en la lista. "
                    "Por lo tanto, el acceso a este recurso está bloqueado. "
                    "Contacte al administrador del sistema."
                )
            )
        
        client_ip = get_client_ip()
        if client_ip not in allowed_ips:

            # Register Not authorized IP access attempt
            not_allowed_ip_record = NotAllowedIpRecord(
                ip_address=client_ip,
                url_accessed=request.url
            )

            db.session.add(not_allowed_ip_record)
            db.session.commit()

            abort(
                403,
                description=(
                    f"Lo sentimos, su dirección IP ({client_ip}) no está autorizada para acceder a este recurso. Por favor, regrese a la página anterior.")
            )
        return f(*args, **kwargs)
    return decorated_function