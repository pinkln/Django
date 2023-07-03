from django.urls import path
from game.views.setting.getinfo import getinfo

urlpatterns = [
    path("getinfo/", getinfo, name="setting_getinfo"),
]
