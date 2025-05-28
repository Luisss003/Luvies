from django.contrib import admin
from django.urls import path

#Import view functions
from . import views

app_name = 'movie'

urlpatterns = [
    path('<int:pk>/', views.detail, name='detail'),
]