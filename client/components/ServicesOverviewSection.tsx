import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ServicesOverviewSection() {
  const services = [
    {
      title: "Office of Trade Representatives",
      description: "Expert guidance through bureaucracy with established network and strategic communications.",
      features: ["Partner Identification", "Technology Validation", "Production Facilities", "Aid Programme Management"],
      link: "/activities/defence-security"
    },
    {
      title: "Export Agency Services",
      description: "Present Ukrainian defence companies and technology in global markets.",
      features: ["Global Market Access", "Partnership Building", "Joint Ventures", "Recognition Building"],
      link: "/activities/defence-security"
    },
    {
      title: "Training & Technical Support",
      description: "Collaboration with veterans and active combatants for comprehensive support.",
      features: ["System Integration", "Testing Services", "Help Desk", "Maintenance & Backups"],
      link: "/activities/defence-security"
    },
    {
      title: "Legal & Financing Services",
      description: "Comprehensive legal, financial, and analytical services for international partnerships.",
      features: ["Due Diligence", "Document Legalization", "IP Protection", "Banking Operations"],
      link: "/activities/legal-financing"
    },
    {
      title: "Press & Consulting",
      description: "Market insights, analytical reports, and OSINT analysis from our expert team.",
      features: ["Weekly Digests", "Market Analysis", "OSINT Reports", "Strategic Intelligence"],
      link: "/activities/legal-financing"
    },
    {
      title: "Partnership Facilitation",
      description: "Connect international companies with Ukrainian defence ecosystem.",
      features: ["Stakeholder Access", "Regulatory Guidance", "Cultural Bridge", "Risk Mitigation"],
      link: "/partners"
    }
  ];

  return (
    <section className="w-full py-20 bg-scout-card-bg">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-6">
              Comprehensive Defence Solutions
            </h2>
            <p className="text-lg md:text-xl text-scout-text-muted max-w-3xl mx-auto">
              From strategic partnerships to technical implementation, we provide end-to-end support for defence industry collaboration in Ukraine.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-8 hover:border-triada-silver/50 transition-all duration-200 group">
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-triada-silver transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-triada-silver rounded-full mr-3 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to={service.link}>
                  <Button variant="outline" className="w-full border-border text-foreground hover:bg-triada-silver hover:text-triada-black hover:border-triada-silver transition-all duration-200">
                    Learn More
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
