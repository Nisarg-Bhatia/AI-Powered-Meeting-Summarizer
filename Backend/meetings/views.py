from django.shortcuts import render

# Create your views here.
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

@csrf_exempt
def upload_chunk(request):
    if request.method != "POST":
        return JsonResponse({"error": "Invalid method"}, status=405)

    meeting_id = request.POST.get("meeting_id")
    chunk_index = request.POST.get("chunk_index")
    audio_file = request.FILES.get("audio")

    if not meeting_id or audio_file is None:
        return JsonResponse({"error": "Missing data"}, status=400)

    meeting_dir = os.path.join(
        settings.STORAGE_ROOT,
        "meetings",
        meeting_id
    )

    os.makedirs(meeting_dir, exist_ok=True)

    chunk_path = os.path.join(
        meeting_dir,
        f"chunk_{chunk_index}.webm"
    )

    with open(chunk_path, "wb+") as f:
        for chunk in audio_file.chunks():
            f.write(chunk)

    print(f"[STORAGE] {meeting_id} | chunk {chunk_index} saved")

    return JsonResponse({
        "status": "ok",
        "meeting_id": meeting_id,
        "chunk_index": chunk_index
    })
