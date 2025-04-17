import os
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
    "contacts_forms",
]

for collection_name in collections:
    if collection_name not in db.list_collection_names():
        db.create_collection(collection_name)
        print(f"Collection '{collection_name}' created.")
    else:
        print(f"Collection '{collection_name}' already exists.")

client.close()