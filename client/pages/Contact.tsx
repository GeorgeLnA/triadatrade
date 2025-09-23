import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    request: '',
    callBack: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="w-full min-h-screen bg-scout-dark text-scout-text-primary overflow-x-hidden">
      <Header />
      
      <main className="w-full pt-[72px]">
        {/* Hero Section */}
        <section className="w-full py-20 bg-scout-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-scout-text-white mb-8">
                Contact Us
              </h1>
              <p className="text-xl md:text-2xl text-scout-text-muted leading-relaxed">
                Get in touch with our team to discuss your defence partnership needs and how we can support your initiatives in Ukraine.
              </p>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />

        {/* Contact Information Section */}
        <section className="w-full py-20 bg-scout-card-bg">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Details */}
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-8">
                    Get in Touch
                  </h2>
                  
                  <div className="space-y-8">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-scout-green rounded-lg flex items-center justify-center mr-6 flex-shrink-0">
                        <svg className="w-6 h-6 text-scout-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-scout-text-white mb-2">Address</h3>
                        <p className="text-scout-text-muted">
                          01032, Saksahanskoho St 38<br />
                          Kyiv, Ukraine
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-scout-green rounded-lg flex items-center justify-center mr-6 flex-shrink-0">
                        <svg className="w-6 h-6 text-scout-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-scout-text-white mb-2">Phone</h3>
                        <p className="text-scout-text-muted">+380-97-126-5663</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-scout-green rounded-lg flex items-center justify-center mr-6 flex-shrink-0">
                        <svg className="w-6 h-6 text-scout-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-scout-text-white mb-2">Email</h3>
                        <p className="text-scout-text-muted">info@triada-trade.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-scout-green rounded-lg flex items-center justify-center mr-6 flex-shrink-0">
                        <svg className="w-6 h-6 text-scout-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-scout-text-white mb-2">Social</h3>
                        <div className="flex space-x-4">
                          <a href="#" className="text-scout-text-muted hover:text-scout-green transition-colors">
                            LinkedIn
                          </a>
                          <a href="#" className="text-scout-text-muted hover:text-scout-green transition-colors">
                            Medium
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="bg-scout-dark border border-scout-border rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6">Send us a message</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-scout-text-white mb-2">
                          Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-scout-card-bg border border-scout-border rounded-lg text-scout-text-white placeholder-scout-text-muted focus:outline-none focus:ring-2 focus:ring-scout-green"
                          placeholder="Your full name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-scout-text-white mb-2">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-scout-card-bg border border-scout-border rounded-lg text-scout-text-white placeholder-scout-text-muted focus:outline-none focus:ring-2 focus:ring-scout-green"
                          placeholder="your.email@company.com"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-scout-text-white mb-2">
                          Company
                        </label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-scout-card-bg border border-scout-border rounded-lg text-scout-text-white placeholder-scout-text-muted focus:outline-none focus:ring-2 focus:ring-scout-green"
                          placeholder="Your company name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-scout-text-white mb-2">
                          Phone
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-scout-card-bg border border-scout-border rounded-lg text-scout-text-white placeholder-scout-text-muted focus:outline-none focus:ring-2 focus:ring-scout-green"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="request" className="block text-sm font-medium text-scout-text-white mb-2">
                        Request *
                      </label>
                      <Textarea
                        id="request"
                        name="request"
                        required
                        value={formData.request}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-scout-card-bg border border-scout-border rounded-lg text-scout-text-white placeholder-scout-text-muted focus:outline-none focus:ring-2 focus:ring-scout-green"
                        placeholder="Tell us about your project or partnership needs..."
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="callBack"
                        name="callBack"
                        type="checkbox"
                        checked={formData.callBack}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-scout-green bg-scout-card-bg border-scout-border rounded focus:ring-scout-green focus:ring-2"
                      />
                      <label htmlFor="callBack" className="ml-2 text-sm text-scout-text-muted">
                        Call me back
                      </label>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-scout-green hover:bg-scout-green/90 text-scout-dark font-semibold py-3"
                    >
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />

        {/* Office Hours Section */}
        <section className="w-full py-20 bg-scout-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-8">
                    Office Hours
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-scout-text-muted">Monday - Friday</span>
                      <span className="text-scout-text-white">9:00 AM - 6:00 PM (EET)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-scout-text-muted">Saturday</span>
                      <span className="text-scout-text-white">10:00 AM - 2:00 PM (EET)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-scout-text-muted">Sunday</span>
                      <span className="text-scout-text-white">Closed</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-8">
                    Response Time
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-scout-card-bg border border-scout-border rounded-lg p-6">
                      <h3 className="text-xl font-bold text-scout-text-white mb-2">General Inquiries</h3>
                      <p className="text-scout-text-muted">Within 24 hours during business days</p>
                    </div>
                    <div className="bg-scout-card-bg border border-scout-border rounded-lg p-6">
                      <h3 className="text-xl font-bold text-scout-text-white mb-2">Partnership Proposals</h3>
                      <p className="text-scout-text-muted">Within 48 hours for detailed responses</p>
                    </div>
                    <div className="bg-scout-card-bg border border-scout-border rounded-lg p-6">
                      <h3 className="text-xl font-bold text-scout-text-white mb-2">Urgent Matters</h3>
                      <p className="text-scout-text-muted">Please call directly for immediate assistance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}







