from django.http import HttpResponse


def index(request):
    line1 = '<h1 style="text-align: center">术士之战</h1>'
    line2 = '<img src="https://cdn.acwing.com/media/file_system/file/application/icon/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20211110225612_kauGG7F.jpg" width=2000>'
    line3 = '<hr>'
    line4 = '<a href="/play/">进入游戏界面</a>'
    return HttpResponse(line1 + line4 + line3 + line2)


def play(request):
    line1 = '<h1 style="text-align: center">游戏界面</h1>'
    line3 = '<a href="/">返回主页面</a>'
    line2 = '<img src="https://tse3-mm.cn.bing.net/th/id/OIP-C._7uJrk2_45Go2NbOrwRUkwHaEK?pid=ImgDet&rs=1" width=2000>'
    line4 = '<hr>'
    return HttpResponse(line1 + line3 + line4 + line2)
