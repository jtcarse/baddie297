"""Flask API"""
from math import ceil

from pymongo import MongoClient
from flask import Flask, jsonify, request
from flask_cors import cross_origin

def expand_awakenings(a_dict):
    """
    Expand awakenings into a query which includes all permutations of awakenings + super awakenings.

    Required Args
        a_dict (dict) - a frequency dictionary of awakenings

    Returns
        (dict) - a query that will match all permutations of awakenings + super awakenings
    """

    query = {'$or': []}
    query.get('$or').append(
        {'$and': [{'awakenings.{}'.format(key): {'$gte': value}} for key, value in a_dict.items()]}
    )
    for a in a_dict:
        sub_query = []
        for key, value in a_dict.items():
            if key == a:
                if value > 1:
                    sub_query.append({'awakenings.{}'.format(key): {'$gte': value - 1}})
            else:
                sub_query.append({'awakenings.{}'.format(key): {'$gte': value}})
        sub_query.append({'super_awakenings': int(a)})
        query.get('$or').append({'$and': sub_query})
    return query

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

    # valid parameters: awakenings, types, elements, type and/or, element and/or, include_super_awakenings, page
    query_args = {}

    # get page number; default to 0
    if 'page' in args:
        page = int(args.get('page')[0])
    else:
        page = 0

    # insert types into query
    if 'types' in args:
        # check whether to 'and'/'or' types
        if 'type_logic' in args and args.get('type_logic')[0] == 'or':
            query_args['types'] = {'$in': [t for t in args.get('types')]}
        #default to 'and'
        else:
            query_args['types'] = {'$all': [t for t in args.get('types')]}

    # insert elements into query
    if 'elements' in args:
        # check whether to 'and'/'or' elements
        if 'element_logic' in args and args.get('element_logic')[0] == 'or':
            query_args['elements'] = {'$in': [e for e in args.get('elements')]}
        else:
            query_args['elements'] = {'$all': [e for e in args.get('elements')]}

    # insert awakenings into query
    if 'awakenings' in args:
        a_dict = {}
        for a in args.get('awakenings'):
            a_dict[a] = a_dict.get(a, 0) + 1

        if 'include_super_awakenings' in args and args.get('include_super_awakenings')[0] == 'false':
            for key, value in a_dict.items():
                query_args['awakenings.{}'.format(key)] = {'$gte': value}
        else:
            query_args['$or'] = expand_awakenings(a_dict).get('$or')

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
