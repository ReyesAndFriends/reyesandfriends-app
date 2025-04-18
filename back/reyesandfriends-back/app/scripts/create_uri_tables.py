import os
from datetime import datetime
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise ValueError("MONGO_URI is not defined on .env file")

client = MongoClient(MONGO_URI)
db_name = "reyesandfriends"
db = client[db_name]

collections = [
    "contact_categories",
    "contact_forms",
]

for collection_name in collections:
    if collection_name not in db.list_collection_names():
        db.create_collection(collection_name)
        print(f"Collection '{collection_name}' created.")
    else:
        print(f"Collection '{collection_name}' already exists.")

contact_categories = [
    { "name": "Soporte técnico", "slug": "soporte" },
    { "name": "Pregunta sobre servicios", "slug": "servicios" },
    { "name": "Trabajo / Colaboraciones", "slug": "colaboracion" },
    { "name": "Dudas generales", "slug": "dudas" },
    { "name": "Saludos / Feedback", "slug": "feedback" },
    { "name": "Reporte de errores", "slug": "errores" },
    { "name": "Otro", "slug": "otro" }
]

categories_col = db["contact_categories"]

for category in contact_categories:
    if categories_col.count_documents({"slug": category["slug"]}) == 0:
        categories_col.insert_one(category)
        print(f"Inserted category: {category['name']}")
    else:
        print(f"Category already exists: {category['name']}")


contacts_col = db["contacts_forms"]

client.close()