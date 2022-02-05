from django.db.models import Count
from django.http import HttpResponse
from django.shortcuts import render
from django.shortcuts import redirect

from .forms import *
from .models import *

def authorization(request):
    if request.method == 'POST':
        form = AuthorizationForm(request.POST)
        if form.is_valid():
            login = form.cleaned_data['login']
            password = form.cleaned_data['password']
            find_user = User.objects.filter(login=login, password=password)
            if (find_user.count() == 1):
                print("успешно")
                return redirect('main')
            else:
                print("ты ебаклак?")
    else:
        form = AuthorizationForm()
    return render(request, 'tests/authorization.html', {'form': form})

def main(request):
    return render(request, 'tests/main.html' )

def registration(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            login = form.cleaned_data['login']
            password = form.cleaned_data['password']
            email = form.cleaned_data['email']
            fn = form.cleaned_data['first_name']
            ln = form.cleaned_data['last_name']
            find_user = User.objects.filter(login=login)
            if find_user.count() !=0:
                print('Пользователь с таким логином уже существует')
            else:
                find_user = User.objects.filter(email = email)
                if find_user.count() !=0:
                    print('Пользователь с такой почтой уже существует')
                else:
                    User(login = login, password = password, email = email, first_name = fn, last_name = ln).save()

    else:
        form = RegistrationForm()
    return render(request, 'tests/registration.html', {'form': form})
def creation(request):
    return render(request, 'creation.html', {'form': form})