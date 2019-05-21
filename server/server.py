from flask import Flask, jsonify
from flask_cors import cross_origin
from pymongo import MongoClient
from datetime import datetime

app = Flask(__name__)
client = MongoClient('mongo', 27017)
db = client.db

@app.route('/', methods=['GET'])
@cross_origin()
def root():

	return jsonify(
		{ 'message': 'There are {} monsters in the database.'.format(db.monsters.count()) }
	)

if __name__ == '__main__':
	# only used locally
	app.run(host='0.0.0.0', port=8080, debug=True)
