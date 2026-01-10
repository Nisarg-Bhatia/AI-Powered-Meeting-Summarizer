import os
import uuid

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

from .db_utils import save_transcript
from .utils.transcribe import transcribe_audio


# -------------------------------------------------
# 1️⃣ Upload meeting audio
# -------------------------------------------------
@csrf_exempt
def upload_meeting(request):
    """
    Receives full meeting audio and stores it locally.
    This endpoint ONLY stores audio, nothing DB-related.
    """
    if request.method != "POST":
        return JsonResponse({"error": "Invalid request method"}, status=405)

    meeting_id = request.POST.get("meeting_id")
    audio_file = request.FILES.get("audio")

    if not meeting_id or not audio_file:
        return JsonResponse(
            {"error": "meeting_id or audio missing"},
            status=400
        )

    # Validate UUID early
    try:
        uuid.UUID(meeting_id)
    except ValueError:
        return JsonResponse(
            {"error": "meeting_id must be a valid UUID"},
            status=400
        )

    meeting_dir = os.path.join(
        settings.STORAGE_ROOT,
        "meetings",
        meeting_id
    )
    os.makedirs(meeting_dir, exist_ok=True)

    audio_path = os.path.join(meeting_dir, "meeting.webm")

    with open(audio_path, "wb+") as destination:
        for chunk in audio_file.chunks():
            destination.write(chunk)

    return JsonResponse({
        "status": "uploaded",
        "meeting_id": meeting_id
    })


# -------------------------------------------------
# 2️⃣ Transcribe meeting + store in Neon DB
# -------------------------------------------------
@csrf_exempt
def transcribe_meeting(request):
    """
    Transcribes stored meeting audio and saves transcript to Neon DB.
    Order is CRITICAL:
      1. Audio must exist
      2. Transcription must succeed
      3. Meeting row ensured
      4. Transcript inserted
    """
    if request.method != "POST":
        return JsonResponse({"error": "Invalid request method"}, status=405)

    meeting_id = request.POST.get("meeting_id")

    if not meeting_id:
        return JsonResponse({"error": "meeting_id missing"}, status=400)

    # Validate UUID
    try:
        uuid.UUID(meeting_id)
    except ValueError:
        return JsonResponse(
            {"error": "meeting_id must be a valid UUID"},
            status=400
        )

    audio_path = os.path.join(
        settings.STORAGE_ROOT,
        "meetings",
        meeting_id,
        "meeting.webm"
    )

    if not os.path.exists(audio_path):
        print(f"ERROR: Audio file not found at {audio_path}")
        return JsonResponse(
            {"error": "Audio file not found"},
            status=404
        )

    print(f"DEBUG: Starting transcription for {meeting_id}")
    # --- Transcription ---
    try:
        text = transcribe_audio(audio_path)
        print(f"DEBUG: Transcription complete. Length: {len(text)}")
    except Exception as e:
        print(f"ERROR: Transcription exception: {e}")
        return JsonResponse(
            {"error": f"Transcription failed: {str(e)}"},
            status=500
        )

    if not text or not text.strip():
        print("ERROR: Empty transcription result")
        return JsonResponse(
            {"error": "Empty transcription"},
            status=500
        )

    print(f"DEBUG: Calling save_transcript for {meeting_id}")
    # --- Save to Neon DB ---
    try:
        save_transcript(meeting_id, text)
        print(f"DEBUG: Transcript saved for meeting {meeting_id}")
    except Exception as e:
        return JsonResponse(
            {"error": f"DB insert failed: {str(e)}"},
            status=500
        )

    return JsonResponse({
        "status": "transcribed",
        "meeting_id": meeting_id,
        "transcript_preview": text[:200]
    })
