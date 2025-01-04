from django.urls import path
from .views import Model_Api

urlpatterns = [
    path('recommend/<movie_name>',Model_Api.as_view(),name='model_api')
]