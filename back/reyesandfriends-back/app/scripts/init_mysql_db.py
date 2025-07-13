"""
Script to initialize the MySQL database with Flask-SQLAlchemy.
This script creates the necessary tables and loads initial data for contact categories.
"""

import os
import sys
from datetime import datetime
import json

# Add the project root directory to the path to allow module imports
project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, project_root)

from app import create_app
from app.models import db, ContactCategory, ContactForm, ProjectQuote, ContactStatus

def init_database():
    """Initialize the database by creating tables and initial data."""
    
    app = create_app()
    
    with app.app_context():
        print("Creating tables...")
        db.create_all()
        print("✅ Tables created successfully")
        
        # Insert contact statuses if they don't exist
        statuses_data = [
            {"name": "Nuevo"},
            {"name": "Leído (Sin responder)"},
            {"name": "Respondido"}
        ]

        print("Inserting contact statuses...")
        for status_data in statuses_data:
            existing_status = ContactStatus.query.filter_by(name=status_data["name"]).first()
            if not existing_status:
                status = ContactStatus(name=status_data["name"])
                db.session.add(status)
                print(f"✅ Status inserted: {status_data['name']}")
            else:
                print(f"⚠️  Status already exists: {status_data['name']}")

        # Insert contact categories if they don't exist
        categories_data = [
            {"name": "Soporte técnico", "slug": "soporte"},
            {"name": "Pregunta sobre servicios", "slug": "servicios"},
            {"name": "Trabajo / Colaboraciones", "slug": "colaboracion"},
            {"name": "Dudas generales", "slug": "dudas"},
            {"name": "Saludos / Feedback", "slug": "feedback"},
            {"name": "Reporte de errores", "slug": "errores"},
            {"name": "Otro", "slug": "otro"}
        ]
        
        print("Inserting contact categories...")
        for category_data in categories_data:
            existing_category = ContactCategory.query.filter_by(slug=category_data["slug"]).first()
            if not existing_category:
                category = ContactCategory(
                    name=category_data["name"],
                    slug=category_data["slug"]
                )
                db.session.add(category)
                print(f"✅ Category inserted: {category_data['name']}")
            else:
                print(f"⚠️  Category already exists: {category_data['name']}")
        
        # Save changes
        db.session.commit()
        print("✅ Contact categories and statuses initialized correctly")
        
        print("✅ Database initialized completely")

def reset_database(auto_confirm=False):
    """Delete all tables and recreate them."""
    
    app = create_app()
    
    with app.app_context():
        print("⚠️  WARNING: This will delete all existing tables and data.")
        if auto_confirm:
            confirm = "yes"
        else:
            confirm = input("Are you sure? (yes/no): ")
        
        if confirm.lower() in ['yes', 'y', 'sí', 'si']:
            print("Deleting tables...")
            db.drop_all()
            print("✅ Tables deleted")
            
            init_database()
        else:
            print("❌ Operation cancelled")

if __name__ == "__main__":
    valid_flags = ["--reset", "--fresh"]
    if len(sys.argv) > 1:
        flag = sys.argv[1]
        if flag == "--reset":
            reset_database()
        elif flag == "--fresh":
            reset_database(auto_confirm=True)
        else:
            print(f"❌ Invalid flag: {flag}")
            print("Valid flags are:")
            for f in valid_flags:
                print(f"  {f}")
            print("No action was performed.")
    else:
        init_database()
