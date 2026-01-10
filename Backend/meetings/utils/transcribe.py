import whisper
import os

model = whisper.load_model("small")

def transcribe_audio(audio_path: str) -> str:
    if not os.path.exists(audio_path):
        raise FileNotFoundError("Audio file not found")

    result = model.transcribe(
        audio_path,
        task="translate"   # 🔥 THIS IS THE KEY
    )

    return result["text"]
