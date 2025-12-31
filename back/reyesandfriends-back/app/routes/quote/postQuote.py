from flask import request, jsonify, render_template
from flask_mail import Message
from app.models import db, ProjectQuote, ProjectQuoteCategory
from app import mail
from datetime import datetime
import os
from dotenv import load_dotenv
import requests
from . import quote

load_dotenv()
mail_username = os.getenv("MAIL_USERNAME")
TURNSTILE_SECRET_KEY = os.getenv("TURNSTILE_SECRET_KEY")
if not mail_username:
    raise RuntimeError("MAIL_USERNAME is not set in the environment variables.")
if not TURNSTILE_SECRET_KEY:
    raise RuntimeError("TURNSTILE_SECRET_KEY is not set in the environment variables.")

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

        # --- Turnstile validation ---
        turnstile_token = data.get("turnstile_token")
        if not turnstile_token:
            return jsonify({
                'success': False,
                'error': 'Captcha requerido. Por favor completa el captcha.'
            }), 400
        remoteip = request.remote_addr
        verify_resp = requests.post(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            data={
                "secret": TURNSTILE_SECRET_KEY,
                "response": turnstile_token,
                "remoteip": remoteip
            }
        )
        verify_data = verify_resp.json()
        if not verify_data.get("success"):
            return jsonify({
                'success': False,
                'error': 'No se pudo verificar el captcha. Intenta nuevamente.'
            }), 400
        # --- end Turnstile validation ---

        # Validate that we have the required phases
        validation_errors = validate_quote_data(data)
        if validation_errors:
            return jsonify({
                'success': False,
                'error': 'La validación falló',
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
            'message': 'Cotización de proyecto recibida con éxito.',
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
            'error': f'Error interno del servidor: {str(e)}'
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

    # --- Phase 1 ---
    phase_one = data.get('phaseOne', {})
    first_name = phase_one.get('firstName', '').strip()
    last_name = phase_one.get('lastName', '').strip()
    email = phase_one.get('email', '').strip()
    phone = phase_one.get('phone', '').strip()
    contact_method = phase_one.get('contactMethod', '').strip()

    # firstName: min 2, max 40
    if not first_name:
        errors['firstName'] = 'First name is required'
    elif len(first_name) < 2:
        errors['firstName'] = 'First name must be at least 2 characters'
    elif len(first_name) > 40:
        errors['firstName'] = 'First name must be at most 40 characters'

    # lastName: min 2, max 40
    if not last_name:
        errors['lastName'] = 'Last name is required'
    elif len(last_name) < 2:
        errors['lastName'] = 'Last name must be at least 2 characters'
    elif len(last_name) > 40:
        errors['lastName'] = 'Last name must be at most 40 characters'

    # email: min 6, max 80
    if not email:
        errors['email'] = 'Email is required'
    elif len(email) < 6:
        errors['email'] = 'Email must be at least 6 characters'
    elif len(email) > 80:
        errors['email'] = 'Email must be at most 80 characters'
    elif not is_valid_email(email):
        errors['email'] = 'Invalid email format'

    # phone: Chilean format
    if not phone:
        errors['phone'] = 'Phone is required'
    elif not is_valid_phone(phone):
        errors['phone'] = 'Invalid phone format (+56912345678)'

    # contactMethod: required
    if not contact_method:
        errors['contactMethod'] = 'Contact method is required'

    # --- Phase 2 ---
    phase_two = data.get('phaseTwo', {})
    company_name = phase_two.get('companyName', '').strip()
    company_type = phase_two.get('companyType', '').strip()
    project_purpose = phase_two.get('projectPurpose', '').strip()

    # companyType: required
    if not company_type:
        errors['companyType'] = 'Company type is required'
    # companyName: optional, min 2, max 80 if present
    if company_name:
        if len(company_name) < 2:
            errors['companyName'] = 'Company name must be at least 2 characters'
        elif len(company_name) > 80:
            errors['companyName'] = 'Company name must be at most 80 characters'
    # projectPurpose: required, min 10, max 2000
    if not project_purpose:
        errors['projectPurpose'] = 'Project purpose is required'
    elif len(project_purpose) < 10 or len(project_purpose) > 2000:
        errors['projectPurpose'] = 'Project purpose must be between 10 and 2000 characters'

    # --- Phase 3 ---
    phase_three = data.get('phaseThree', {})
    project_type = phase_three.get('projectType', '').strip()
    other_project_type = phase_three.get('otherProjectType', '').strip()
    not_sure_project_type = phase_three.get('notSureProjectType', '').strip()
    has_start_date = phase_three.get('hasStartDate', '').strip()
    start_date = phase_three.get('startDate', '').strip()
    estimated_budget = phase_three.get('estimatedBudget', '').strip()
    delivery_timeframe = phase_three.get('deliveryTimeframe', '').strip()
    project_details = phase_three.get('projectDetails', '').strip()

    # projectType: required
    if not project_type:
        errors['projectType'] = 'Project type is required'
    elif project_type == "other":
        # otherProjectType: required, min 3, max 80
        if not other_project_type:
            errors['otherProjectType'] = 'Other project type is required'
        elif len(other_project_type) < 3:
            errors['otherProjectType'] = 'Other project type must be at least 3 characters'
        elif len(other_project_type) > 80:
            errors['otherProjectType'] = 'Other project type must be at most 80 characters'
    elif project_type == "notSure":
        # notSureProjectType: required, min 10, max 200
        if not not_sure_project_type:
            errors['notSureProjectType'] = 'Not sure project type is required'
        elif len(not_sure_project_type) < 10:
            errors['notSureProjectType'] = 'Not sure project type must be at least 10 characters'
        elif len(not_sure_project_type) > 200:
            errors['notSureProjectType'] = 'Not sure project type must be at most 200 characters'

    # hasStartDate: required
    if not has_start_date:
        errors['hasStartDate'] = 'Start date preference is required'
    elif has_start_date == "yes" and not start_date:
        errors['startDate'] = 'Start date is required'

    # estimatedBudget: optional, must be a valid number if present
    if estimated_budget:
        try:
            float(estimated_budget)
        except ValueError:
            errors['estimatedBudget'] = 'Estimated budget must be a valid number'

    # deliveryTimeframe: optional, min 2, max 80 if present
    if delivery_timeframe:
        if len(delivery_timeframe) < 2:
            errors['deliveryTimeframe'] = 'Delivery timeframe must be at least 3 characters'
        elif len(delivery_timeframe) > 80:
            errors['deliveryTimeframe'] = 'Delivery timeframe must be at most 80 characters'

    # projectDetails: optional, min 50, max 2000 if present
    if project_details:
        if len(project_details) < 50 or len(project_details) > 2000:
            errors['projectDetails'] = 'Project details must be between 50 and 2000 characters'

    # --- Phase 4 ---
    phase_four = data.get('phaseFour', {})
    hosting_service = phase_four.get('hostingService', '').strip()
    has_domain = phase_four.get('hasDomain', '').strip()
    domain_name = phase_four.get('domainName', '').strip()
    domain_suggestion = phase_four.get('domainSuggestion', '').strip()

    # hostingService: required
    if not hosting_service:
        errors['hostingService'] = 'Hosting service preference is required'
    # hasDomain: required
    if not has_domain:
        errors['hasDomain'] = 'Domain preference is required'
    elif has_domain == "yes":
        # domainName: required, min 3, max 80
        if not domain_name:
            errors['domainName'] = 'Domain name is required'
        elif len(domain_name) < 3:
            errors['domainName'] = 'Domain name must be at least 3 characters'
        elif len(domain_name) > 80:
            errors['domainName'] = 'Domain name must be at most 80 characters'
    elif has_domain == "no":
        # domainSuggestion: required, min 3, max 80
        if not domain_suggestion:
            errors['domainSuggestion'] = 'Domain suggestion is required'
        elif len(domain_suggestion) < 3:
            errors['domainSuggestion'] = 'Domain suggestion must be at least 3 characters'
        elif len(domain_suggestion) > 80:
            errors['domainSuggestion'] = 'Domain suggestion must be at most 80 characters'

    # --- Phase 5 ---
    phase_five = data.get('phaseFive', {})
    technology_preference = phase_five.get('technologyPreference', '').strip()
    technology_list = phase_five.get('technologyList', '').strip()
    avoid_technology_list = phase_five.get('avoidTechnologyList', '').strip()
    key_functionalities = phase_five.get('keyFunctionalities', '').strip()
    additional_comments = phase_five.get('additionalComments', '').strip()

    # If technologyPreference is yes, technologyList and avoidTechnologyList required
    if technology_preference == "yes":
        # technologyList: required, min 2, max 200
        if not technology_list:
            errors['technologyList'] = 'Technology list is required'
        elif len(technology_list) < 2:
            errors['technologyList'] = 'Technology list must be at least 2 characters'
        elif len(technology_list) > 200:
            errors['technologyList'] = 'Technology list must be at most 200 characters'
        # avoidTechnologyList: required, min 2, max 200
        if not avoid_technology_list:
            errors['avoidTechnologyList'] = 'Avoid technology list is required'
        elif len(avoid_technology_list) < 2:
            errors['avoidTechnologyList'] = 'Avoid technology list must be at least 2 characters'
        elif len(avoid_technology_list) > 200:
            errors['avoidTechnologyList'] = 'Avoid technology list must be at most 200 characters'

    # keyFunctionalities: optional, min 10, max 1000 if present
    if key_functionalities:
        if len(key_functionalities) < 10 or len(key_functionalities) > 1000:
            errors['keyFunctionalities'] = 'Key functionalities must be between 10 and 1000 characters'

    # additionalComments: optional, min 20, max 2000 if present
    if additional_comments:
        if len(additional_comments) < 20 or len(additional_comments) > 2000:
            errors['additionalComments'] = 'Additional comments must be between 20 and 2000 characters'

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
            subject='Cotización de Software recibida - Reyes&Friends',
            sender=mail_username,
            recipients=[quote.email],
            html=email_html
        )
        
        mail.send(msg)
        
    except Exception as e:
        raise Exception(f"Error al enviar el correo de confirmación: {str(e)}")