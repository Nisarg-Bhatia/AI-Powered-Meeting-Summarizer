"use client"

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MeetingsContent from './MeetingsContent.jsx'
import CalendarContent from './CalendarContent.jsx'
import SettingsContent from './SettingsContent.jsx'

function Dashboard() {
    const [activeNav, setActiveNav] = useState('dashboard')

    // Sample meeting data
    const recentMeetings = [
        {
            id: 1,
            title: "Product Strategy Review",
            date: "2026-01-09",
            time: "14:30",
            duration: "45 min",
            participants: 5,
            summary: "Discussed Q1 roadmap priorities and resource allocation. Key decision: Focus on mobile app improvements...",
            actionItems: 3
        },
        {
            id: 2,
            title: "Marketing Sync",
            date: "2026-01-08",
            time: "10:00",
            duration: "30 min",
            participants: 3,
            summary: "Reviewed campaign performance metrics. Social media engagement up 25% from last quarter...",
            actionItems: 5
        },
        {
            id: 3,
            title: "Engineering Standup",
            date: "2026-01-08",
            time: "09:15",
            duration: "15 min",
            participants: 8,
            summary: "Team updates on sprint progress. Backend API integration on track for Friday deployment...",
            actionItems: 2
        }
    ]

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white flex overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-[#262626] border-r border-gray-700 flex flex-col fixed h-full z-50">
                {/* Logo */}
                <div className="p-6 border-b border-gray-700">
                    <div className="text-2xl font-extrabold tracking-tight cursor-pointer">
                        <span className="text-emerald-400">MeetSmart</span>
                        <span className="text-white">AI</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    <NavItem
                        icon={<DashboardIcon />}
                        label="Dashboard"
                        active={activeNav === 'dashboard'}
                        onClick={() => setActiveNav('dashboard')}
                    />
                    <NavItem
                        icon={<MeetingsIcon />}
                        label="Meetings"
                        active={activeNav === 'meetings'}
                        onClick={() => setActiveNav('meetings')}
                    />
                    <NavItem
                        icon={<CalendarIcon />}
                        label="Calendar"
                        active={activeNav === 'calendar'}
                        onClick={() => setActiveNav('calendar')}
                    />
                    <NavItem
                        icon={<SettingsIcon />}
                        label="Settings"
                        active={activeNav === 'settings'}
                        onClick={() => setActiveNav('settings')}
                    />
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-gray-700">
                    <div className="flex items-center space-x-3 p-3 rounded-md bg-[#1a1a1a] border border-gray-700 hover:border-emerald-500/50 transition-all cursor-pointer group">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center font-bold text-white">
                            JD
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-white">John Doe</p>
                            <p className="text-xs text-gray-400">john@company.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 overflow-y-auto">
                {activeNav === 'dashboard' && (
                    <>
                        {/* Header */}
                        <header className="bg-[#262626]/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-40">
                            <div className="px-8 py-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h1 className="text-3xl font-extrabold text-white mb-1">Welcome back, John!</h1>
                                        <p className="text-gray-400">Here's what's happening with your meetings today.</p>
                                    </div>
                                    <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-md transition-all duration-300 flex items-center space-x-2">
                                        <PlusIcon />
                                        <span>New Meeting</span>
                                    </button>
                                </div>
                            </div>
                        </header>

                        {/* Main Content Area */}
                        <div className="p-8 space-y-8">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <StatCard
                                    title="Meetings This Month"
                                    value="24"
                                    change="+12%"
                                    positive={true}
                                    icon={<MeetingsIcon />}
                                    glowColor="from-emerald-500 to-emerald-600"
                                />
                                <StatCard
                                    title="Hours Saved"
                                    value="18.5"
                                    change="+8%"
                                    positive={true}
                                    icon={<ClockIcon />}
                                    glowColor="from-blue-500 to-blue-600"
                                />
                                <StatCard
                                    title="Action Items"
                                    value="42"
                                    change="-5%"
                                    positive={false}
                                    icon={<ChecklistIcon />}
                                    glowColor="from-purple-500 to-purple-600"
                                />
                                <StatCard
                                    title="Upcoming Today"
                                    value="3"
                                    change="2 pending"
                                    icon={<CalendarIcon />}
                                    glowColor="from-orange-500 to-orange-600"
                                />
                            </div>

                            {/* Recent Meetings */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold text-white">Recent Meetings</h2>
                                    <button
                                        onClick={() => setActiveNav('meetings')}
                                        className="text-emerald-400 hover:text-emerald-300 font-semibold text-sm transition-colors"
                                    >
                                        View All →
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {recentMeetings.map((meeting) => (
                                        <MeetingCard key={meeting.id} meeting={meeting} />
                                    ))}
                                </div>
                            </div>

                            {/* Quick Actions or Additional Sections */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Upcoming Meetings */}
                                <div className="group relative">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-md blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                                    <div className="relative bg-[#262626] border border-gray-700 rounded-md p-6 hover:border-emerald-500/50 transition-all">
                                        <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                                            <CalendarIcon />
                                            <span>Upcoming Today</span>
                                        </h3>
                                        <div className="space-y-3">
                                            <UpcomingMeetingItem time="2:00 PM" title="Design Review" participants={4} />
                                            <UpcomingMeetingItem time="4:30 PM" title="Client Call" participants={2} />
                                            <UpcomingMeetingItem time="5:00 PM" title="Team Sync" participants={6} />
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="group relative">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-md blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                                    <div className="relative bg-[#262626] border border-gray-700 rounded-md p-6 hover:border-emerald-500/50 transition-all">
                                        <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                                            <TrendingIcon />
                                            <span>This Week</span>
                                        </h3>
                                        <div className="space-y-4">
                                            <ProgressItem label="Tasks Completed" value={28} total={42} />
                                            <ProgressItem label="Meeting Goals" value={5} total={7} />
                                            <ProgressItem label="Follow-ups Done" value={15} total={18} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeNav === 'meetings' && <MeetingsContent />}
                {activeNav === 'calendar' && <CalendarContent />}
                {activeNav === 'settings' && <SettingsContent />}
            </main>
        </div>
    )
}

// Navigation Item Component
function NavItem({ icon, label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition-all duration-300 ${active
                ? 'bg-emerald-500/10 border border-emerald-500/50 text-emerald-400'
                : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a] border border-transparent'
                }`}
        >
            {icon}
            <span className="font-medium">{label}</span>
        </button>
    )
}

// Stat Card Component
function StatCard({ title, value, change, positive, icon, glowColor }) {
    return (
        <div className="group relative">
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${glowColor} rounded-md blur opacity-20 group-hover:opacity-60 transition duration-500`}></div>
            <div className="relative bg-[#262626] border border-gray-700 rounded-md p-6 hover:border-emerald-500/50 transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                        {icon}
                    </div>
                    {change && (
                        <span className={`text-sm font-semibold ${positive !== false ? 'text-emerald-400' : 'text-gray-400'}`}>
                            {change}
                        </span>
                    )}
                </div>
                <h3 className="text-3xl font-extrabold text-white mb-1">{value}</h3>
                <p className="text-sm text-gray-400">{title}</p>
            </div>
        </div>
    )
}

// Meeting Card Component
function MeetingCard({ meeting }) {
    return (
        <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 rounded-md blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-[#262626] border border-gray-700 rounded-md p-6 hover:border-emerald-500/50 transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{meeting.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span className="flex items-center space-x-1">
                                <CalendarIcon className="w-4 h-4" />
                                <span>{meeting.date}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                                <ClockIcon className="w-4 h-4" />
                                <span>{meeting.time} • {meeting.duration}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                                <UsersIcon className="w-4 h-4" />
                                <span>{meeting.participants} participants</span>
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-md">
                            {meeting.actionItems} Actions
                        </span>
                    </div>
                </div>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{meeting.summary}</p>
                <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-md transition-all">
                        View Details
                    </button>
                    <button className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#333] border border-gray-700 hover:border-emerald-500/50 text-gray-300 hover:text-white text-sm font-semibold rounded-md transition-all">
                        Download
                    </button>
                </div>
            </div>
        </div>
    )
}

// Upcoming Meeting Item
function UpcomingMeetingItem({ time, title, participants }) {
    return (
        <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-md border border-gray-700 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <div>
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="text-xs text-gray-400">{time}</p>
                </div>
            </div>
            <div className="flex items-center space-x-1 text-gray-400">
                <UsersIcon className="w-4 h-4" />
                <span className="text-xs">{participants}</span>
            </div>
        </div>
    )
}

// Progress Item
function ProgressItem({ label, value, total }) {
    const percentage = (value / total) * 100
    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">{label}</span>
                <span className="text-sm font-semibold text-white">{value}/{total}</span>
            </div>
            <div className="w-full bg-[#1a1a1a] rounded-full h-2 overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    )
}

// Icons
function DashboardIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
    )
}

function MeetingsIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
    )
}

function CalendarIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
    )
}

function SettingsIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3"></path>
            <path d="M19.07 4.93l-4.24 4.24m-5.66 5.66L4.93 19.07m14.14 0l-4.24-4.24m-5.66-5.66L4.93 4.93"></path>
        </svg>
    )
}

function ClockIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
    )
}

function ChecklistIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4"></path>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
        </svg>
    )
}

function PlusIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
    )
}

function UsersIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
    )
}

function TrendingIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
            <polyline points="17 6 23 6 23 12"></polyline>
        </svg>
    )
}

export default Dashboard
