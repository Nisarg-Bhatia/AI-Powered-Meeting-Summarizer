import json
from summarizer.llm import get_llm
from summarizer.prompts import TASK_EXTRACTION_PROMPT
from langchain_core.prompts import PromptTemplate


def extract_tasks_from_transcript(transcript: str) -> list:

    llm = get_llm()

    prompt = PromptTemplate(
        input_variables=["transcript"],
        template=TASK_EXTRACTION_PROMPT
    )

    formatted_prompt = prompt.format(transcript=transcript)

    response = llm.invoke(formatted_prompt)

    raw_output = response.content.strip()

    # 🔐 Safely parse JSON
    try:
        tasks = json.loads(raw_output)
        if isinstance(tasks, list):
            return tasks
        else:
            return []
    except json.JSONDecodeError:
        # LLM failed to return valid JSON
        return []
