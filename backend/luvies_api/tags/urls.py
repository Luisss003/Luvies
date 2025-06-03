from django.contrib import admin
from django.urls import path

#Import view functions
from . import views

app_name = 'tags'

urlpatterns = [
    path('<int:pk>/', views.tag_creation, name="tag_creation")
]