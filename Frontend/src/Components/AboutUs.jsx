"use client"

const glowColor = (gradient) => {
  return "from-emerald-500/20 to-emerald-600/20"
}

const ValueCard = ({ icon, title, description, gradient }) => {
  return (
    <div className="group relative p-[1px] rounded-md bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 overflow-hidden" data-aos="fade-up" data-aos-delay="200">
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}
      ></div>

      <div className="relative h-full bg-[#262626] border border-gray-700 p-8 rounded-md flex flex-col items-start">
        <div
          className={`mb-6 p-3 rounded-md bg-emerald-500/10 border border-emerald-500/30`}
        >
          {icon}
        </div>

        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed text-sm">{description}</p>
      </div>
    </div>
  )
}

function AboutUs() {
  return (
    <div className="bg-[#1a1a1a] text-white overflow-hidden relative">
      <section className="pt-32 pb-20 container mx-auto px-6 text-center relative z-10">
        <span className="inline-block py-1 px-4 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold tracking-wider uppercase mb-6" data-aos="fade-up">
          About MeetSmart AI
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-8 text-white" data-aos="fade-up" data-aos-delay="100">
          We're Reclaiming Your <br />
          <span className="text-emerald-400">
            Time to Think.
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light" data-aos="fade-up" data-aos-delay="200">
          We believe human connection is vital, but the administrative overhead of meetings is broken. We use AI to
          handle the busywork so you can focus on the big ideas.
        </p>
      </section>

      <section className="py-20 container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 relative" data-aos="fade-right">
            <div className="aspect-square relative rounded-md overflow-hidden border border-gray-700 bg-[#262626]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-emerald-500/10 rounded-full blur-[100px] opacity-40 animate-pulse"></div>
              <svg
                className="absolute inset-0 w-full h-full opacity-30"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M50 350L150 250L250 300L350 100"
                  stroke="url(#grad_line)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <circle cx="50" cy="350" r="6" fill="#10b981" />
                <circle cx="150" cy="250" r="6" fill="#059669" />
                <circle cx="250" cy="300" r="6" fill="#10b981" />
                <circle cx="350" cy="100" r="8" fill="white" />
                <defs>
                  <linearGradient id="grad_line" x1="50" y1="350" x2="350" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#10b981" />
                    <stop offset="1" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div className="w-full md:w-1/2 space-y-6" data-aos="fade-left">
            <h2 className="text-3xl font-bold mb-4 text-white">The Story Defining Our Mission</h2>
            <div className="space-y-6 text-gray-400 leading-relaxed">
              <p>
                Like everyone else in the modern workplace, we were drowning in back-to-back Google Meets. We spent half
                our day on calls and the other half trying to decipher hastily scribbled notes, figuring out who
                promised to do what by when.
              </p>
              <p>
                We realized that while the *conversation* was valuable, the *process* of documenting it was a massive
                productivity drain. Important context was being lost, and brilliant ideas were buried in forgotten
                notebooks.
              </p>
              <p className="text-gray-300 font-medium border-l-4 border-emerald-500 pl-4 py-1 bg-emerald-500/10 rounded-r-md">
                We built MeetSmart AI not to replace human interaction, but to enhance it. We want to ensure that every
                minute you spend in a meeting translates into tangible progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 container mx-auto px-6 relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-white">Our Core Principles</h2>
          <p className="text-gray-400 mt-4" data-aos="fade-up" data-aos-delay="100">The pillars guiding how we build AI for your workflow.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ValueCard
            title="Human Focus First"
            description="Technology should serve you, not distract you. Our AI runs invisibly so you can remain fully present in the conversation."
            gradient="from-orange-500 to-orange-600"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-emerald-400"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            }
          />
          <ValueCard
            title="Uncompromising Privacy"
            description="Your meetings are private. We process data securely and never use your conversations to train public models. What happens in Meet stays in Meet."
            gradient="from-orange-500 to-orange-600"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-emerald-400"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            }
          />
          <ValueCard
            title="Radical Simplicity"
            description="Productivity tools shouldn't feel like work. We obsess over friction-free design—no complex setups, just install and go."
            gradient="from-orange-500 to-orange-600"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-emerald-400"
              >
                <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
                <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                <path d="M12 2v2" />
                <path d="M12 22v-2" />
                <path d="m17 7-1.4-1.4" />
                <path d="M17 17l-1.4 1.4" />
                <path d="m7 7 1.4-1.4" />
                <path d="M7 17l1.4 1.4" />
              </svg>
            }
          />
        </div>
      </section>

      <section className="py-20 text-center relative z-10 border-t border-gray-700">
        <h3 className="text-2xl font-bold mb-6 text-white">Ready to upgrade your meetings?</h3>
        <button className="relative group inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-300 bg-emerald-500 hover:bg-emerald-600 rounded-md">
          <span className="relative z-10">Get Started for Free</span>
        </button>
      </section>
    </div>
  )
}

export default AboutUs
