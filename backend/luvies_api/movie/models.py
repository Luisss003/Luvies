from django.db import models

# Create your models here.
class Movie(models.Model):
    #Fields collected by TMDB
    tmdb_id = models.IntegerField(unique=True)
    title = models.CharField(max_length=255)
    poster_url = models.URLField(blank=True, null=True)
    overview = models.TextField(blank=True, null=True)
    release_date = models.DateField(blank=True, null=True)
    runtime = models.IntegerField(blank=True, null=True)  # in minutes

    #Custom fields
    #view_count = models.IntegerField()

    def __str__(self):
        return self.title
