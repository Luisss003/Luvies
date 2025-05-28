from django.db import models
from django.contrib.auth.models import User
from movie.models import Movie

# Create your models here.
class Tag(models.Model):
    movie = models.ForeignKey(Movie, related_name='tags', on_delete=models.CASCADE)
    tag_text = models.CharField(max_length=50)
    created_by = models.ForeignKey(User, related_name='tags', on_delete=models.CASCADE)

    def __str__(self):
        return self.name