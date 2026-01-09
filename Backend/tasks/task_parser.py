from typing import List, Dict


ALLOWED_PRIORITIES = {"High", "Medium", "Low"}


def normalize_task(task: Dict) -> Dict:
    """
    Normalize and validate a single task dictionary.
    Ensures all required fields exist with safe defaults.
    """

    normalized = {}

    # Task description
    normalized["task"] = str(task.get("task", "")).strip()

    # Assignee
    assignee = task.get("assignee", "Unassigned")
    normalized["assignee"] = str(assignee).strip() or "Unassigned"

    # Deadline
    deadline = task.get("deadline", "Not specified")
    normalized["deadline"] = str(deadline).strip() or "Not specified"

    # Priority
    priority = str(task.get("priority", "Medium")).capitalize()
    if priority not in ALLOWED_PRIORITIES:
        priority = "Medium"
    normalized["priority"] = priority

    return normalized


def parse_tasks(raw_tasks: List[Dict]) -> List[Dict]:
    """
    Parse and normalize a list of raw task dictionaries
    returned by the LLM.
    """

    if not isinstance(raw_tasks, list):
        return []

    parsed_tasks = []

    for task in raw_tasks:
        if not isinstance(task, dict):
            continue

        normalized_task = normalize_task(task)

        # Skip empty tasks
        if not normalized_task["task"]:
            continue

        parsed_tasks.append(normalized_task)

    return parsed_tasks
