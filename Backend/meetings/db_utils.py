import uuid
from .models import Meeting, Transcript


def ensure_meeting(meeting_id: str):
    meeting_uuid = uuid.UUID(meeting_id)

    Meeting.objects.get_or_create(
        id=meeting_uuid,
        defaults={"created_at": None}
    )

    return meeting_uuid


def save_transcript(meeting_id: str, text: str):
    meeting_uuid = ensure_meeting(meeting_id)
    print(f"DEBUG: Saving transcript for meeting {meeting_id}")
    return Transcript.objects.create(
        id=uuid.uuid4(),
        meeting_id=meeting_uuid,
        content=text
    )
