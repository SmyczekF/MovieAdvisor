from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome('./chromedriver.exe')
page = driver.get('https://www.cinema-city.pl/kina/bielsko-biala/1088#/buy-tickets-by-cinema?in-cinema=1088&at=2022-12-13&view-mode=list')

WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CLASS_NAME, 'qb-movie-link')))
elements = driver.find_elements(By.CLASS_NAME, 'qb-movie-name')

# class Movie:
#     def __init__(self, title = None, language = None, subtitles = None, genre = None, cast = None, director = None, 
#                 date = None, length = None, viewer_age = None, prod_country = None, prod_year = None, description = None, 
#                 city = None) -> None:
#         self.title = title
#         self.language = language
#         self.subtitles = subtitles
#         self.genre = genre
#         self.cast = cast
#         self.director = director
#         self.date = date
#         self.length = length
#         self.viewer_age = viewer_age
#         self.prod_country = prod_country
#         self.prod_year = prod_year
#         self.description = description
#         self.city = city

def findMovie(idx):
    
    # Finding title
    title = elements[idx].get_attribute('innerHTML')
    print(f"Tytuł {title}")

    # Finding play dates(with hours):



findMovie(0)