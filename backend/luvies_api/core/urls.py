from django.contrib import admin
from django.urls import path

#Import view functions
from . import views

app_name = 'core'

urlpatterns = [
    path('', views.index, name='index'),
]