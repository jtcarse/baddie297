import requests
from bs4 import BeautifulSoup

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
	monster_data['id'] = monster_id

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
	monster_data['skill'] = int(soup.find('td', { 'class': 'value-end' }).find('a')['href'][12:])

	# get list of awoken skills
	awakening_soup = soup.find_all('td', { 'class': 'awoken1' })
	
	if len(awakening_soup) > 0:
		# if monster has awoken skills, store parsed ids
		monster_data['awakenings'] = [
			int(a['href'][18:]) for a in awakening_soup[0].find_all('a')
		]
	else:
		# otherwise, store an empty list
		monster_data['awakenings'] = []
	
	if len(awakening_soup) > 1:
		# if monster has super awoken skills, store parsed ids
		monster_data['super_awakenings'] = [
			int(a['href'][18:]) for a in awakening_soup[1].find_all('a')
		]
	else:
		# otherwise, store an empty list
		monster_data['super_awakenings'] = []
	
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

