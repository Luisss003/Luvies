from django.shortcuts import render
from movie.models import Movie
import requests
TMDB_API_KEY = ''


API_URL = f'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key={TMDB_API_KEY}&page=1'
IMG_PATH = "https://image.tmdb.org/t/p/w1280"

# Create your views here.
def index(request):
    #GET request to TMDB endpoint
    print("Sending request to TMDB...")
    response = requests.get(API_URL)
    movies = response.json().get('results',[])[0:30]
    return render(request, 'core/index.html', {
        #Send list of movie KV pairs
        'movies' : movies,
        #send base URL of movies
        'img_path' : IMG_PATH,
    })