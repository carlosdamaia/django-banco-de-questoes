from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('erro', index),
    path('not-found', index),
    path('biologia', index),
    path('fisica', index),
    path('geografia', index),
    path('historia', index),
    path('matematica', index),
    path('portugues', index),
    path('quimica', index)
]