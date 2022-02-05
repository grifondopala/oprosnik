from django.contrib import admin
from django.urls import path, include
from .views import *

urlpatterns = [
    path('', authorization),
    path('main', main, name = 'main'),
    path('registration', registration),
    path('create-test', creation)
]