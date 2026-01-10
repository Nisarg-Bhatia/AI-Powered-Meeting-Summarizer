from django.shortcuts import render

# Create your views here.
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .summary_chain import generate_meeting_summary

@csrf_exempt
def summarize_transcript(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body)
            transcript = body.get("transcript")

            if not transcript:
                return JsonResponse({"error": "Transcript missing"}, status=400)

            summary = generate_meeting_summary(transcript)

            return JsonResponse({
                "success": True,
                "summary": summary
            })

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Only POST allowed"}, status=405)