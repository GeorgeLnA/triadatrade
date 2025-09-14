import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function PartnersPreviewSection() {
  const partners = [
    { name: "Octava Capital", category: "Investment" },
    { name: "Kord Defence", category: "Defence Technology" },
    { name: "Ecovis Bondar & Bondar", category: "Legal Services" },
    { name: "Avalor.AI", category: "AI Solutions" },
    { name: "InterProInvest", category: "Investment" },
    { name: "NAUDI", category: "Defence Association" }
  ];

  const stakeholders = [
    "Ministry of Defense of Ukraine",
    "General Staff of the Armed Forces",
    "UAV Forces Command",
    "Special Operations Forces"
  ];

  return (
    <section className="w-full py-20 bg-scout-dark">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-6">
              Trusted by Industry Leaders
            </h2>
            <p className="text-lg md:text-xl text-scout-text-muted max-w-3xl mx-auto">
              We work with leading organizations across the defence sector, government, and private industry to deliver exceptional results.
            </p>
          </div>

          {/* Partners Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {partners.map((partner, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6 hover:border-triada-silver/50 transition-all duration-200">
                <h3 className="text-xl font-bold text-foreground mb-2">{partner.name}</h3>
                <p className="text-muted-foreground text-sm">{partner.category}</p>
              </div>
            ))}
          </div>

          {/* Strategic Stakeholders */}
          <div className="bg-card border border-border rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Strategic Defence Stakeholders</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {stakeholders.map((stakeholder, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-triada-silver rounded-full mr-4 flex-shrink-0" />
                  <span className="text-muted-foreground">{stakeholder}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link to="/partners">
              <Button size="lg" className="bg-triada-silver hover:bg-triada-silver/90 text-triada-black font-semibold px-8 py-4">
                View All Partners
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
