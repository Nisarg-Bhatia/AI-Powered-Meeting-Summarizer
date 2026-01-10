import React from 'react';
import { Link } from 'react-router-dom'; // Ensure react-router-dom is installed

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] pt-20 pb-10 border-t border-gray-700 relative overflow-hidden z-20">


      <div className="container mx-auto px-6">

        {/* === Main Footer Content (Grid) === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-16">

          {/* Col 1: Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="inline-block text-2xl font-extrabold tracking-tight">
              <span className="text-emerald-400">MeetSmart</span>
              <span className="text-white">AI</span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Supercharge your Google Meets with AI-powered summaries, instant action items, and automatic calendar syncing. Focus on the conversation, not the notes.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4 pt-2">
              {/* Twitter / X */}
              <SocialLink href="#" icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>} />
              {/* LinkedIn */}
              <SocialLink href="#" icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.75 1.75 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93-1.39 0-2.62 1.15-2.62 2.93V19h-3v-9h3v1.4c.98-1.86 2.75-2 3.68-2 2.82 0 3.32 2.36 3.32 4.78z" /></svg>} />
              {/* GitHub */}
              <SocialLink href="#" icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" /></svg>} />
            </div>
          </div>

          {/* Col 2: Product Links */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Product</h3>
            <ul className="space-y-3">
              <FooterLink to="/overview">Features</FooterLink>
              <FooterLink to="#">Pricing (Coming Soon)</FooterLink>
              <FooterLink to="#">Download Extension</FooterLink>
              <FooterLink to="#">Changelog</FooterLink>
            </ul>
          </div>

          {/* Col 3: Company Links */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Company</h3>
            <ul className="space-y-3">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="#">Blog</FooterLink>
              <FooterLink to="#">Contact Support</FooterLink>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">Get the latest updates and productivity tips right to your inbox.</p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-[#262626] border border-gray-700 rounded-md focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white placeholder-gray-500 outline-none transition-all"
              />
              <button className="relative group w-full">
                <div className="relative w-full py-3 bg-emerald-500 hover:bg-emerald-600 rounded-md flex items-center justify-center font-bold text-white text-sm transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:shadow-lg hover:shadow-emerald-500/50">
                  Subscribe
                </div>
              </button>
            </form>
          </div>

        </div>

        {/* === Bottom Bar (Copyright & Legal) === */}
        <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p className="mb-4 md:mb-0">© {new Date().getFullYear()} MeetSmart AI. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-emerald-400 transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-emerald-400 transition-colors">Cookies</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

// --- Helper Components for Cleaner Code ---

const FooterLink = ({ to, children }) => (
  <li>
    <Link to={to} className="text-gray-400 hover:text-emerald-400 transition-colors duration-200 font-medium text-sm">
      {children}
    </Link>
  </li>
);

const SocialLink = ({ href, icon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300">
    {icon}
  </a>
);

export default Footer;