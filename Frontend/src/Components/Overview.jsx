import React from 'react'; // Removed "type" import

// A reusable component for individual feature cards
// REMOVED TypeScript annotations here ▼
const FeatureCard = ({
  icon,
  title,
  description,
  glowColor,
}) => {
  return (
    <div className="group relative h-full">
      {/* Hover Glow Effect behind the card */}
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${glowColor} rounded-3xl blur opacity-20 group-hover:opacity-60 transition duration-500 -z-10`}
      ></div>

      {/* Card Content */}
      <div className="relative h-full p-8 rounded-md bg-[#262626] border border-gray-700 hover:border-emerald-500/50 transition-all overflow-hidden flex flex-col group">
        {/* Icon Container */}
        <div
          className={`mb-6 inline-flex p-3 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center group-hover:border-emerald-500 transition-all`}
        >
          {icon}
        </div>

        <h3 className="text-2xl font-bold mb-4 text-white transition-all duration-300">
          {title}
        </h3>
        <p className="text-gray-400 leading-relaxed flex-grow">{description}</p>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <section className="py-22 bg-[#1a1a1a] relative overflow-hidden z-10 min-h-screen">
      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-white">
            Your Meeting Assistant, <br />
            <span className="text-emerald-400">
              Automated.
            </span>
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed font-light">
            Our extension quietly works in the background of your Google Meets, processing audio in real-time to deliver
            structured intelligence the moment the call ends.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* FEATURE 1: Audio Summarization - Microphone Icon */}
          <FeatureCard
            glowColor="from-emerald-500 to-emerald-600"
            title="Instant Audio Summaries"
            description="Stop trying to write down everything. We capture the full audio context and generate concise, accurate summaries highlighting the most important topics discussed."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-emerald-400"
              >
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" x2="12" y1="19" y2="22" />
              </svg>
            }
          />

          {/* FEATURE 2: Smart To-Do Lists - Sparkles/AI Icon */}
          <FeatureCard
            glowColor="from-emerald-500 to-emerald-600"
            title="Smart To-Do Lists"
            description="Never miss a follow-up. The AI identifies commitments and action items assigned to participants, automatically generating a checklist ready for your task manager."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-emerald-400"
              >
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                <path d="M20 3v4" />
                <path d="M22 5h-4" />
              </svg>
            }
          />

          {/* FEATURE 3: Calendar Sync - Bell/Notification Icon */}
          <FeatureCard
            glowColor="from-emerald-500 to-emerald-600"
            title="Auto-Calendar Sync"
            description="Did someone say 'Let's meet next Tuesday at 2 PM'? The extension detects dates and times spoken in the meeting and automatically drafts Google Calendar invites."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-emerald-400"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                <path d="M4 2C2.8 3.7 2 5.7 2 8" />
                <path d="M22 8c0-2.3-.8-4.3-2-6" />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  )
}