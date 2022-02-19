from django.db import models

class User(models.Model):
    login = models.CharField(max_length=32)
    password = models.CharField(max_length=32)
    email = models.CharField(max_length=32)
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)

class Test(models.Model):
    creator_user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    is_public = models.BooleanField()
    max_grade = models.IntegerField()
    url = models.CharField(max_length=150)

class Question(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    text = models.CharField(max_length=150)
    type = models.CharField(max_length=150)
    grade = models.IntegerField()

class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    text = models.CharField(max_length=150)
    is_true = models.BooleanField()
