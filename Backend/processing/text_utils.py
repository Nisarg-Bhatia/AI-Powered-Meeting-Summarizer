import re

def normalize_whitespace(text: str) -> str:
    """
    Normalize spacing and line breaks without changing meaning.
    """
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def fix_punctuation(text: str) -> str:
    """
    Fix spacing around punctuation.
    """
    text = re.sub(r"\s+([.,!?])", r"\1", text)
    text = re.sub(r"([.,!?])([A-Za-z])", r"\1 \2", text)
    return text