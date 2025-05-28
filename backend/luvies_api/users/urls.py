from django.contrib.auth import views as auth_view
from django.contrib import admin
from django.urls import path

#Import view functions
from . import views
from .forms import LoginForm

app_name = 'users'

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', auth_view.LoginView.as_view(template_name='users/login.html', authentication_form=LoginForm), name='login'),
    path('logout/', views.logout_view, name='logout')

]