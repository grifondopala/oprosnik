from django.contrib import admin
from django.urls import path, include
from .views import *

urlpatterns = [
    path('', authorization),
    path('main', main, name = 'main'),
    path('registration', registration),
    path('create-test', creation),
    path('user-profile', profile),
    path ('change-password', change_password),
    # path('my-tests',my_tests),
    # path('performed-tests',performed_tests),
]