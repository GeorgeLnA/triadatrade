import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ContactCTASection() {
  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Call Us",
      details: "+380-97-126-5663",
      description: "Speak directly with our team"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email Us",
      details: "info@triada-trade.com",
      description: "Send us your inquiry"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Visit Us",
      details: "Kyiv, Ukraine",
      description: "01032, Saksahanskoho St 38"
    }
  ];

  return (
    <section className="w-full py-20 bg-scout-card-bg">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-6">
              Ready to Partner with Us?
            </h2>
            <p className="text-lg md:text-xl text-scout-text-muted max-w-3xl mx-auto">
              Get in touch with our team to discuss your defence partnership needs and discover how we can support your initiatives in Ukraine.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-triada-silver rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                  <div className="text-triada-black">
                    {method.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{method.title}</h3>
                <p className="text-triada-silver font-semibold mb-2">{method.details}</p>
                <p className="text-muted-foreground text-sm">{method.description}</p>
              </div>
            ))}
          </div>

          {/* Office Hours */}
          <div className="bg-card border border-border rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Office Hours</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4">Business Hours</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span className="text-foreground">9:00 AM - 6:00 PM (EET)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="text-foreground">10:00 AM - 2:00 PM (EET)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="text-foreground">Closed</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4">Response Time</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">General Inquiries</span>
                    <span className="text-foreground">Within 24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Partnership Proposals</span>
                    <span className="text-foreground">Within 48 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Urgent Matters</span>
                    <span className="text-foreground">Call directly</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-triada-silver hover:bg-triada-silver/90 text-triada-black font-semibold px-8 py-4">
                  Get in Touch
                </Button>
              </Link>
              <Link to="/activities/defence-security">
                <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-card px-8 py-4">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
