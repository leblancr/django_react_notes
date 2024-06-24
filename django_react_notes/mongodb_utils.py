from pymongo import MongoClient
import sys
for path in sys.path:
    print(path)

client = MongoClient(host='localhost',
                     port=27017,
                     username='rich',
                     password='reddmon',
                     authSource='admin')
db = client['test_database']
collection = db['notes']
