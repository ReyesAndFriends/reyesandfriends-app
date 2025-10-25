"""
Script to export MySQL database tables to JSON files.
This script exports data from relevant tables to separate JSON files for backup or migration purposes.
"""

import os
import sys
import json

import argparse
import zipfile
from flask_mail import Mail, Message
from dotenv import load_dotenv

load_dotenv()

project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, project_root)

from app import create_app
from app.models import db, ContactForm, ContactFormReply, ProjectQuote, WebPlanRequest, VisitersCounter

def export_model_to_json(model, export_path):
    """Export all records of a model to a JSON file."""
    records = model.query.all()
    data = [r.to_dict() if hasattr(r, 'to_dict') else {c.name: getattr(r, c.name) for c in r.__table__.columns} for r in records]
    filename = f"{model.__tablename__}.json"
    filepath = os.path.join(export_path, filename)
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Exported {len(data)} records from {model.__tablename__} to {filepath}")

def zip_exported_files(export_path, zip_filename):
    """Compress all JSON files in export_path into a zip file."""
    zip_filepath = os.path.join(export_path, zip_filename)
    with zipfile.ZipFile(zip_filepath, 'w') as zipf:
        for fname in os.listdir(export_path):
            if fname.endswith('.json'):
                zipf.write(os.path.join(export_path, fname), fname)
    print(f"Compressed files into {zip_filepath}")
    return zip_filepath

def send_zip_by_mail(app, zip_filepath, recipient_email):
    """Send the zip file by email using Flask-Mail."""
    mail = Mail(app)
    with app.app_context():
        msg = Message(
            subject="Exportación de Base de Datos MySQL Reyes&Friends - Archivo ZIP",
            sender=os.environ.get("MAIL_USERNAME"),
            recipients=[recipient_email],
            body="Adjunto el respaldo de la base de datos en formato ZIP. Por favor, mantenga este archivo seguro."
        )
        with open(zip_filepath, "rb") as fp:
            msg.attach(os.path.basename(zip_filepath), "application/zip", fp.read())
        mail.send(msg)
        print(f"Sent zip file to {recipient_email}")

def main():
    parser = argparse.ArgumentParser(description="Export MySQL tables to JSON and optionally send by mail.")
    parser.add_argument("--mail", type=str, help="Email address to send the ZIP file to.")
    args = parser.parse_args()

    export_path = os.environ.get("DB_EXPORT_PATH")
    if not export_path:
        sys.exit(1)

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
        for model in models_to_export:
            export_model_to_json(model, export_path)

    if args.mail:
        zip_filename = "db_export.zip"
        zip_filepath = zip_exported_files(export_path, zip_filename)
        send_zip_by_mail(app, zip_filepath, args.mail)

if __name__ == "__main__":
    main()