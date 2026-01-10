import React, { useState, useEffect, useRef } from 'react'

function CalendarContent() {
    const today = new Date()
    const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
    const [completedEvents, setCompletedEvents] = useState(new Set())
    const [selectedDate, setSelectedDate] = useState(null)
    const [showYearDropdown, setShowYearDropdown] = useState(false)
    const yearDropdownRef = useRef(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target)) {
                setShowYearDropdown(false)
            }
        }

        if (showYearDropdown) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showYearDropdown])

    const events = [
        { id: 1, date: '2026-01-09', time: '14:00', title: 'Design Review', type: 'meeting', color: 'emerald', deadline: '2026-01-11' },
        { id: 2, date: '2026-01-09', time: '16:30', title: 'Client Presentation', type: 'meeting', color: 'blue', deadline: '2026-01-12' },
        { id: 3, date: '2026-01-09', time: '17:00', title: 'Team Sync', type: 'meeting', color: 'purple', deadline: '2026-01-10' },
        { id: 4, date: '2026-01-10', time: '10:00', title: 'Sprint Planning', type: 'meeting', color: 'emerald', deadline: '2026-01-15' },
        { id: 5, date: '2026-01-10', time: '15:00', title: 'Code Review', type: 'meeting', color: 'orange', deadline: '2026-01-13' },
        { id: 6, date: '2026-01-12', time: '11:00', title: 'UX Research Session', type: 'deadline', color: 'red', deadline: '2026-01-12' },
        { id: 7, date: '2026-01-15', time: '09:00', title: 'Mobile Wireframes Due', type: 'deadline', color: 'red', deadline: '2026-01-15' },
        { id: 8, date: '2025-12-20', time: '10:00', title: 'Year End Review', type: 'meeting', color: 'blue', deadline: '2025-12-22' },
        { id: 9, date: '2025-12-15', time: '14:00', title: 'Holiday Planning', type: 'meeting', color: 'purple', deadline: '2025-12-20' },
        { id: 10, date: '2026-02-14', time: '11:00', title: 'Valentine Campaign', type: 'meeting', color: 'red', deadline: '2026-02-14' },
        { id: 11, date: '2026-03-20', time: '09:00', title: 'Spring Launch', type: 'deadline', color: 'emerald', deadline: '2026-03-20' },
        { id: 12, date: '2026-04-10', time: '14:00', title: 'Q2 Planning', type: 'meeting', color: 'blue', deadline: '2026-04-15' },
        { id: 13, date: '2025-11-25', time: '10:00', title: 'Thanksgiving Break', type: 'meeting', color: 'orange', deadline: '2025-11-28' },
    ]

    const toggleEventCompletion = (eventId) => {
        setCompletedEvents(prev => {
            const newSet = new Set(prev)
            if (newSet.has(eventId)) {
                newSet.delete(eventId)
            } else {
                newSet.add(eventId)
            }
            return newSet
        })
    }

    const getDaysInMonth = (date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const firstDay = new Date(year, month, 1).getDay()
        const daysInMonth = new Date(year, month + 1, 0).getDate()
        return { firstDay, daysInMonth }
    }

    const getEventsForDate = (day) => {
        const year = currentMonth.getFullYear()
        const month = String(currentMonth.getMonth() + 1).padStart(2, '0')
        const dateStr = `${year}-${month}-${String(day).padStart(2, '0')}`
        return events.filter(event => event.date === dateStr)
    }

    const goToPreviousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
    }

    const goToNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
    }

    const goToToday = () => {
        setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1))
    }

    const changeYear = (year) => {
        setCurrentMonth(new Date(year, currentMonth.getMonth(), 1))
        setShowYearDropdown(false)
    }

    // Generate year options (10 years before and after current year)
    const currentYear = currentMonth.getFullYear()
    const yearOptions = []
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
        yearOptions.push(i)
    }

    const { firstDay, daysInMonth } = getDaysInMonth(currentMonth)
    const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })

    const todayDateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    const selectedDateEvents = selectedDate
        ? events.filter(event => event.date === selectedDate)
        : events.filter(event => event.date === todayDateStr)

    return (
        <>
            {/* Header */}
            <header className="bg-[#262626]/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-40">
                <div className="px-8 py-6 pl-16 lg:pl-8">
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
                                    <div className="relative" ref={yearDropdownRef}>
                                        <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                                            <span>{currentMonth.toLocaleString('default', { month: 'long' })}</span>
                                            <button
                                                onClick={() => setShowYearDropdown(!showYearDropdown)}
                                                className="hover:text-emerald-400 transition-colors flex items-center space-x-1"
                                            >
                                                <span>{currentYear}</span>
                                                <ChevronDownIcon />
                                            </button>
                                        </h2>

                                        {/* Year Dropdown */}
                                        {showYearDropdown && (
                                            <div className="absolute top-full left-0 mt-2 bg-[#1a1a1a] border border-gray-700 rounded-md shadow-xl z-50 max-h-64 overflow-y-auto w-32">
                                                {yearOptions.map((year) => (
                                                    <button
                                                        key={year}
                                                        onClick={() => changeYear(year)}
                                                        className={`w-full px-4 py-2 text-left hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors ${year === currentYear ? 'bg-emerald-500/20 text-emerald-400 font-semibold' : 'text-white'
                                                            }`}
                                                    >
                                                        {year}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={goToPreviousMonth}
                                            className="p-2 px-4 bg-[#1a1a1a] hover:bg-[#333] border border-gray-700 rounded-md text-white transition-all"
                                        >
                                            ←
                                        </button>
                                        <button
                                            onClick={goToToday}
                                            className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 rounded-md text-emerald-400 text-sm font-semibold transition-all"
                                        >
                                            Today
                                        </button>
                                        <button
                                            onClick={goToNextMonth}
                                            className="p-2 px-4 bg-[#1a1a1a] hover:bg-[#333] border border-gray-700 rounded-md text-white transition-all"
                                        >
                                            →
                                        </button>
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
                                        const year = currentMonth.getFullYear()
                                        const month = String(currentMonth.getMonth() + 1).padStart(2, '0')
                                        const dateStr = `${year}-${month}-${String(day).padStart(2, '0')}`
                                        const dayEvents = getEventsForDate(day)
                                        const isToday = day === today.getDate() &&
                                            currentMonth.getMonth() === today.getMonth() &&
                                            currentMonth.getFullYear() === today.getFullYear()
                                        const hasCompletedEvents = dayEvents.some(e => completedEvents.has(e.id))
                                        const isSelected = selectedDate === dateStr

                                        return (
                                            <div
                                                key={day}
                                                onClick={() => setSelectedDate(dateStr)}
                                                className={`aspect-square p-2 rounded-md border transition-all cursor-pointer relative ${isToday
                                                    ? 'bg-emerald-500/10 border-emerald-500/50'
                                                    : isSelected
                                                        ? 'bg-blue-500/10 border-blue-500/50'
                                                        : 'bg-[#1a1a1a] border-gray-700 hover:border-emerald-500/30'
                                                    }`}
                                            >
                                                <div className="flex flex-col h-full">
                                                    <div className="flex justify-between items-start">
                                                        <span className={`text-sm font-semibold mb-1 ${isToday ? 'text-emerald-400' :
                                                            isSelected ? 'text-blue-400' :
                                                                'text-white'
                                                            }`}>
                                                            {day}
                                                        </span>
                                                        {hasCompletedEvents && (
                                                            <div className="text-emerald-400">
                                                                <CheckIcon />
                                                            </div>
                                                        )}
                                                    </div>
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
                            <div className="flex items-center space-x-2">
                                <div className="text-emerald-400"><CheckIcon /></div>
                                <span className="text-sm text-gray-400">Completed</span>
                            </div>
                        </div>
                    </div>

                    {/* Event Details Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-md blur opacity-20"></div>
                            <div className="relative bg-[#262626] border border-gray-700 rounded-md p-6">
                                <h3 className="text-xl font-bold text-white mb-4">
                                    {selectedDate
                                        ? `Events on ${new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                                        : "Today's Schedule"
                                    }
                                </h3>
                                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                                    {selectedDateEvents.length > 0 ? (
                                        selectedDateEvents.map((event) => (
                                            <div key={event.id} className="p-3 bg-[#1a1a1a] rounded-md border border-gray-700 hover:border-gray-600 transition-all">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-start space-x-3 flex-1">
                                                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${event.color === 'emerald' ? 'bg-emerald-500' :
                                                            event.color === 'blue' ? 'bg-blue-500' :
                                                                event.color === 'purple' ? 'bg-purple-500' :
                                                                    event.color === 'orange' ? 'bg-orange-500' :
                                                                        'bg-red-500'
                                                            }`}></div>
                                                        <div className="flex-1">
                                                            <p className={`text-sm font-semibold ${completedEvents.has(event.id) ? 'line-through text-gray-500' : 'text-white'}`}>
                                                                {event.title}
                                                            </p>
                                                            <p className="text-xs text-gray-400 mt-0.5">{event.time}</p>
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                <span className="text-gray-400">Deadline:</span> {new Date(event.deadline + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => toggleEventCompletion(event.id)}
                                                        className={`ml-2 p-1.5 rounded-md transition-all ${completedEvents.has(event.id)
                                                            ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                                                            : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
                                                            }`}
                                                    >
                                                        <CheckIcon />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-sm text-center py-8">No events scheduled</p>
                                    )}
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

function CheckIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    )
}

function ChevronDownIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    )
}

export default CalendarContent
