from django.urls import path
from . import views


urlpatterns = [
    path('', views.get_task),
    path('create/', views.create_user),
    path('submit/', views.create_task),
    path('delete/', views.delete_task)
]
