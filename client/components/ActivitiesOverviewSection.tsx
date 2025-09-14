import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ActivitiesOverviewSection() {
  return (
    <section className="w-full py-20 bg-scout-dark">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-6">
              Our Activities
            </h2>
            <p className="text-lg md:text-xl text-scout-text-muted max-w-3xl mx-auto">
              Comprehensive defence industry solutions spanning from strategic partnerships to technical implementation and legal support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Defence & Security */}
            <div className="bg-card border border-border rounded-lg p-8 hover:border-triada-silver/50 transition-all duration-200">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Defence & Security
                </h3>
                <p className="text-muted-foreground mb-6">
                  Facilitating defence-industry cooperation between Ukraine and Western allies through comprehensive support services.
                </p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-triada-silver rounded-full mt-3 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Office of Trade Representatives (OTR)</h4>
                    <p className="text-sm text-muted-foreground">Partner identification, technology validation, and production facility establishment</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-triada-silver rounded-full mt-3 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Triada Export Agency</h4>
                    <p className="text-sm text-muted-foreground">Global market presentation and partnership building</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-triada-silver rounded-full mt-3 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Training & Technical Support</h4>
                    <p className="text-sm text-muted-foreground">System integration, testing, and veteran collaboration</p>
                  </div>
                </div>
              </div>

              <Link to="/activities/defence-security">
                <Button className="w-full bg-triada-silver hover:bg-triada-silver/90 text-triada-black font-semibold">
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Legal, Financing & Consulting */}
            <div className="bg-card border border-border rounded-lg p-8 hover:border-triada-silver/50 transition-all duration-200">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Legal, Financing & Consulting
                </h3>
                <p className="text-muted-foreground mb-6">
                  Expert legal, financial, and analytical services to support international defence partnerships.
                </p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-triada-silver rounded-full mt-3 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Legal & Financing Services</h4>
                    <p className="text-sm text-muted-foreground">Due diligence, document legalization, and IP protection</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-triada-silver rounded-full mt-3 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Press & Consulting</h4>
                    <p className="text-sm text-muted-foreground">Market insights, analytical reports, and OSINT analysis</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-triada-silver rounded-full mt-3 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">International Banking</h4>
                    <p className="text-sm text-muted-foreground">Banking operations and financial instruments guidance</p>
                  </div>
                </div>
              </div>

              <Link to="/activities/legal-financing">
                <Button className="w-full bg-triada-silver hover:bg-triada-silver/90 text-triada-black font-semibold">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
