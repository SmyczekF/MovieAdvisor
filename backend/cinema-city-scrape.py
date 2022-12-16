from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
import json
import sys
  
sys.stdout.reconfigure(encoding='utf-8')
months_translate = {'STYCZNIA': 'JANUARY', 'LUTEGO': 'FEBRUARY', 'MARCA': 'MARCH', 'KWIETNIA': 'APRIL',
                    'MAJA': 'MAY', 'CZERWCA': 'JUNE', 'LIPCA': 'JULY', 'SIERPNIA': 'AUGUST',
                    'WRZEŚNIA': 'SEPTEMBER', 'PAŹDZIERNIKA': 'OCTOBER', 'LISTOPADA': 'NOVEMBER',
                    'GRUDNIA': 'DECEMBER'}

day = sys.argv[1]

options = Options()
options.add_argument('--headless')
options.add_argument('--disable-gpu')
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

driver.get(f'https://www.cinema-city.pl/kina/bielsko-biala/1088#/buy-tickets-by-cinema?in-cinema=1088&at=2022-12-{day}&view-mode=list')

links = WebDriverWait(driver, 10).until(EC.visibility_of_all_elements_located((By.CLASS_NAME, 'qb-movie-link')))

elements = driver.find_elements(By.CLASS_NAME, 'qb-movie-name')
hours_all = driver.find_elements(By.CSS_SELECTOR, '.events.col-xs-12')

def mapToInnerHtml(x):
    return x.get_attribute('innerHTML').strip()

def findMovie(idx) -> list:
    # Finding play dates(with hours):
    movies = []
    hours_div = hours_all[idx]
    hours_divs = hours_div.find_elements(By.CLASS_NAME, 'qb-movie-info-column')
    day = driver.find_element(By.CSS_SELECTOR,'.col-xs-12.mb-sm > h5').get_attribute('innerHTML').strip().split(' ')[1]
    for div in hours_divs:
        hours = div.find_elements(By.CSS_SELECTOR, 'a')
        for hour in hours:
            date = f"{day} {hour.get_attribute('innerHTML').strip()}"

            # Finding title
            title = elements[idx].get_attribute('innerHTML')

            # Finding city
            city = driver.find_element(By.CLASS_NAME, "selectedCinema").get_attribute('innerHTML')

            # Finding original language, subtitles, dubbing, type
            additional_info = div.find_elements(By.CSS_SELECTOR, 'li > span')
            additional_info = list(map(mapToInnerHtml, additional_info))
            movie_type = additional_info[0]
            subtitles_check = False
            dubbing_check = False
            for i in range(len(additional_info)):
                if(additional_info[i] == 'NAP'):
                    subtitles_check = True
                elif(additional_info[i] == 'DUB'):
                    dubbing_check = True
            subtitles = subtitles_check
            dubbing = dubbing_check
            movies.append({
                "date":date,
                "title": title,
                "movie_type": movie_type,
                "subtitles": subtitles,
                "dubbing": dubbing,
                "city": city.strip()
            })
    # Utworzenie n obiektów zawierających poprzednie informacje
    rest = goToDetails(links[idx].get_attribute('href'))
    # Dodanie do n obiektów tych samych pól, wygenerowanych przez goToDetails
    for movie in movies:
            movie.update(rest)

    return movies

def goToDetails(link) -> dict:
    result = {}
    # Open a new page (new driver)
    innerDriver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    innerDriver.get(link)
    info = WebDriverWait(innerDriver, 10).until(EC.visibility_of_all_elements_located((By.CLASS_NAME, 'info-descr')))
    info = list(map(mapToInnerHtml, info))
    result["premiere"] = info[0].upper()

    month = result["premiere"].split(' ')[1]

    result["premiere"] = result["premiere"].replace(month, months_translate[month])

    result["length"] = info[1].split(' ')[0].strip()

    description = WebDriverWait(innerDriver, 10).until(EC.visibility_of_element_located((By.CLASS_NAME, 'text-content'))).get_attribute('innerHTML').strip()
    result["description"] = description

    addInfo = WebDriverWait(innerDriver, 10).until(EC.visibility_of_all_elements_located((By.CSS_SELECTOR, '.movie-info > dd')))
    addInfo = list(map(mapToInnerHtml, addInfo))
    result["original_title"] = addInfo[0]
    result["genres"] = addInfo[1]
    result["cast"] = addInfo[2]
    result["director"] = addInfo[3]
    result["prod_country"] = addInfo[4].split(' ')[0].strip()
    result["prod_year"] = addInfo[4].split(' ')[1].strip()
    result["original_lang"] = addInfo[5]
    result["age"] = addInfo[6]

    return result

# for i in range(len(elements)):
#     print(json.dumps(findMovie(i)))

for i in range(1):
    print(json.dumps(findMovie(i)))

# print(json.dumps(findMovie(6)))