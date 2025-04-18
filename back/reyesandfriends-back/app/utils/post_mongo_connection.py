from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise ValueError("MONGO_URI is not defined on .env file")


def insert_to_mongo(collection_name, data):
    """
    Inserts data into a specified MongoDB collection.

    :param collection_name: Name of the MongoDB collection.
    :param data: Data to insert into the collection.
    :return: The inserted document's ID.
    """
    client = MongoClient(MONGO_URI)
    try:
        db = client.get_default_database()
        collection = db[collection_name]
        result = collection.insert_one(data)
        return str(result.inserted_id)
    finally:
        client.close()
