from django.urls import path, include
from game.views.index import index


urlpatterns = [
    path("", index, name="index"),
    path("menu/", include("game.urls.menu.index")),
    path("play/", include("game.urls.play.index")),
    path("setting/", include("game.urls.setting.index")),
]
