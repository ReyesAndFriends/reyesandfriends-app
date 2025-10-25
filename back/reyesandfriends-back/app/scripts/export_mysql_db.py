"""
Script to export MySQL database tables to JSON files.
Exports data from relevant tables to JSON for backup or migration.
"""

import os
import sys
import json
import argparse
import zipfile
import io
from datetime import datetime
from flask_mail import Mail, Message
from dotenv import load_dotenv

load_dotenv()

project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, project_root)

from app import create_app
from app.models import db, ContactForm, ContactFormReply, ProjectQuote, WebPlanRequest, VisitersCounter

def export_model_to_json_string(model):
    """Export all records of a model to a JSON string."""
    records = model.query.all()
    data = [r.to_dict() if hasattr(r, 'to_dict') else {col.name: getattr(r, col.name) for col in r.__table__.columns} for r in records]
    json_str = json.dumps(data, ensure_ascii=False, indent=2)
    print(f"Exported {len(data)} records from {model.__tablename__}")
    return model.__tablename__, json_str

def zip_json_strings_in_memory(json_dict):
    """Compress all JSON strings in json_dict into a zip file in memory."""
    mem_zip = io.BytesIO()
    with zipfile.ZipFile(mem_zip, 'w') as zipf:
        for table_name, json_str in json_dict.items():
            zipf.writestr(f"{table_name}.json", json_str)
    mem_zip.seek(0)
    print("Compressed files into memory ZIP")
    return mem_zip

def send_zip_by_email(app, zip_bytes, zip_filename, recipient_email):
    """Send the zip file by email using Flask-Mail, using in-memory bytes."""
    mail = Mail(app)
    with app.app_context():
        msg = Message(
            subject="Exportación de Base de Datos MySQL Reyes&Friends - Archivo ZIP",
            sender=os.environ.get("MAIL_USERNAME"),
            recipients=[recipient_email],
            body="Adjunto el respaldo de la base de datos en formato ZIP. Por favor, mantenga este archivo seguro."
        )
        msg.attach(zip_filename, "application/zip", zip_bytes.read())
        mail.send(msg)
        print(f"Sent zip file to {recipient_email}")

def main():
    parser = argparse.ArgumentParser(description="Export MySQL tables to JSON and optionally send by email.")
    parser.add_argument("--mail", type=str, help="Email address to send the ZIP file to.")
    args = parser.parse_args()

    if args.mail:
        allowed_domain = "@reyesandfriends.cl"
        mail_lower = args.mail.lower()
        if not mail_lower.endswith(allowed_domain):
            print(f"Error: Only {allowed_domain} emails are allowed.")
            sys.exit(1)

    app = create_app()
    with app.app_context():
        models_to_export = [
            ContactForm,
            ContactFormReply,
            ProjectQuote,
            WebPlanRequest,
            VisitersCounter
        ]
        json_dict = {}
        for model in models_to_export:
            table_name, json_str = export_model_to_json_string(model)
            json_dict[table_name] = json_str

    if args.mail:
        date_str = datetime.now().strftime("%Y%m%d")
        zip_filename = f"db_export_{date_str}.zip"
        mem_zip = zip_json_strings_in_memory(json_dict)
        send_zip_by_email(app, mem_zip, zip_filename, args.mail)
    else:
        print("\n=== Exported JSONs ===")
        for table_name, json_str in json_dict.items():
            print(f"\n--- {table_name}.json ---\n{json_str}")

if __name__ == "__main__":
    main()