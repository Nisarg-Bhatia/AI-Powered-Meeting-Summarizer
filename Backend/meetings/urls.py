from django.urls import path
from .views import upload_chunk

urlpatterns = [
    path("upload-chunk/", upload_chunk),
]
