# scraper.py

import requests
from bs4 import BeautifulSoup
import json

def scrape_yelp(city):
    url = f'https://www.yelp.com/search?find_desc=Boba+Tea&find_loc={city}'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    boba_shops = []

    for business in soup.find_all('div', class_='container__09f24__21w3G'):
        name = business.find('a', class_='css-166la90')
        if name:
            location = business.find('span', class_='css-1e4fdj9')
            if location:
                boba_shops.append({
                    'name': name.text,
                    'location': location.text
                })

    return boba_shops

def save_to_json(data, filename):
    with open(filename, 'w') as f:
        json.dump(data, f, indent=4)
