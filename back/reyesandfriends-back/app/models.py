from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import Numeric
import json

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
    
    # Relationship to replies
    replies = db.relationship('ContactFormReply', backref='contact_form', lazy=True)
    
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
            'category_id': self.category_id,
            'replies': [reply.to_dict() for reply in self.replies] if hasattr(self, 'replies') else []
        }

class ContactFormReply(db.Model):
    __tablename__ = 'contact_form_replies'

    id = db.Column(db.Integer, primary_key=True)
    contact_form_id = db.Column(db.Integer, db.ForeignKey('contact_forms.id'), nullable=False)
    sender = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'contact_form_id': self.contact_form_id,
            'sender': self.sender,
            'message': self.message,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class ProjectQuote(db.Model):
    __tablename__ = 'project_quotes'
    
    id = db.Column(db.Integer, primary_key=True)
    quote_number = db.Column(db.String(20), unique=True, nullable=False)  # QT-2025-001 format
    status = db.Column(db.String(20), default='draft')  # draft, submitted, reviewed, approved, rejected
    
    # Phase 1: Personal Data
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    contact_method = db.Column(db.String(20), nullable=False)  # email, phone, whatsapp
    
    # Phase 2: Company and Purpose
    company_name = db.Column(db.String(200), nullable=True)
    company_type = db.Column(db.String(100), nullable=True)
    project_purpose = db.Column(db.Text, nullable=True)
    
    # Phase 3: Technical and Functional Scope
    project_type = db.Column(db.String(50), nullable=False)  # webProgramming, enterpriseSoftware, etc.
    other_project_type = db.Column(db.String(200), nullable=True)
    not_sure_project_type = db.Column(db.Text, nullable=True)
    has_start_date = db.Column(db.String(10), nullable=False)  # yes/no
    start_date = db.Column(db.String(10), nullable=True)  # YYYY-MM-DD
    estimated_budget = db.Column(db.String(50), nullable=True)
    delivery_timeframe = db.Column(db.String(50), nullable=True)
    project_details = db.Column(db.Text, nullable=True)
    
    # Phase 4: Deployment and Additional Services
    hosting_service = db.Column(db.String(10), nullable=False)  # yes/no
    has_domain = db.Column(db.String(10), nullable=False)  # yes/no/notSure
    domain_name = db.Column(db.String(200), nullable=True)
    domain_suggestion = db.Column(db.String(200), nullable=True)
    
    # Phase 5: Extras and Final Information
    technology_preference = db.Column(db.String(20), nullable=True)  # specific/avoid/none
    technology_list = db.Column(db.Text, nullable=True)
    avoid_technology_list = db.Column(db.Text, nullable=True)
    key_functionalities = db.Column(db.Text, nullable=True)
    additional_comments = db.Column(db.Text, nullable=True)
    
    # System fields
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    submitted_at = db.Column(db.DateTime, nullable=True)
    
    # Admin fields (opcional - para uso futuro)
    admin_notes = db.Column(db.Text, nullable=True)
    
    def generate_quote_number(self):
        """Generate a unique quote number in format QT-YYYY-NNN"""
        from sqlalchemy import func
        current_year = datetime.now().year
        
        # Get the count of quotes for current year
        count = db.session.query(func.count(ProjectQuote.id)).filter(
            func.extract('year', ProjectQuote.created_at) == current_year
        ).scalar() or 0
        
        return f"QT-{current_year}-{str(count + 1).zfill(3)}"
    
    def to_dict(self):
        return {
            'id': self.id,
            'quote_number': self.quote_number,
            'status': self.status,
            
            # Phase 1
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'phone': self.phone,
            'contact_method': self.contact_method,
            
            # Phase 2
            'company_name': self.company_name,
            'company_type': self.company_type,
            'project_purpose': self.project_purpose,
            
            # Phase 3
            'project_type': self.project_type,
            'other_project_type': self.other_project_type,
            'not_sure_project_type': self.not_sure_project_type,
            'has_start_date': self.has_start_date,
            'start_date': self.start_date,
            'estimated_budget': self.estimated_budget,
            'delivery_timeframe': self.delivery_timeframe,
            'project_details': self.project_details,
            
            # Phase 4
            'hosting_service': self.hosting_service,
            'has_domain': self.has_domain,
            'domain_name': self.domain_name,
            'domain_suggestion': self.domain_suggestion,
            
            # Phase 5
            'technology_preference': self.technology_preference,
            'technology_list': self.technology_list,
            'avoid_technology_list': self.avoid_technology_list,
            'key_functionalities': self.key_functionalities,
            'additional_comments': self.additional_comments,
            
            # System fields
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'submitted_at': self.submitted_at.isoformat() if self.submitted_at else None,
            
            # Admin fields
            'admin_notes': self.admin_notes
        }
    
    def to_phases_dict(self):
        """Return data organized by phases for the frontend"""
        return {
            'phaseOne': {
                'firstName': self.first_name or '',
                'lastName': self.last_name or '',
                'email': self.email or '',
                'phone': self.phone or '',
                'contactMethod': self.contact_method or ''
            },
            'phaseTwo': {
                'companyName': self.company_name or '',
                'companyType': self.company_type or '',
                'projectPurpose': self.project_purpose or ''
            },
            'phaseThree': {
                'projectType': self.project_type or '',
                'otherProjectType': self.other_project_type or '',
                'notSureProjectType': self.not_sure_project_type or '',
                'hasStartDate': self.has_start_date or '',
                'startDate': self.start_date or '',
                'estimatedBudget': self.estimated_budget or '',
                'deliveryTimeframe': self.delivery_timeframe or '',
                'projectDetails': self.project_details or ''
            },
            'phaseFour': {
                'hostingService': self.hosting_service or '',
                'hasDomain': self.has_domain or '',
                'domainName': self.domain_name or '',
                'domainSuggestion': self.domain_suggestion or ''
            },
            'phaseFive': {
                'technologyPreference': self.technology_preference or '',
                'technologyList': self.technology_list or '',
                'avoidTechnologyList': self.avoid_technology_list or '',
                'keyFunctionalities': self.key_functionalities or '',
                'additionalComments': self.additional_comments or ''
            }
        }


