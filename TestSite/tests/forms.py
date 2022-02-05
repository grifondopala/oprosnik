from django import forms

class AuthorizationForm(forms.Form):
    login = forms.CharField(max_length=32, label='Логин')
    password = forms.CharField(max_length=32, label='Пароль')

class RegistrationForm(forms.Form):
    login = forms.CharField(max_length=32, label='Логин')
    password = forms.CharField(max_length=32, label='Пароль')
    email = forms.CharField(max_length=32)
    first_name = forms.CharField(max_length=32, label='Имя')
    last_name = forms.CharField(max_length=32, label='Фамилия')

class TestCreationForm(forms.Form):
    name = forms.CharField(max_length=32)
