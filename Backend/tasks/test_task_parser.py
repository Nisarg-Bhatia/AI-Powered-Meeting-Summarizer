from tasks.task_parser import parse_tasks

raw_tasks = [
    {
        "task": "Prepare proposal",
        "assignee": "Alice",
        "deadline": "Friday",
        "priority": "high"
    },
    {
        "task": "",
        "assignee": "Bob"
    },
    {
        "task": "Deploy frontend",
        "priority": "urgent"
    }
]

print(parse_tasks(raw_tasks))
