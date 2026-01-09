from summarizer.llm import get_llm
from summarizer.prompts import SUMMARY_PROMPT
from langchain_core.prompts import PromptTemplate


def generate_meeting_summary(transcript: str) -> str:
    """
    Generates a structured meeting summary from a transcript.
    """

    llm = get_llm()

    prompt = PromptTemplate(
        input_variables=["transcript"],
        template=SUMMARY_PROMPT
    )

    formatted_prompt = prompt.format(transcript=transcript)

    response = llm.invoke(formatted_prompt)

    return response.content
