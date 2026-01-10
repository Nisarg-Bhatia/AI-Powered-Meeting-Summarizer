import os
import django
from django.conf import settings

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from meetings.models import Meeting

def check_db():
    print(f"Checking Database: {settings.DATABASES['default']['ENGINE']}")
    print(f"Database Name: {settings.DATABASES['default']['NAME']}")
    
    count = Meeting.objects.count()
    print(f"Total Meetings in DB: {count}")
    
    meetings = Meeting.objects.all().order_by('-created_at')[:5]
    for m in meetings:
        print(f"ID: {m.meeting_id}, Transcript Len: {len(m.transcript)}")

if __name__ == "__main__":
    check_db()
