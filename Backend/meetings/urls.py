from django.urls import path
from .views import transcribe_meeting, upload_meeting

urlpatterns = [
    path("upload-meeting/", upload_meeting),
    path("transcribe-meeting/", transcribe_meeting),
]
