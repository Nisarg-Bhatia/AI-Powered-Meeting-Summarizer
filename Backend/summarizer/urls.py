from django.urls import path
from .views import summarize_transcript

urlpatterns = [
    path("summarize/", summarize_transcript),
]