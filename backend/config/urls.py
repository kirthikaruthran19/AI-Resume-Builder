from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path


def home(request):
    return JsonResponse({
        "status": "success",
        "message": "AI Resume Builder Backend is Running 🚀",
        "version": "1.0.0",
    })


urlpatterns = [
    path("", home),

    path("admin/", admin.site.urls),

    path("api/users/", include("users.urls")),

    path("api/", include("resumes.urls")),

    path("api/ai/", include("ai.urls")),
]