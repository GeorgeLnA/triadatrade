import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md border-b border-border">
      <div className="container mx-auto h-20 flex items-center justify-between">
        {/* Triada Trade Logo */}
        <a href="/" className="flex items-center transition-opacity hover:opacity-80" style={{ marginLeft: '5px' }}>
          <img src="/logo_menu.png" alt="Triada Trade" className="h-12 w-auto" />
        </a>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
          <a href="/who-we-are" className="text-base text-foreground hover:text-triada-silver transition-colors duration-200 px-3 py-2">
            Who we are
          </a>
          <div className="relative group">
            <button className="text-base text-foreground hover:text-triada-silver transition-colors duration-200 flex items-center gap-1 px-3 py-2">
              Activities
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                <a href="/activities/defence-security" className="block px-4 py-3 text-base text-foreground hover:bg-muted transition-colors">
                  Defence & Security
                </a>
                <a href="/activities/legal-financing" className="block px-4 py-3 text-base text-foreground hover:bg-muted transition-colors">
                  Legal, Financing & Consulting
                </a>
              </div>
            </div>
          </div>
          <a href="/partners" className="text-base text-foreground hover:text-triada-silver transition-colors duration-200 px-3 py-2">
            Partners
          </a>
          <a href="/team" className="text-base text-foreground hover:text-triada-silver transition-colors duration-200 px-3 py-2">
            Our Team
          </a>
          <a href="/blog" className="text-base text-foreground hover:text-triada-silver transition-colors duration-200 px-3 py-2">
            Blog
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground hover:text-triada-silver transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        {/* Contact CTA */}
        <a href="/contact" className="hidden md:block text-base text-foreground hover:text-triada-silver transition-colors duration-200 px-3 py-2">
          Contact us
        </a>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border">
          <nav className="container mx-auto py-6 space-y-4">
            <a href="/who-we-are" className="block text-sm text-foreground hover:text-triada-silver transition-colors duration-200">
              Who we are
            </a>
            <div className="space-y-2">
              <div className="text-sm font-medium text-foreground">Activities</div>
              <a href="/activities/defence-security" className="block pl-4 text-sm text-foreground hover:text-triada-silver transition-colors duration-200">
                Defence & Security
              </a>
              <a href="/activities/legal-financing" className="block pl-4 text-sm text-foreground hover:text-triada-silver transition-colors duration-200">
                Legal, Financing & Consulting
              </a>
            </div>
            <a href="/partners" className="block text-sm text-foreground hover:text-triada-silver transition-colors duration-200">
              Partners
            </a>
            <a href="/team" className="block text-sm text-foreground hover:text-triada-silver transition-colors duration-200">
              Our Team
            </a>
            <a href="/blog" className="block text-sm text-foreground hover:text-triada-silver transition-colors duration-200">
              Blog
            </a>
            <a href="/contact" className="block text-sm text-foreground hover:text-triada-silver transition-colors duration-200">
              Contact
            </a>
            <Button
              variant="ghost"
              className="w-full justify-start text-sm text-foreground hover:bg-triada-silver hover:text-triada-black transition-all duration-200 rounded-md"
            >
              Contact us
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
