import uuid
from django.db import models

class Meeting(models.Model):
    id = models.UUIDField(primary_key=True)
    created_at = models.DateTimeField()

    class Meta:
        db_table = "meetings"
        managed = False


class Transcript(models.Model):
    id = models.UUIDField(primary_key=True)
    meeting_id = models.UUIDField()
    content = models.TextField()

    class Meta:
        db_table = "transcripts"
        managed = False
class Summary(models.Model):
    id = models.UUIDField(primary_key=True)
    meeting_id = models.UUIDField()
    summary_text = models.TextField()

    class Meta:
        db_table = "summaries"
        managed = False


class Task(models.Model):
    id = models.UUIDField(primary_key=True)
    meeting_id = models.UUIDField()
    description = models.TextField()
    owner = models.TextField(null=True, blank=True)
    deadline = models.DateField(null=True, blank=True)
    priority = models.TextField(null=True, blank=True)
    status = models.TextField(default="pending")

    class Meta:
        db_table = "tasks"
        managed = False
