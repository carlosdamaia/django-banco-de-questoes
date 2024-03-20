from django.shortcuts import redirect
from django.urls import reverse

class RedirectMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if request.path == '/':
            if request.user.is_authenticated:
                return redirect(reverse('home'))
            else:
                return redirect(reverse('admin:login'))
        elif request.path.startswith('/home/') and not request.user.is_authenticated:
            return redirect(reverse('admin:login') + '?next=' + request.path)
        return response
