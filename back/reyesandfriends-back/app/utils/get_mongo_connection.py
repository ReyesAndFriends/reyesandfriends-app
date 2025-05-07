from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise ValueError("MONGO_URI is not defined on .env file")

client = MongoClient(MONGO_URI)
db_name = "reyesandfriends"
db = client[db_name]

def get_data_from_collection(collection_name, query={}, projection=None):
    """
    Fetch data from a MongoDB collection.

    :param collection_name: Name of the collection to query.
    :param query: MongoDB query filter (default is an empty dict).
    :param projection: Fields to include or exclude (default is None).
    :return: List of documents from the collection.
    """
    collection = db[collection_name]
    return list(collection.find(query, projection))
