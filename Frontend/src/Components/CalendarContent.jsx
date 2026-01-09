import React from 'react'

function CalendarContent() {
    const currentMonth = new Date(2026, 0, 1) // January 2026

    const events = [
        { date: '2026-01-09', time: '14:00', title: 'Design Review', type: 'meeting', color: 'emerald' },
        { date: '2026-01-09', time: '16:30', title: 'Client Presentation', type: 'meeting', color: 'blue' },
        { date: '2026-01-09', time: '17:00', title: 'Team Sync', type: 'meeting', color: 'purple' },
        { date: '2026-01-10', time: '10:00', title: 'Sprint Planning', type: 'meeting', color: 'emerald' },
        { date: '2026-01-10', time: '15:00', title: 'Code Review', type: 'meeting', color: 'orange' },
        { date: '2026-01-12', time: '11:00', title: 'UX Research Session', type: 'deadline', color: 'red' },
        { date: '2026-01-15', time: '09:00', title: 'Mobile Wireframes Due', type: 'deadline', color: 'red' },
    ]

    const getDaysInMonth = (date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const firstDay = new Date(year, month, 1).getDay()
        const daysInMonth = new Date(year, month + 1, 0).getDate()
        return { firstDay, daysInMonth }
    }

    const { firstDay, daysInMonth } = getDaysInMonth(currentMonth)
    const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })

    const getEventsForDate = (day) => {
        const dateStr = `2026-01-${String(day).padStart(2, '0')}`
        return events.filter(event => event.date === dateStr)
    }

    const todayEvents = events.filter(event => event.date === '2026-01-09')

    return (
        <>
            {/* Header */}
            <header className="bg-[#262626]/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-40">
                <div className="px-8 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-extrabold text-white mb-1">Calendar</h1>
                            <p className="text-gray-400">View your meetings and deadlines at a glance.</p>
                        </div>
                        <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-md transition-all duration-300 flex items-center space-x-2">
                            <PlusIcon />
                            <span>Add Event</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Calendar Grid */}
                    <div className="lg:col-span-2">
                        <div className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-md blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                            <div className="relative bg-[#262626] border border-gray-700 rounded-md p-6 hover:border-emerald-500/50 transition-all">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-white">{monthName}</h2>
                                    <div className="flex space-x-2">
                                        <button className="p-2 bg-[#1a1a1a] hover:bg-[#333] border border-gray-700 rounded-md">←</button>
                                        <button className="p-2 bg-[#1a1a1a] hover:bg-[#333] border border-gray-700 rounded-md">→</button>
                                    </div>
                                </div>

                                {/* Days of Week */}
                                <div className="grid grid-cols-7 gap-2 mb-2">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                        <div key={day} className="text-center text-sm font-semibold text-gray-400 py-2">{day}</div>
                                    ))}
                                </div>

                                {/* Calendar Days */}
                                <div className="grid grid-cols-7 gap-2">
                                    {Array.from({ length: firstDay }).map((_, index) => (
                                        <div key={`empty-${index}`} className="aspect-square"></div>
                                    ))}

                                    {Array.from({ length: daysInMonth }).map((_, index) => {
                                        const day = index + 1
                                        const dayEvents = getEventsForDate(day)
                                        const isToday = day === 9

                                        return (
                                            <div
                                                key={day}
                                                className={`aspect-square p-2 rounded-md border transition-all cursor-pointer ${isToday
                                                        ? 'bg-emerald-500/10 border-emerald-500/50'
                                                        : 'bg-[#1a1a1a] border-gray-700 hover:border-emerald-500/30'
                                                    }`}
                                            >
                                                <div className="flex flex-col h-full">
                                                    <span className={`text-sm font-semibold mb-1 ${isToday ? 'text-emerald-400' : 'text-white'}`}>
                                                        {day}
                                                    </span>
                                                    <div className="flex-1 space-y-1">
                                                        {dayEvents.slice(0, 2).map((event, idx) => (
                                                            <div
                                                                key={idx}
                                                                className={`w-full h-1 rounded-full ${event.color === 'emerald' ? 'bg-emerald-500' :
                                                                        event.color === 'blue' ? 'bg-blue-500' :
                                                                            event.color === 'purple' ? 'bg-purple-500' :
                                                                                event.color === 'orange' ? 'bg-orange-500' :
                                                                                    'bg-red-500'
                                                                    }`}
                                                            ></div>
                                                        ))}
                                                        {dayEvents.length > 2 && (
                                                            <span className="text-[10px] text-gray-400">+{dayEvents.length - 2}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="mt-6 flex flex-wrap gap-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                <span className="text-sm text-gray-400">Meetings</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <span className="text-sm text-gray-400">Deadlines</span>
                            </div>
                        </div>
                    </div>

                    {/* Today's Events Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-md blur opacity-20"></div>
                            <div className="relative bg-[#262626] border border-gray-700 rounded-md p-6">
                                <h3 className="text-xl font-bold text-white mb-4">Today's Schedule</h3>
                                <div className="space-y-3">
                                    {todayEvents.map((event, idx) => (
                                        <div key={idx} className="p-3 bg-[#1a1a1a] rounded-md border border-gray-700">
                                            <div className="flex items-start space-x-3">
                                                <div className={`w-2 h-2 rounded-full mt-1.5 ${event.color === 'emerald' ? 'bg-emerald-500' :
                                                        event.color === 'blue' ? 'bg-blue-500' :
                                                            event.color === 'purple' ? 'bg-purple-500' :
                                                                'bg-orange-500'
                                                    }`}></div>
                                                <div>
                                                    <p className="text-sm font-semibold text-white">{event.title}</p>
                                                    <p className="text-xs text-gray-400">{event.time}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
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

export default CalendarContent
