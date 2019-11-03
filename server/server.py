"""Flask API"""
from math import ceil

from pymongo import MongoClient
from flask import Flask, jsonify, request
from flask_cors import cross_origin

app = Flask(__name__)
client = MongoClient('mongo', 27017)
db = client.db

@app.route('/', methods=['GET'])
@cross_origin()
def root():
    """Default route of API with summary information."""
    return jsonify(
        {'message': 'There are {} monsters in the database.'.format(db.monsters.count())}
    )

@app.route('/api/monsters', methods=['GET'])
@cross_origin()
def monsters():
    """Route to search monsters"""
    # how many monsters to return per page
    PAGE_SIZE = 25

    # split up lists within queries
    args = {key: value.split(',') for key, value in request.args.items()}

    # valid parameters: name, skill, awakenings, super_awakenings, page
    query_args = {}

    # get page number; default to 0
    if 'page' in args:
        page = int(args['page'][0])
    else:
        page = 0

    # insert types into query
    if 'types' in args:
        # check whether to 'and'/'or' types
        if 'type_logic' in args and args['type_logic'][0] == 'or':
            query_args['types'] = {'$in': [t for t in args['types']]}
        #default to 'and'
        else:
            query_args['types'] = {'$all': [t for t in args['types']]}

    # insert elements into query
    if 'elements' in args:
        # check whether to 'and'/'or' elements
        if 'element_logic' in args and args['element_logic'][0] == 'or':
            query_args['elements'] = {'$in': [e for e in args['elements']]}
        else:
            query_args['elements'] = {'$all': [e for e in args['elements']]}

    # insert awakenings into query
    if 'awakenings' in args:
        a_dict = {}
        for a in args['awakenings']:
            a_dict[a] = a_dict.get(a, 0) + 1
        for key, value in a_dict.items():
            query_args['awakenings.{}'.format(key)] = {'$gte': value}

    # insert super awakenings into query
    if 'super_awakenings' in args:
        query_args['$or'] = [{'super_awakenings': int(s)} for s in args['super_awakenings']]

    if query_args:
        query = {'$and': [{key: value for key, value in query_args.items()}]}
    else:
        query = {}

    results = [monster for monster in db.monsters.find(query, skip=page*PAGE_SIZE, limit=PAGE_SIZE)]

    return jsonify({
        'currentPage': page,
        'totalPages': ceil(db.monsters.count(query)/25),
        'data': results
    })

@app.route('/api/monsters/<int:monster_id>', methods=['GET'])
@cross_origin()
def monster(monster_id):
    """Route for detailed information about a specfic monsters."""
    return jsonify(db.monsters.find_one({'_id': monster_id}))

if __name__ == '__main__':
    # only used locally
    app.run(host='0.0.0.0', port=8080, debug=True)
