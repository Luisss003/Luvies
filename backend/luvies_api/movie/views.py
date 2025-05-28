from django.shortcuts import render, get_object_or_404
from .models import Movie
import requests
# Create your views here.

#renders the movie details page; checks to see if the movie has been clicked before. if not, add its basic details to Movie DB. if yes, then just get its details from the DB, and dont query TMDB.

TMDB_API_KEY = ''
IMG_PATH = "https://image.tmdb.org/t/p/w1280"


def detail(request, pk):
    # Try to get the movie from your DB
    movie = Movie.objects.filter(tmdb_id=pk).first()

    # If it doesn't exist, fetch from TMDB and save
    if not movie:
        url = f'https://api.themoviedb.org/3/movie/{pk}?api_key={TMDB_API_KEY}'
        response = requests.get(url)
        print(f"Status code was {response}")
        #If movie was found in TMDB
        if response.status_code == 200:
            #Store the JSON data
            data = response.json()
            #Create a new Movie table entry
            movie = Movie.objects.create(
                tmdb_id=data['id'],
                title=data['title'],
                overview=data.get('overview', ''),
                poster_url=data.get('poster_path', ''),
                release_date=data.get('release_date', None),
                runtime=data.get('runtime', None),
            )
        else:
            return render(request, 'movie/not-found.html')

    # 3. Finally, render the detail page using the movie data
    return render(request, 'movie/detail.html', {
        'movie': movie
    })

