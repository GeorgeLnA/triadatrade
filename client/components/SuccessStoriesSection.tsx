export default function SuccessStoriesSection() {
  const testimonials = [
    {
      quote: "Triada Trade's expertise in navigating the Ukrainian defence sector has been invaluable to our expansion efforts. Their local knowledge and network access accelerated our market entry significantly.",
      author: "Sarah Mitchell",
      role: "VP of International Operations",
      company: "Global Defence Solutions"
    },
    {
      quote: "The OTR services provided by Triada Trade streamlined our regulatory processes and helped us establish production facilities in record time. Their support was crucial to our success.",
      author: "Dr. Michael Chen",
      role: "Director of Technology",
      company: "Advanced Systems Corp"
    },
    {
      quote: "Working with Triada Trade opened doors we never knew existed. Their comprehensive approach to partnership facilitation made all the difference in our Ukrainian operations.",
      author: "Elena Volkov",
      role: "Business Development Manager",
      company: "International Defence Partners"
    }
  ];

  const achievements = [
    { number: "25+", label: "Successful Market Entries" },
    { number: "150+", label: "Partnerships Facilitated" },
    { number: "€50M+", label: "Investment Attracted" },
    { number: "95%", label: "Client Retention Rate" }
  ];

  return (
    <section className="w-full py-20 bg-scout-card-bg">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-6">
              Success Stories
            </h2>
            <p className="text-lg md:text-xl text-scout-text-muted max-w-3xl mx-auto">
              Hear from our partners about how Triada Trade has helped them succeed in the Ukrainian defence market.
            </p>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-8">
                <div className="mb-6">
                  <svg className="w-8 h-8 text-triada-silver mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                  <p className="text-muted-foreground italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <h4 className="text-foreground font-semibold">{testimonial.author}</h4>
                  <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                  <p className="text-triada-silver text-sm font-medium">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Achievement Stats */}
          <div className="bg-card border border-border rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Our Impact</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-triada-silver mb-2">{achievement.number}</div>
                  <div className="text-muted-foreground text-sm">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Value Proposition */}
          <div className="text-center">
            <div className="bg-card border border-border rounded-lg p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready to Write Your Success Story?
              </h3>
              <p className="text-muted-foreground mb-6">
                Join the growing number of international companies that have successfully entered the Ukrainian defence market with our support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="bg-triada-silver hover:bg-triada-silver/90 text-triada-black font-semibold px-8 py-4 rounded-lg transition-all duration-200">
                  Start Your Journey
                </a>
                <a href="/activities/defence-security" className="border border-border text-foreground hover:bg-card px-8 py-4 rounded-lg transition-all duration-200">
                  Explore Our Services
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
