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
from app.models import db, ContactCategory, ContactStatus, ProjectQuoteStatus, ProjectQuoteCategory, WebPlanList
from app.models import BannedRut

def populate_fake_ruts():
    """
    Populates the BannedRut table with generic fake RUTs (7, 8, or 9 digits before the dash, with identical digits and variants with K/k).
    """
    print("Inserting generic fake RUTs into BannedRut...")
    fake_ruts = set()
    # Only RUTs with 7, 8, or 9 digits before the dash
    for length in [7, 8, 9]:
        for i in range(1, 10):
            num = str(i) * length
            fake_ruts.add(f"{num}-{i}")
            fake_ruts.add(f"{num}-K")
            fake_ruts.add(f"{num}-k")
    # Insert into the database if they do not exist
    for rut in fake_ruts:
        exists = BannedRut.query.filter_by(rut=rut).first()
        if not exists:
            banned = BannedRut(rut=rut, reason="Generic/fake auto-generated RUT")
            db.session.add(banned)
            print(f"Fake RUT inserted: {rut}")
        else:
            print(f"Fake RUT already exists: {rut}")

def init_database():
    """Initialize the database by creating tables and initial data."""
    
    app = create_app()
    
    with app.app_context():
        print("Creating tables...")
        db.create_all()
        print("Tables created successfully")
        
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
                print(f"Status inserted: {status_data['name']}")
            else:
                print(f"Status already exists: {status_data['name']}")

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
                print(f"Category inserted: {category_data['name']}")
            else:
                print(f"Category already exists: {category_data['name']}")
        
        project_quote_statuses_data = [
            {"name": "Enviado", "slug":"submitted"},
            {"name": "Leído (sin revisar)", "slug":"read_unreviewed"},
            {"name": "En revisión", "slug":"in_review"},
            {"name": "Aprobada", "slug":"approved"},
            {"name": "Cancelada", "slug":"cancelled"},
        ]
        
        print("Inserting project quote statuses...")
        for status_data in project_quote_statuses_data:
            existing_status = ProjectQuoteStatus.query.filter_by(name=status_data["name"]).first()
            if not existing_status:
                status = ProjectQuoteStatus(
                    name=status_data["name"],
                    slug=status_data["slug"]
                )
                db.session.add(status)
                print(f"Project quote status inserted: {status_data['name']}")
            else:
                print(f"Project quote status already exists: {status_data['name']}")
        
        project_quote_categories_data = [
            {"name": "Desarrollo Web", "slug": "web-development"},
            {"name": "Software Empresarial", "slug": "enterprise-software"},
            {"name": "Aplicaciones Móviles", "slug": "mobile-apps"},
            {"name": "E-commerce", "slug": "e-commerce"},
            {"name": "Entretenimiento", "slug": "entertainment"},
            {"name": "No especificado", "slug": "invalid"},
        ]
        
        print("Inserting project quote categories...")
        for category_data in project_quote_categories_data:
            existing_category = ProjectQuoteCategory.query.filter_by(slug=category_data["slug"]).first()
            if not existing_category:
                category = ProjectQuoteCategory(
                    name=category_data["name"],
                    slug=category_data["slug"]
                )
                db.session.add(category)
                print(f"Project quote category inserted: {category_data['name']}")
            else:
                print(f"Project quote category already exists: {category_data['name']}")

        web_plan_list_data = [
            {
                "name": "Proyecto LandingPro",
                "slug": "landingpro",
                "description": "Página web tipo landing page profesional, ideal para presentar servicios, personas, tu negocio o productos de manera efectiva y atractiva.",
                "demo_url": "https://demo.landingpro.reyesandfriends.cl/",
                "price_clp": 99990,
            },
        ]

        print("Inserting web plan list data...")
        for plan_data in web_plan_list_data:
            existing_plan = WebPlanList.query.filter_by(slug=plan_data["slug"]).first()
            if not existing_plan:
                plan = WebPlanList(
                    name=plan_data["name"],
                    slug=plan_data["slug"],
                    description=plan_data["description"],
                    demo_url=plan_data["demo_url"],
                    price_clp=plan_data["price_clp"]
                )
                db.session.add(plan)
                print(f"Web plan inserted: {plan_data['name']}")
            else:
                print(f"Web plan already exists: {plan_data['name']}")

        # Save changes
        db.session.commit()
        print("Contact categories, statuses, project quote statuses and categories initialized correctly")
        # Seed fake RUTs
        populate_fake_ruts()
        db.session.commit()
        print("RUTs falsos genéricos insertados correctamente")
        print("Database initialized completely")

def reset_database(auto_confirm=False):
    """Delete all tables and recreate them."""
    
    app = create_app()
    
    with app.app_context():
        print("WARNING: This will delete all existing tables and data.")
        if auto_confirm:
            confirm = "yes"
        else:
            confirm = input("Are you sure? (yes/no): ")
        
        if confirm.lower() in ['yes', 'y', 'sí', 'si']:
            print("Deleting tables...")
            db.drop_all()
            print("Tables deleted")

            init_database()
        else:
            print("Operation cancelled")

if __name__ == "__main__":
    valid_flags = ["--reset", "--fresh"]
    if len(sys.argv) > 1:
        flag = sys.argv[1]
        if flag == "--reset":
            reset_database()
        elif flag == "--fresh":
            reset_database(auto_confirm=True)
        else:
            print(f"Invalid flag: {flag}")
            print("Valid flags are:")
            for f in valid_flags:
                print(f"  {f}")
            print("No action was performed.")
    else:
        init_database()
