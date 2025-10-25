"""
Script to export MySQL database tables to JSON files.
This script exports data from relevant tables to separate JSON files for backup or migration purposes.
"""

import os
import sys
import json
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

def main():
    export_path = os.environ.get("DB_EXPORT_PATH")
    if not export_path:
        print("Error: DB_EXPORT_PATH environment variable not set.")
        sys.exit(1)
    if not os.path.exists(export_path):
        os.makedirs(export_path)

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

if __name__ == "__main__":
    main()