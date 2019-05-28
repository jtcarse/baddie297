from flask import Flask, jsonify, request
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

@app.route('/api/monsters', methods=['GET'])
@cross_origin()
def monsters():
	# split up lists within queries
	args = { key: value.split(',') for key, value in request.args.items() }

	# valid parameters: _id, name, skill, awakenings, super_awakenings
	query = {}

	# insert singleton data into query
	if '_id' in args.keys():
		query['_id'] = args['_id'][0]
	if 'name' in args.keys():
		query['name'] = args['name'][0]
	if 'skill' in args.keys():
		query['skill'] = args['skill'][0]

	# insert awakenings into query
	if 'awakenings' in args.keys():
		a_dict = {}
		for a in args['awakenings']:
			a_dict[a] = a_dict.get(a, 0) + 1
		for key, value in a_dict.items():
			query['awakenings.{}'.format(key)] = { '$gte': value }
	
	# insert super awakenings into query
	if 'super_awakenings' in args.keys():
		sa_dict = {}
		for sa in args['awakenings']:
			sa_dict[sa] = sa_dict.get(sa, 0) + 1
		for key, value in sa_dict.items():
			query['super_awakenings.{}'.format(key)] = { '$gte': value }
	
	aggregated_query = { '$and': [ { key: value for key, value in query.items() } ] }
	projection = { 'materials': 0, 'evolves_from': 0 }
	result = db.monsters.find(aggregated_query, limit=20)
	monsters = [ monster for monster in result ]

	return jsonify(monsters)

@app.route('/api/monsters/<int:monster_id>', methods=['GET'])
@cross_origin()
def monster(monster_id):
	return jsonify(db.monsters.find_one({ '_id': monster_id }))

if __name__ == '__main__':
	# only used locally
	app.run(host='0.0.0.0', port=8080, debug=True)
