import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function TeamPreviewSection() {
  const leadership = [
    { name: "Yaroslav Yakymov", role: "Chief Executive Officer", initials: "YY" },
    { name: "Marsel Nikitin", role: "Chief Revenue Officer", initials: "MN" },
    { name: "Natali Boychenko", role: "Financial Director", initials: "NB" },
    { name: "Oleg Pryimenko", role: "UAV Expert & Chief of Operations", initials: "OP" }
  ];

  const stats = [
    { number: "10+", label: "Years Combined Experience" },
    { number: "50+", label: "Successful Partnerships" },
    { number: "15+", label: "Team Members" },
    { number: "100%", label: "Client Satisfaction" }
  ];

  return (
    <section className="w-full py-20 bg-scout-dark">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-6">
              Meet Our Expert Team
            </h2>
            <p className="text-lg md:text-xl text-scout-text-muted max-w-3xl mx-auto">
              Led by experienced professionals with deep expertise in defence industry, international partnerships, and Ukrainian market dynamics.
            </p>
          </div>

          {/* Leadership Team */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {leadership.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-triada-silver rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  <span className="text-2xl font-bold text-triada-black">{member.initials}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-triada-silver mb-2">{stat.number}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Team Values */}
          <div className="bg-card border border-border rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Our Core Values</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-triada-silver rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-triada-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">Ethics</h4>
                <p className="text-muted-foreground text-sm">Upholding the highest standards of integrity and ethical conduct</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-triada-silver rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-triada-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">Transparency</h4>
                <p className="text-muted-foreground text-sm">Clear, open communication and transparent processes</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-triada-silver rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-triada-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">Trust</h4>
                <p className="text-muted-foreground text-sm">Building lasting relationships based on mutual trust</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link to="/team">
              <Button size="lg" className="bg-triada-silver hover:bg-triada-silver/90 text-triada-black font-semibold px-8 py-4">
                Meet the Full Team
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
