
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('tests.urls'))
]

handler404 = "tests.views.page_not_found_view"