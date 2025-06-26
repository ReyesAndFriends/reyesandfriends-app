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
from app.models import db, ContactCategory, ContactForm, ProjectQuote

def init_database():
    """Initialize the database by creating tables and initial data."""
    
    app = create_app()
    
    with app.app_context():
        print("Creating tables...")
        db.create_all()
        print("✅ Tables created successfully")
        
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
        print("✅ Contact categories initialized correctly")
        
        print("✅ Database initialized completely")

def reset_database():
    """Delete all tables and recreate them."""
    
    app = create_app()
    
    with app.app_context():
        print("⚠️  WARNING: This will delete all existing tables and data.")
        confirm = input("Are you sure? (yes/no): ")
        
        if confirm.lower() in ['yes', 'y', 'sí', 'si']:
            print("Deleting tables...")
            db.drop_all()
            print("✅ Tables deleted")
            
            init_database()
        else:
            print("❌ Operation cancelled")

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--reset":
        reset_database()
    else:
        init_database()
