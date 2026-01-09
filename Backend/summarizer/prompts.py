# ============================
# MEETING SUMMARY PROMPT
# ============================

SUMMARY_PROMPT = """
You are an AI-powered meeting assistant.

Analyze the following meeting transcript and generate a clear,
professional, and structured summary.

Your output MUST contain the following sections:

1. Overall Summary
   - 3 to 5 concise bullet points describing the meeting.

2. Key Decisions
   - List all decisions that were finalized during the meeting.
   - If no decisions were made, write "No final decisions were made."

3. Important Discussion Points
   - Bullet points of major topics discussed.

4. Open Questions / Follow-ups
   - Any unresolved questions or topics requiring future discussion.
   - If none, write "No open questions."

Rules:
- Do NOT invent or assume information.
- Use only the content provided.
- Keep language professional and neutral.
- Use bullet points wherever possible.

Meeting Transcript:
-------------------
{transcript}
-------------------
"""

# ============================
# TASK EXTRACTION PROMPT
# ============================
TASK_EXTRACTION_PROMPT = """
You are an AI assistant specialized in extracting action items
and tasks from meeting transcripts.

From the transcript below, identify ALL actionable tasks.

For each task, extract the following fields:
- task: A short description of the action item
- assignee: Name of the responsible person (or "Unassigned")
- deadline: Mentioned due date or time (or "Not specified")
- priority: High / Medium / Low based on urgency and tone

IMPORTANT:
- Return ONLY valid JSON.
- Do NOT include explanations or extra text.
- Output must be a JSON array.
- If no tasks exist, return an empty array [].

Expected JSON format:
[
  {{
    "task": "Prepare project proposal",
    "assignee": "Alice",
    "deadline": "Friday",
    "priority": "High"
  }}
]

Meeting Transcript:
-------------------
{transcript}
-------------------
"""


# ============================
# CALENDAR EVENT PROMPT
# ============================

CALENDAR_PROMPT = """
You are an AI assistant that converts tasks into calendar events.

Given the task details below, determine whether the task
should be added to a calendar.

If YES, extract:
- title
- date (ISO format if possible)
- time (or "All Day")
- description

If NO, respond with:
"No calendar event required."

Task:
-----
{task}
-----
"""
