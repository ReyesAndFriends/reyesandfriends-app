"""
Script to initialize Flask-Migrate in the project.
Run this script after installing dependencies.
"""

import os
import sys

# Add the root directory to the path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from flask_migrate import init, migrate, upgrade
from app import create_app

def setup_migrations():
    """Configure Flask-Migrate for the project."""
    
    app = create_app()
    
    with app.app_context():
        # Check if migrations folder already exists
        if not os.path.exists('migrations'):
            print("Initializing Flask-Migrate...")
            init()
            print("✅ Flask-Migrate initialized")
        else:
            print("⚠️  Flask-Migrate is already initialized")
        
        print("Creating initial migration...")
        migrate(message="Initial migration")
        print("✅ Initial migration created")
        
        print("Applying migrations...")
        upgrade()
        print("✅ Migrations applied")

if __name__ == "__main__":
    setup_migrations()
