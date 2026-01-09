import React, { useState } from 'react'

function SettingsContent() {
    const [activeTab, setActiveTab] = useState('profile')

    return (
        <>
            {/* Header */}
            <header className="bg-[#262626]/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-40">
                <div className="px-8 py-6">
                    <div>
                        <h1 className="text-3xl font-extrabold text-white mb-1">Settings</h1>
                        <p className="text-gray-400">Manage your account and preferences.</p>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Settings Navigation */}
                    <div className="lg:col-span-1">
                        <div className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-md blur opacity-20"></div>
                            <div className="relative bg-[#262626] border border-gray-700 rounded-md p-4">
                                <nav className="space-y-2">
                                    <SettingsNavItem label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
                                    <SettingsNavItem label="Notifications" active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} />
                                    <SettingsNavItem label="Privacy" active={activeTab === 'privacy'} onClick={() => setActiveTab('privacy')} />
                                    <SettingsNavItem label="Integrations" active={activeTab === 'integrations'} onClick={() => setActiveTab('integrations')} />
                                    <SettingsNavItem label="Billing" active={activeTab === 'billing'} onClick={() => setActiveTab('billing')} />
                                </nav>
                            </div>
                        </div>
                    </div>

                    {/* Settings Content */}
                    <div className="lg:col-span-3">
                        {activeTab === 'profile' && <ProfileSettings />}
                        {activeTab === 'notifications' && <NotificationSettings />}
                        {activeTab === 'privacy' && <PrivacySettings />}
                        {activeTab === 'integrations' && <IntegrationSettings />}
                        {activeTab === 'billing' && <BillingSettings />}
                    </div>
                </div>
            </div>
        </>
    )
}

function SettingsNavItem({ label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition-all duration-300 text-left ${active
                    ? 'bg-emerald-500/10 border border-emerald-500/50 text-emerald-400'
                    : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a] border border-transparent'
                }`}
        >
            <span className="font-medium text-sm">{label}</span>
        </button>
    )
}

function ProfileSettings() {
    return (
        <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-md blur opacity-20"></div>
            <div className="relative bg-[#262626] border border-gray-700 rounded-md p-6">
                <h2 className="text-2xl font-bold text-white mb-2">Profile Information</h2>
                <p className="text-gray-400 mb-6">Update your account details and profile.</p>

                <div className="space-y-4">
                    <div className="flex items-center space-x-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center font-bold text-white text-2xl">
                            JD
                        </div>
                        <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-md transition-all">
                            Change Avatar
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField label="Full Name" value="John Doe" />
                        <InputField label="Email" value="john@company.com" />
                        <InputField label="Job Title" value="Product Manager" />
                        <InputField label="Company" value="Tech Corp" />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button className="px-4 py-2 bg-[#1a1a1a] border border-gray-700 text-gray-300 text-sm font-semibold rounded-md">
                            Cancel
                        </button>
                        <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-md transition-all">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function NotificationSettings() {
    return (
        <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-md blur opacity-20"></div>
            <div className="relative bg-[#262626] border border-gray-700 rounded-md p-6">
                <h2 className="text-2xl font-bold text-white mb-2">Notification Preferences</h2>
                <p className="text-gray-400 mb-6">Choose what notifications you want to receive.</p>
                <div className="space-y-4">
                    <ToggleItem label="Meeting Summaries" description="Get notified when AI generates a meeting summary" defaultChecked={true} />
                    <ToggleItem label="Action Item Reminders" description="Receive reminders for upcoming action item deadlines" defaultChecked={true} />
                    <ToggleItem label="Calendar Updates" description="Notifications when new events are added" defaultChecked={false} />
                    <ToggleItem label="Weekly Digest" description="Get a weekly summary of all your meetings" defaultChecked={true} />
                </div>
            </div>
        </div>
    )
}

function PrivacySettings() {
    return (
        <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-md blur opacity-20"></div>
            <div className="relative bg-[#262626] border border-gray-700 rounded-md p-6">
                <h2 className="text-2xl font-bold text-white mb-2">Privacy & Security</h2>
                <p className="text-gray-400 mb-6">Control your data and security settings.</p>
                <div className="space-y-4">
                    <ToggleItem label="Auto-Record Meetings" description="Automatically record and transcribe all Google Meet calls" defaultChecked={true} />
                    <ToggleItem label="Share Meeting Data" description="Allow teammates to access your meeting summaries" defaultChecked={false} />
                    <ToggleItem label="Two-Factor Authentication" description="Add an extra layer of security" defaultChecked={false} />
                </div>
            </div>
        </div>
    )
}

function IntegrationSettings() {
    return (
        <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-md blur opacity-20"></div>
            <div className="relative bg-[#262626] border border-gray-700 rounded-md p-6">
                <h2 className="text-2xl font-bold text-white mb-2">Integrations</h2>
                <p className="text-gray-400 mb-6">Connect MeetSmart AI with your favorite tools.</p>
                <div className="space-y-4">
                    <IntegrationCard name="Google Calendar" connected={true} />
                    <IntegrationCard name="Slack" connected={false} />
                    <IntegrationCard name="Notion" connected={false} />
                    <IntegrationCard name="Trello" connected={true} />
                </div>
            </div>
        </div>
    )
}

function BillingSettings() {
    return (
        <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-md blur opacity-20"></div>
            <div className="relative bg-[#262626] border border-gray-700 rounded-md p-6">
                <h2 className="text-2xl font-bold text-white mb-2">Billing & Subscription</h2>
                <p className="text-gray-400 mb-6">Manage your subscription and payment methods.</p>

                <div className="p-6 bg-[#1a1a1a] rounded-md border border-gray-700">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Pro Plan</h3>
                            <p className="text-gray-400">Unlimited meetings and AI features</p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-extrabold text-emerald-400">$29</p>
                            <p className="text-sm text-gray-400">per month</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-md transition-all">
                        Upgrade Plan
                    </button>
                </div>
            </div>
        </div>
    )
}

// Helper Components
function InputField({ label, value }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
            <input
                type="text"
                defaultValue={value}
                className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-md text-white focus:border-emerald-500 outline-none"
            />
        </div>
    )
}

function ToggleItem({ label, description, defaultChecked }) {
    return (
        <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-md border border-gray-700">
            <div>
                <p className="text-white font-medium">{label}</p>
                <p className="text-sm text-gray-400">{description}</p>
            </div>
            <input type="checkbox" defaultChecked={defaultChecked} className="w-11 h-6" />
        </div>
    )
}

function IntegrationCard({ name, connected }) {
    return (
        <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-md border border-gray-700">
            <p className="text-white font-semibold">{name}</p>
            <button className={`px-4 py-2 text-sm font-semibold rounded-md ${connected
                    ? 'bg-emerald-500/10 border border-emerald-500/50 text-emerald-400'
                    : 'bg-[#262626] border border-gray-700 text-gray-300'
                }`}>
                {connected ? 'Connected' : 'Connect'}
            </button>
        </div>
    )
}

export default SettingsContent
