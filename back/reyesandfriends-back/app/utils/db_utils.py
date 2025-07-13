from app.models import db, ContactCategory

def get_contact_categories():
    """
    Obtiene todas las categorías de contacto.
    
    :return: Lista de categorías en formato dict
    """
    categories = ContactCategory.query.all()
    return [category.to_dict() for category in categories]

def get_contact_category_by_slug(slug):
    """
    Obtiene una categoría de contacto por su slug.
    
    :param slug: Slug de la categoría
    :return: Categoría encontrada o None
    """
    return ContactCategory.query.filter_by(slug=slug).first()
