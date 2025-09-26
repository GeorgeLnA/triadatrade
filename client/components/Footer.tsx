import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show footer 1 second after hero video loads (4 seconds total)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <footer 
      className="fixed bottom-0 left-0 right-0 w-full h-[65vh] bg-white text-black z-1 transition-opacity duration-300"
      style={{
        opacity: isVisible ? 1 : 0
      }}
    >
      <div className="container mx-auto px-6 py-16 h-full flex flex-col justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          
          {/* Left section - Email signup */}
          <div className="space-y-8">
            <div>
              <p className="text-sm text-gray-600 mb-6">
                Sign up for our emails to get defence industry updates and insights
              </p>
              <form className="relative">
                <input
                  type="email"
                  placeholder="YOURNAME@EMAIL.COM"
                  className="w-full h-12 px-4 pr-12 bg-transparent border border-gray-600 rounded text-black placeholder-gray-400 text-sm uppercase focus:outline-none focus:border-black transition-all duration-200"
                />
                <button 
                  type="submit"
                  className="absolute right-1 top-1 w-10 h-10 bg-black hover:bg-gray-800 rounded flex items-center justify-center transition-all duration-200"
                >
                  <svg width="8" height="12" viewBox="0 0 8 12" fill="none" className="text-white">
                    <path d="M1.84065 1.10612L5.84066 5.10612L1.84065 9.10612" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </button>
              </form>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Defence Industry Consulting</span>
            </div>
            
            <div className="pt-8 border-t border-gray-600">
              <Link to="/privacy-policy" className="text-xs text-gray-500 hover:text-black transition-colors uppercase">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Middle section - Logo */}
          <div className="flex items-center justify-center">
            <img src="/logo_menu.png" alt="Triada Trade" className="h-32 w-auto" />
          </div>

          {/* Right section - Navigation links */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-black mb-4 font-teko">COMPANY</h3>
              <Link to="/who-we-are" className="block text-sm text-gray-600 hover:text-black transition-colors">
                Who We Are
              </Link>
              <Link to="/team" className="block text-sm text-gray-600 hover:text-black transition-colors">
                Our Team
              </Link>
              <Link to="/partners" className="block text-sm text-gray-600 hover:text-black transition-colors">
                Partners
              </Link>
              <a href="#" className="block text-sm text-gray-600 hover:text-black transition-colors">
                LinkedIn
              </a>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-black mb-4 font-teko">SERVICES</h3>
              <Link to="/activities/defence-security" className="block text-sm text-gray-600 hover:text-black transition-colors">
                Defence & Security
              </Link>
              <Link to="/activities/legal-financing" className="block text-sm text-gray-600 hover:text-black transition-colors">
                Legal & Financing
              </Link>
              <Link to="/blog" className="block text-sm text-gray-600 hover:text-black transition-colors">
                Blog
              </Link>
              <Link to="/contact" className="block text-sm text-gray-600 hover:text-black transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-auto pt-8">
          <div className="w-full h-px bg-gray-600 mb-8"></div>
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">
              © 2025 Triada Trade. All rights reserved.
            </div>
            <div className="text-xs text-gray-500">
              SITE CREDIT
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
