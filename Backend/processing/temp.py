# This code is just made to check whether the transcript cleaner is working as expected.

from pathlib import Path
from processing.transcript_cleaner import clean_transcript

BASE_DIR = Path(__file__).resolve().parent
TRANSCRIPT_PATH = BASE_DIR / "transcript.txt"

with open(TRANSCRIPT_PATH, "r", encoding="utf-8") as f:
    raw_text = f.read()

cleaned = clean_transcript(raw_text)
print(cleaned)
