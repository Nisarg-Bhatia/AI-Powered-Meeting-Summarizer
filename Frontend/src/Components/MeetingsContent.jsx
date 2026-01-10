import React, { useState } from 'react'

function MeetingsContent() {
    const [filterStatus, setFilterStatus] = useState('all')

    const allMeetings = [
        {
            id: 1,
            title: "Product Strategy Review",
            date: "2026-01-09",
            time: "14:30",
            duration: "45 min",
            participants: ["John Doe", "Sarah Smith", "Mike Johnson", "Emily Davis", "Tom Wilson"],
            status: "completed",
            summary: "Discussed Q1 roadmap priorities and resource allocation for the upcoming quarter. Key decision made to focus development efforts on mobile app improvements and user onboarding flow.",
            actionItems: [
                { id: 1, task: "Prepare mobile app wireframes", assignee: "Sarah Smith", deadline: "2026-01-15", completed: false },
                { id: 2, task: "Schedule UX research sessions", assignee: "Emily Davis", deadline: "2026-01-12", completed: false },
                { id: 3, task: "Review API performance metrics", assignee: "Mike Johnson", deadline: "2026-01-11", completed: true }
            ],
            tags: ["Strategy", "Product", "Planning"]
        },
        {
            id: 2,
            title: "Marketing Sync",
            date: "2026-01-08",
            time: "10:00",
            duration: "30 min",
            participants: ["Lisa Brown", "Mark Taylor", "Anna White"],
            status: "completed",
            summary: "Reviewed campaign performance metrics from Q4. Social media engagement up 25% from last quarter, primarily driven by LinkedIn content strategy.",
            actionItems: [
                { id: 4, task: "Create February content calendar", assignee: "Lisa Brown", deadline: "2026-01-14", completed: false },
                { id: 5, task: "Draft customer success case studies", assignee: "Mark Taylor", deadline: "2026-01-20", completed: false }
            ],
            tags: ["Marketing", "Analytics"]
        },
        {
            id: 3,
            title: "Engineering Standup",
            date: "2026-01-08",
            time: "09:15",
            duration: "15 min",
            participants: ["Dev Team"],
            status: "completed",
            summary: "Daily standup covering sprint progress. Backend API integration on track for Friday deployment.",
            actionItems: [
                { id: 6, task: "Fix staging bugs", assignee: "Dev Team", deadline: "2026-01-09", completed: true },
                { id: 7, task: "Deploy API to production", assignee: "Backend Team", deadline: "2026-01-10", completed: false }
            ],
            tags: ["Engineering", "Daily"]
        },
        {
            id: 4,
            title: "Design Review",
            date: "2026-01-09",
            time: "14:00",
            duration: "60 min",
            participants: ["Design Team"],
            status: "upcoming",
            summary: "",
            actionItems: [],
            tags: ["Design", "Review"]
        }
    ]

    const filteredMeetings = allMeetings.filter(meeting => {
        if (filterStatus === 'all') return true
        return meeting.status === filterStatus
    })

    return (
        <>
            {/* Header */}
            <header className="bg-[#262626]/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-40">
                <div className="px-8 py-6 pl-16 lg:pl-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-extrabold text-white mb-1">All Meetings</h1>
                            <p className="text-gray-400">View and manage your meeting summaries and action items.</p>
                        </div>
                        <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-md transition-all duration-300 flex items-center space-x-2">
                            <PlusIcon />
                            <span>Schedule Meeting</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="p-8 space-y-8">
                {/* Filter Tabs */}
                <div className="flex space-x-4 border-b border-gray-700 pb-4">
                    <FilterTab label="All Meetings" count={allMeetings.length} active={filterStatus === 'all'} onClick={() => setFilterStatus('all')} />
                    <FilterTab label="Upcoming" count={allMeetings.filter(m => m.status === 'upcoming').length} active={filterStatus === 'upcoming'} onClick={() => setFilterStatus('upcoming')} />
                    <FilterTab label="Past" count={allMeetings.filter(m => m.status === 'completed').length} active={filterStatus === 'completed'} onClick={() => setFilterStatus('completed')} />
                </div>

                {/* Meetings List */}
                <div className="space-y-6">
                    {filteredMeetings.map((meeting) => (
                        <DetailedMeetingCard key={meeting.id} meeting={meeting} />
                    ))}
                </div>
            </div>
        </>
    )
}

// Helper Components
function FilterTab({ label, count, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 font-semibold transition-all rounded-t-md ${active ? 'text-emerald-400 border-b-2 border-emerald-500' : 'text-gray-400 hover:text-white'
                }`}
        >
            {label} <span className="text-sm">({count})</span>
        </button>
    )
}

function DetailedMeetingCard({ meeting }) {
    const [expanded, setExpanded] = useState(false)

    return (
        <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 rounded-md blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-[#262626] border border-gray-700 rounded-md hover:border-emerald-500/50 transition-all overflow-hidden">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-xl font-bold text-white">{meeting.title}</h3>
                                <span className={`px-3 py-1 text-xs font-semibold rounded-md ${meeting.status === 'upcoming'
                                    ? 'bg-blue-500/10 border border-blue-500/30 text-blue-400'
                                    : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                                    }`}>
                                    {meeting.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                                </span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                                <span>{meeting.date}</span>
                                <span>{meeting.time} • {meeting.duration}</span>
                                <span>{Array.isArray(meeting.participants) ? meeting.participants.length : meeting.participants} participants</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            {meeting.tags.map((tag, idx) => (
                                <span key={idx} className="px-2 py-1 bg-[#1a1a1a] text-gray-400 text-xs rounded-md border border-gray-700">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {meeting.status === 'completed' && (
                        <>
                            <p className="text-gray-400 text-sm mb-4">{meeting.summary}</p>
                            {meeting.actionItems.length > 0 && (
                                <div className="mb-4">
                                    <h4 className="text-sm font-semibold text-white mb-2">Action Items ({meeting.actionItems.length})</h4>
                                    <div className="space-y-2">
                                        {meeting.actionItems.slice(0, expanded ? undefined : 2).map((item) => (
                                            <div key={item.id} className="flex items-start space-x-3 p-3 bg-[#1a1a1a] rounded-md border border-gray-700">
                                                <input type="checkbox" checked={item.completed} className="mt-1 w-4 h-4" readOnly />
                                                <div className="flex-1">
                                                    <p className={`text-sm ${item.completed ? 'line-through text-gray-500' : 'text-white'}`}>{item.task}</p>
                                                    <p className="text-xs text-gray-400 mt-1">Assigned: {item.assignee} • Due: {item.deadline}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {meeting.actionItems.length > 2 && (
                                        <button
                                            onClick={() => setExpanded(!expanded)}
                                            className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold mt-2"
                                        >
                                            {expanded ? 'Show Less' : `Show ${meeting.actionItems.length - 2} More`}
                                        </button>
                                    )}
                                </div>
                            )}
                        </>
                    )}

                    <div className="flex space-x-3 mt-4">
                        <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-md transition-all">
                            View Details
                        </button>
                        <button className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#333] border border-gray-700 text-gray-300 hover:text-white text-sm font-semibold rounded-md transition-all">
                            Download
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function PlusIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
    )
}

export default MeetingsContent
