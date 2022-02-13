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
                response = redirect('main')
                response.set_cookie('login', login, )
                return response
            else:
                print(" в попытках постигнуть великое люди гибнут на пути...")
    else:
        form = AuthorizationForm()
    return render(request, 'tests/authorization.html', {'form': form})

def main(request):
    print(request.COOKIES.get('login'))
    return render(request, 'tests/main.html')

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
    if request.method == 'POST':
        pass
    else:
        print(request.COOKIES.get('login'))
        pass
    return render(request, 'tests/creation.html')

def profile(request):
    login = request.COOKIES.get('login')
    current_user = User.objects.filter(login = login)[0]
    return render(request, 'tests/profile.html', {'login': login, 'first_name': current_user.first_name, 'last_name' : current_user.last_name})

def change_password(request):
    return render(request, 'tests/change_password.html')
