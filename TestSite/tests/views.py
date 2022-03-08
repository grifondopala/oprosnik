import json
import string
import random

from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.shortcuts import redirect


from .forms import *
from .models import *

def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'

def authorization(request):
    if is_ajax(request) and request.method == 'POST':
        data = json.load(request)
        login = data['login']
        password = data['password']
        find_user = User.objects.filter(login = login, password = password)
        if find_user.count() == 1:
            response = JsonResponse({"stage" : True}, status = 200)
            response.set_cookie('login', login, )
            return response
        else:
            return JsonResponse({"stage" : False}, status = 200)
    else:
        return render(request, 'tests/authorization.html', )

def main(request):
    print(request.COOKIES.get('login'))
    return render(request, 'tests/main.html')

def registration(request):
    if is_ajax(request) and request.method == 'POST':
        data = json.load(request)
        login = data['login']
        password = data['password']
        email = data['email']
        first_name = data['first_name']
        last_name = data['last_name']
        find_user = User.objects.filter(login=login)
        if "check" :
            if find_user.count() != 0:
                print('Пользователь с таким логином уже существует')
            else:
                find_user = User.objects.filter(email=email)
                if find_user.count() != 0:
                    print('Пользователь с такой почтой уже существует')
                else:
                    User(login=login, password=password, email=email, first_name=first_name, last_name=last_name).save()
                    print(login, ' ' , password)
                    return JsonResponse({"check": True}, status = 200)
        return  JsonResponse({"check": False}, status = 200)
    return render(request, 'tests/registration.html')


def creation(request):

    def generateUrlTest():
        array = string.ascii_uppercase + string.ascii_lowercase + string.digits
        url = ""
        for _ in range(16):
            url += array[random.randint(0,len(array)-1)]
        return url

    if is_ajax(request) and request.method == "POST":
        url = generateUrlTest()
        data = json.load(request)
        creator = User.objects.get(login = request.COOKIES.get('login'))
        new_test = Test(creator_user=creator, name=data['name'], is_public=data['is_public'], max_grade=data['maxgrade'], url=url, count_users = 0)
        new_test.save()
        questionsArray = data['questionsArray']
        for question in questionsArray:
            new_question = Question(test=new_test, text=question[0], type=question[1], grade=question[2])
            new_question.save()
            lenght = len(question)
            for i in range(3,lenght,1):
                answer = Answer(question=new_question, text=question[i][0], is_true=question[i][1])
                answer.save()
        return JsonResponse({"url": url}, status = 200)
    return render(request, 'tests/creation.html')

def public_test_list(request):
    if is_ajax(request) and request.method == "POST":
        all_tests = Test.objects.all().order_by('count_users')
        data = json.load(request)
        page = data['page']
        new_data = []
        for i in range(page*10, 10*(page+1)+1):
            if(i < all_tests.count()):
                new_data.append([all_tests[i].name, all_tests[i].creator_user.login, all_tests[i].count_users])
        return JsonResponse({'tests': new_data}, status=200)
    return render(request, 'tests/tests_list.html')

def profile(request):
    login = request.COOKIES.get('login')
    current_user = User.objects.filter(login = login)[0]
    return render(request, 'tests/profile.html', {'login': login, 'first_name': current_user.first_name, 'last_name' : current_user.last_name})

def change_password(request):

    if is_ajax(request) and request.method == "POST":
        data = json.load(request)
        password = data['password']
        login = request.COOKIES.get('login')
        if data['stage']:
            find_user = User.objects.filter(login=login, password=password)
            if (find_user.count() == 1):
                return JsonResponse({"check": True}, status = 200)
            else:
                return JsonResponse({"check": False}, status=200)
        else:
            find_user_1 = User.objects.filter(login = login)
            users_new_password = find_user_1[0]
            users_new_password.password = password
            users_new_password.save()
        return JsonResponse({}, status = 200)
    else:
        return render(request, 'tests/change_password1.html')

def my_tests(request):
    login = request.COOKIES.get('login')
    find_user = User.objects.filter(login = login)
    if ( find_user.count != 1 ) :
        return render (request, 'tests/my_tests.html', {'count': False})
    else:
        return render (request, 'tests/my_tests.html', {'count' : True})

    return render(request, 'tests/my_tests.html')




def performed_tests(request):
    return render(request, 'tests/performed_tests.html')