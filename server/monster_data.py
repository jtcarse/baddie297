import pymongo
import requests
from bs4 import BeautifulSoup

def get_collection():
	return pymongo.MongoClient('db', 27017).db.monsters

def get_monster_data(monster_id):
	url = 'http://puzzledragonx.com/en/monster.asp?n={}'.format(monster_id)
	r = requests.get(url)

	# make sure GET succeeded
	if r.status_code is not 200:
		print('Error {}: {}'.format(r.status_code, r.content))
		return None

	# create dictionary in which to store monster data
	monster_data = {}

	# store id
	monster_data['_id'] = monster_id

	# parse html
	soup = BeautifulSoup(r.content, 'html.parser')

	# store name
	monster_data['name'] = soup.find('div', { 'class': 'name' }).find('h1').text

	# get topmost table
	data = (
		soup.find('table', { 'class': 'tableprofile', 'id': 'tableprofile' })
		.find_all('td', { 'class': 'data' })
	)

	# store types
	monster_data['types'] = [ a.text for a in data[0].find_all('a') ]

	# store elements
	monster_data['elements'] = [ a.text for a in data[1].find_all('a') ]

	# store skill id
	skill_soup = soup.find('td', { 'class': 'value-end' }).find('a')
	if skill_soup:
		monster_data['skill'] = int(skill_soup['href'][12:])

	# get list of awoken skills
	awakening_soup = soup.find_all('td', { 'class': 'awoken1' })
	
	# no awakening data
	if len(awakening_soup) == 0:
		monster_data['awakenings'] = monster_data['super_awakenings'] = []

	# only awakenings
	elif len(awakening_soup) == 1:
		awakening_list = [
			int(a['href'][18:]) for a in awakening_soup[0].find_all('a') if a['href'][0] != 's'
		]
		awakening_dict = {}
		for a in awakening_list:
			awakening_dict[str(a)] = awakening_dict.get(str(a), 0) + 1
		monster_data['awakenings'] = awakening_dict
		monster_data['super_awakenings'] = []
	
	# awakenings and super awakenings OR awakenings and jp awakenings
	elif len(awakening_soup) == 2:
		awakening_list = [
			int(a['href'][18:]) for a in awakening_soup[0].find_all('a') if a['href'][0] != 's'
		]
		awakening_dict = {}
		for a in awakening_list:
			awakening_dict[str(a)] = awakening_dict.get(str(a), 0) + 1
		monster_data['awakenings'] = awakening_dict
		monster_data['super_awakenings'] = [
			int(a['href'][24:]) for a in awakening_soup[1].find_all('a') if a['href'][0] == 's'
		]

	# awakenings and jp awakenings and super awakenings OR
	# awakenings and super awakenings and jp super awakenings
	elif len(awakening_soup) == 3:
		awakening_list = [
			int(a['href'][18:]) for a in awakening_soup[0].find_all('a') if a['href'][0] != 's'
		]
		awakening_dict = {}
		for a in awakening_list:
			awakening_dict[str(a)] = awakening_dict.get(str(a), 0) + 1
		monster_data['awakenings'] = awakening_dict
		super_awakening_list = [
			int(a['href'][24:]) for a in awakening_soup[1].find_all('a') if a['href'][0] == 's'
		]
		if not super_awakening_list:
			super_awakening_list = [
				int(a['href'][24:]) for a in awakening_soup[2].find_all('a') if a['href'][0] == 's'
			]
		monster_data['super_awakenings'] = super_awakening_list
	
	# awakenings and jp awakenings and super awakenings and jp super awakenings
	else:
		awakening_list = [
			int(a['href'][18:]) for a in awakening_soup[0].find_all('a') if a['href'][0] != 's'
		]
		awakening_dict = {}
		for a in awakening_list:
			awakening_dict[str(a)] = awakening_dict.get(str(a), 0) + 1
		monster_data['awakenings'] = awakening_dict
		monster_data['super_awakenings'] = [
			int(a['href'][24:]) for a in awakening_soup[2].find_all('a') if a['href'][0] == 's'
		]
	
	# check whether monster can be gotten by evolution
	evolves_list = soup.find_all('td', { 'class': 'title', 'style': 'white-space: nowrap;' })

	if evolves_list:
		evolves_from = evolves_list[-1].find('a')
	else:
		evolves_from = None

	if evolves_from:
		# if so, store id of precursor and required materials
		monster_data['evolves_from'] = int(evolves_from['href'][14:])

		requires = soup.find_all('td', { 'class': 'require' })
		finalevolves = soup.find_all('td', { 'class': 'finalevolve' })
		finalawokenevolves= soup.find_all('td', { 'class': 'finalawokenevolve' })
		
		a_lists = [ td.find_all('a') for td in requires + finalevolves + finalawokenevolves ]
		materials = [ [ a['href'][14:] for a in a_list ] for a_list in a_lists ]

		evolveframes = soup.find_all('div', { 'class': 'evolveframe' })
		evo_ids = [ int(evolveframe.find('div').text) for evolveframe in evolveframes ]

		for i, evo_id in enumerate(evo_ids):
			if evo_id == monster_id:
				monster_data['materials'] = [ int(material) for material in materials[i - 1] ]
				break
	else:
		# otherwise, store empty lists
		monster_data['evolves_from'] = monster_data['materials'] = []
	
	return monster_data

def crawl(collection, start_id, stop_id):
	failed = []
	for i in range(start_id, stop_id + 1):
		print('Monster #{}'.format(i))

		print('\tGetting...')
		try:
			data = get_monster_data(i)
		except Exception as e:
			print('\tFailed to get data: {}'.format(e))
			failed.append(i)
			continue

		print('\tInserting...')
		try:
			collection.insert_one(data)
		except Exception as e:
			print('\tFailed to insert data: {}'.format(e))
			failed.append(i)
			continue
		print('\tSuccess!')
	return failed

def crawl_list(collection, ids):
	failed = []
	for n in ids:
		print('Monster #{}'.format(n))
		print('\tGetting...')
		try:
			data = get_monster_data(n)
		except Exception as e:
			print('\tFailed to get data: {}'.format(e))
			failed.append(n)
			continue

		print('\tInserting...')
		try:
			collection.insert_one(data)
		except Exception as e:
			print('\tFailed to insert data: {}'.format(e))
			failed.append(n)
			continue
		print('\tSuccess!')
	return failed

def get_monster_icons(start_id, stop_id):
    url = 'http://www.puzzledragonx.com/en/img/book/{}.png'
    for i in range(start_id, stop_id + 1):
        print('Monster #{}'.format(i))
        print('\tGetting...')
        r = requests.get(url.format(i))
        if r.status_code == 200:
            with open('../client/src/icons/monsters/{}.png'.format(i), 'wb') as f:
                f.write(r.content)
            print('\tSuccess!')
        else:
            print('\tFailure!')

