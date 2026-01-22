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

class ContactStatus(db.Model):
    __tablename__ = 'contact_statuses'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class ContactForm(db.Model):
    __tablename__ = 'contact_forms'
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    cellphone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_date = db.Column(db.String(10), nullable=False)  # YYYY-MM-DD Format
    created_time = db.Column(db.String(8), nullable=False)   # HH:MM:SS Format
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Foreign key to ContactCategory
    category_id = db.Column(db.Integer, db.ForeignKey('contact_categories.id'), nullable=False)
    # Status relationship
    status_id = db.Column(db.Integer, db.ForeignKey('contact_statuses.id'), nullable=False, default=1)
    status = db.relationship('ContactStatus', backref='contact_forms', lazy=True)
    # Relationship to replies
    replies = db.relationship('ContactFormReply', backref='contact_form', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'cellphone': self.cellphone,
            'email': self.email,
            'category': self.category_ref.name if self.category_ref else None,
            'message': self.message,
            'created_date': self.created_date,
            'created_time': self.created_time,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'category_id': self.category_id,
            'status': self.status.name if self.status else None,
            'replies': [reply.to_dict() for reply in self.replies] if hasattr(self, 'replies') else []
        }

class ContactFormReply(db.Model):
    __tablename__ = 'contact_form_replies'

    id = db.Column(db.Integer, primary_key=True)
    contact_form_id = db.Column(db.Integer, db.ForeignKey('contact_forms.id'), nullable=False, unique=True)
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

class ProjectQuoteStatus(db.Model):
    __tablename__ = 'project_quote_statuses'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    slug = db.Column(db.String(50), unique=True, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'slug': self.slug,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
class ProjectQuoteCategory(db.Model):
    __tablename__ = 'project_quote_categories'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    slug = db.Column(db.String(50), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
        
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'slug': self.slug,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class ProjectQuote(db.Model):
    __tablename__ = 'project_quotes'
    
    id = db.Column(db.Integer, primary_key=True)
    quote_number = db.Column(db.String(20), unique=True, nullable=False)  # QT-2025-001 format
    status_id = db.Column(db.Integer, db.ForeignKey('project_quote_statuses.id'), nullable=False, default=1)    
    
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
    project_type_id = db.Column(db.Integer, db.ForeignKey('project_quote_categories.id'), nullable=False)
    other_project_type = db.Column(db.String(200), nullable=True)
    not_sure_project_type = db.Column(db.Text, nullable=True)
    has_start_date = db.Column(db.String(10), nullable=False)  # yes/no
    start_date = db.Column(db.String(10), nullable=True)  # YYYY-MM-DD
    estimated_budget = db.Column(db.String(50), nullable=True)
    delivery_timeframe = db.Column(db.String(50), nullable=True)
    project_details = db.Column(db.Text, nullable=True)
    
    # Relationships
    status = db.relationship('ProjectQuoteStatus', backref='project_quotes', lazy=True)
    project_type = db.relationship('ProjectQuoteCategory', backref='project_quotes', lazy=True)
    
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
    
    # Admin fields (opcional)
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
        # Get status info
        status_info = None
        if self.status_id:
            status = ProjectQuoteStatus.query.get(self.status_id)
            if status:
                status_info = {'name': status.name, 'slug': status.slug}
        
        # Get project type info
        project_type_info = None
        if self.project_type_id:
            project_category = ProjectQuoteCategory.query.get(self.project_type_id)
            if project_category:
                project_type_info = {'name': project_category.name, 'slug': project_category.slug}
        
        return {
            'id': self.id,
            'quote_number': self.quote_number,
            'status': status_info,
            
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
            'project_type': project_type_info,
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
                'projectType': self.project_type_id or '',
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
    
class WebPlanList(db.Model):
    __tablename__ = 'web_plan_lists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    slug = db.Column(db.String(50), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=True)
    demo_url = db.Column(db.String(200), nullable=True)
    price_clp = db.Column(db.Float, nullable=False)
    number_of_months = db.Column(db.Integer, nullable=False, default=12)
    final_price_clp = db.Column(db.Float, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'slug': self.slug,
            'description': self.description,
            'price_clp': self.price_clp,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
class WebPlanImage(db.Model):
    __tablename__ = 'web_plan_images'

    id = db.Column(db.Integer, primary_key=True)
    webplan_id = db.Column(db.Integer, db.ForeignKey('web_plan_lists.id'), nullable=False)
    image_url = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    webplan = db.relationship('WebPlanList', backref='images', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'webplan_id': self.webplan_id,
            'image_url': self.image_url,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class WebPlanRequest(db.Model):
    __tablename__ = 'web_plan_requests'

    id = db.Column(db.Integer, primary_key=True)
    request_number = db.Column(db.String(20), unique=True, nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    user_email = db.Column(db.String(120), nullable=False)
    rut = db.Column(db.String(20), nullable=False)
    webplan_id = db.Column(db.Integer, db.ForeignKey('web_plan_lists.id'), nullable=True)
    cellphone = db.Column(db.String(20), nullable=False)
    whatsapp_response = db.Column(db.Boolean, nullable=False, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'request_number': self.request_number,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'user_email': self.user_email,
            'rut': self.rut,
            'webplan_id': self.webplan_id,
            'cellphone': self.cellphone,
            'whatsapp_response': self.whatsapp_response,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class VisitersCounter(db.Model):
    __tablename__ = 'visitors_counter'
        
    id = db.Column(db.Integer, primary_key=True)
    ip_address = db.Column(db.String(45),nullable=False)  # Supports IPv6
    country = db.Column(db.String(100), nullable=True)
    country_name = db.Column(db.String(100), nullable=True)
    date_visited = db.Column(db.DateTime, default=datetime.utcnow)
        
    def to_dict(self):
        return {
            'id': self.id,
            'ipAddress': self.ip_address,
            'country': self.country,
            'dateVisited': self.date_visited.isoformat() if self.date_visited else None
        }
    
class BannedRut(db.Model):
    __tablename__ = 'banned_ruts'
    
    id = db.Column(db.Integer, primary_key=True)
    rut = db.Column(db.String(20), unique=True, nullable=False)
    reason = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'rut': self.rut,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class NotAllowedIpRecord(db.Model):
    __tablename__ = 'not_allowed_ip_records'
    id = db.Column(db.Integer, primary_key=True)
    ip_address = db.Column(db.String(45), nullable=False)
    url_accessed = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)