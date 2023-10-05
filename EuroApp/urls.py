"""EuroApp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.contrib import admin
from django.urls import path
from euro_game import views

urlpatterns = [
    path('', views.entrance),
    path('entrance', views.entrance, name="entrance"),
    path('recap', views.recap, name="recap"),
    path('recap/<grp>', views.recap),
    path('market', views.market, name="market"),
    path('stand_fruits/<id_elv>', views.stand_fruits, name="stand_fruits"),
    path('stand_fleurs/<id_elv>', views.stand_fleurs, name="stand_fleurs"),
    path('stand_legumes/<id_elv>', views.stand_legumes, name="stand_legumes"),
    path('stand_final', views.stand_final, name="stand_final"),
    path('marque_point', views.marque_point, name="marque_point"),
    path('delete_eleve/<elv>', views.delete_eleve, name="delete_eleve"),
    path('connect_eleve/<elv>', views.connect_eleve, name="connect_eleve"),
    path('input_edit/<mdp>', views.input_edit, name="input_edit"),

]
