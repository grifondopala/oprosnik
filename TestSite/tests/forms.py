from django import forms

class AuthorizationForm(forms.Form):
    login = forms.CharField(max_length=32)
    password = forms.CharField(max_length=32)
class RegistrationForm(forms.Form):
    login = forms.CharField(max_length=32)
    password = forms.CharField(max_length=32)
    email = forms.CharField(max_length=32)
    first_name = forms.CharField(max_length=32)
    last_name = forms.CharField(max_length=32)