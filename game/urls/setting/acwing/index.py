from django.urls import path
from game.views.setting.acwing.web.apply_code import apply_code
from game.views.setting.acwing.web.receive_code import receive_code

urlpatterns = [
    path("web/apply_code/", apply_code, name="setting_acwing_web_apply_code"),
    path("web/receive_code/", receive_code, name="setting_acwing_web_receive_code"),
]
