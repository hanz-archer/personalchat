from django.shortcuts import render

def mainpage(request):
    return render(request, 'base/mainpage.html')

def room(request):
    return render(request, 'base/room.html')
