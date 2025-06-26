from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class ContactCategory(db.Model):
    __tablename__ = 'contact_categories'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    slug = db.Column(db.String(50), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # ContactForm relationship
    contact_forms = db.relationship('ContactForm', backref='category_ref', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'slug': self.slug,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class ContactForm(db.Model):
    __tablename__ = 'contact_forms'
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    cellphone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    category = db.Column(db.String(50), nullable=False)  # Category slug
    message = db.Column(db.Text, nullable=False)
    created_date = db.Column(db.String(10), nullable=False)  # YYYY-MM-DD Format
    created_time = db.Column(db.String(8), nullable=False)   # HH:MM:SS Format
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Foreign key to ContactCategory
    category_id = db.Column(db.Integer, db.ForeignKey('contact_categories.id'), nullable=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'cellphone': self.cellphone,
            'email': self.email,
            'category': self.category,
            'message': self.message,
            'created_date': self.created_date,
            'created_time': self.created_time,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'category_id': self.category_id
        }
