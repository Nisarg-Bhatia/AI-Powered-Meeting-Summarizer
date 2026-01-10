from django.urls import path
from .views import upload_meeting

urlpatterns = [
    path("upload-meeting/", upload_meeting),
]
