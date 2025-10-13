from flask import request, jsonify, render_template
from flask_mail import Message
from app.models import db, ProjectQuote, ProjectQuoteCategory
from app import mail
from datetime import datetime
import os
from dotenv import load_dotenv
from . import quote

load_dotenv()
mail_username = os.getenv("MAIL_USERNAME")
if not mail_username:
    raise RuntimeError("MAIL_USERNAME is not set in the environment variables.")

@quote.route('/', methods=['POST'])
def submit_quote():
    """
    Main endpoint to send a complete quote
    Receives all wizard data and creates the quote
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'error': 'No data provided'
            }), 400
        
        # Validate that we have the required phases
        validation_errors = validate_quote_data(data)
        if validation_errors:
            return jsonify({
                'success': False,
                'error': 'Validation failed',
                'errors': validation_errors
            }), 400
        
        # Create new quote
        quote = ProjectQuote()
        quote.quote_number = quote.generate_quote_number()
        quote.submitted_at = datetime.utcnow()
        
        # Fill data from phases
        update_quote_from_data(quote, data)
        
        # Save to database
        db.session.add(quote)
        db.session.commit()
        
        # Send confirmation email
        try:
            send_quote_confirmation_email(quote)
        except Exception as email_error:
            print(f"Error sending email: {str(email_error)}")
            # Don't fail the entire request if email fails
        
        return jsonify({
            'success': True,
            'message': 'Quote submitted successfully',
            'quote': {
                'id': quote.id,
                'quote_number': quote.quote_number,
                'submitted_at': quote.submitted_at.isoformat(),
                'customer_name': f"{quote.first_name} {quote.last_name}",
                'email': quote.email,
                'project_type_id': quote.project_type_id
            }
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': f'Internal server error: {str(e)}'
        }), 500

def update_quote_from_data(quote, data):
    """Update quote object with request data"""
    
    # Phase 1: Personal data
    phase_one = data.get('phaseOne', {})
    quote.first_name = phase_one.get('firstName', '').strip()
    quote.last_name = phase_one.get('lastName', '').strip()
    quote.email = phase_one.get('email', '').strip()
    quote.phone = phase_one.get('phone', '').strip()
    quote.contact_method = phase_one.get('contactMethod', '').strip()
    
    # Phase 2: Company and purpose (nullable fields)
    phase_two = data.get('phaseTwo', {})
    quote.company_name = phase_two.get('companyName', '').strip() or None
    quote.company_type = phase_two.get('companyType', '').strip() or None
    quote.project_purpose = phase_two.get('projectPurpose', '').strip() or None
    
    # Phase 3: Technical scope
    phase_three = data.get('phaseThree', {})
    project_type_slug = phase_three.get('projectType', '').strip()
    
    # Find project category by slug
    project_category = ProjectQuoteCategory.query.filter_by(slug=project_type_slug).first()
    if not project_category:
        # If slug doesn't exist, use 'invalid' category as fallback
        project_category = ProjectQuoteCategory.query.filter_by(slug='invalid').first()
    
    quote.project_type_id = project_category.id if project_category else None
    quote.other_project_type = phase_three.get('otherProjectType', '').strip() or None
    quote.not_sure_project_type = phase_three.get('notSureProjectType', '').strip() or None
    quote.has_start_date = phase_three.get('hasStartDate', '').strip()
    quote.start_date = phase_three.get('startDate', '').strip() or None
    quote.estimated_budget = phase_three.get('estimatedBudget', '').strip() or None
    quote.delivery_timeframe = phase_three.get('deliveryTimeframe', '').strip() or None
    quote.project_details = phase_three.get('projectDetails', '').strip() or None
    
    # Phase 4: Deployment and services
    phase_four = data.get('phaseFour', {})
    quote.hosting_service = phase_four.get('hostingService', '').strip()
    quote.has_domain = phase_four.get('hasDomain', '').strip()
    quote.domain_name = phase_four.get('domainName', '').strip() or None
    quote.domain_suggestion = phase_four.get('domainSuggestion', '').strip() or None
    
    # Phase 5: Extras and final information (nullable fields)
    phase_five = data.get('phaseFive', {})
    quote.technology_preference = phase_five.get('technologyPreference', '').strip() or None
    quote.technology_list = phase_five.get('technologyList', '').strip() or None
    quote.avoid_technology_list = phase_five.get('avoidTechnologyList', '').strip() or None
    quote.key_functionalities = phase_five.get('keyFunctionalities', '').strip() or None
    quote.additional_comments = phase_five.get('additionalComments', '').strip() or None

def validate_quote_data(data):
    """Validate required data for the quote"""
    errors = {}
    
    # Validate Phase 1 (required)
    phase_one = data.get('phaseOne', {})
    if not phase_one.get('firstName', '').strip():
        errors['firstName'] = 'First name is required'
    
    if not phase_one.get('lastName', '').strip():
        errors['lastName'] = 'Last name is required'
    
    email = phase_one.get('email', '').strip()
    if not email:
        errors['email'] = 'Email is required'
    elif not is_valid_email(email):
        errors['email'] = 'Invalid email format'
    
    phone = phase_one.get('phone', '').strip()
    if not phone:
        errors['phone'] = 'Phone is required'
    elif not is_valid_phone(phone):
        errors['phone'] = 'Invalid phone format (+56912345678)'
    
    if not phase_one.get('contactMethod', '').strip():
        errors['contactMethod'] = 'Contact method is required'
    
    # Validate Phase 3 (required)
    phase_three = data.get('phaseThree', {})
    if not phase_three.get('projectType', '').strip():
        errors['projectType'] = 'Project type is required'
    
    if not phase_three.get('hasStartDate', '').strip():
        errors['hasStartDate'] = 'Start date preference is required'
    
    # Validate Phase 4 (required)
    phase_four = data.get('phaseFour', {})
    if not phase_four.get('hostingService', '').strip():
        errors['hostingService'] = 'Hosting service preference is required'
    
    if not phase_four.get('hasDomain', '').strip():
        errors['hasDomain'] = 'Domain preference is required'
    
    return errors

def is_valid_email(email):
    """Simple email validation"""
    import re
    pattern = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
    return re.match(pattern, email) is not None

def is_valid_phone(phone):
    """Chilean phone validation"""
    import re
    pattern = r'^\+569\d{8}$'
    return re.match(pattern, phone) is not None

current_year = datetime.utcnow().year

def send_quote_confirmation_email(quote):
    """Send confirmation email to the client"""
    try:
        user_name = f"{quote.first_name} {quote.last_name}"
        
        # Get project type name from category
        project_type_name = "No especificado"
        if quote.project_type_id:
            project_category = ProjectQuoteCategory.query.get(quote.project_type_id)
            if project_category:
                project_type_name = project_category.name
        
        email_html = render_template(
            'emails/quote-success.html',
            user_name=user_name,
            quote_number=quote.quote_number,
            project_type=project_type_name,
            company_name=quote.company_name,
            email=quote.email,
            phone=quote.phone,
            submitted_date=quote.submitted_at.strftime('%d/%m/%Y %H:%M'),
            hosting_service=quote.hosting_service,
            has_domain=quote.has_domain,
            delivery_timeframe=quote.delivery_timeframe,
            current_year=current_year
        )
        
        msg = Message(
            subject='Cotización Recibida - Reyes&Friends',
            sender=mail_username,
            recipients=[quote.email],
            html=email_html
        )
        
        mail.send(msg)
        
    except Exception as e:
        raise Exception(f"Failed to send confirmation email: {str(e)}")