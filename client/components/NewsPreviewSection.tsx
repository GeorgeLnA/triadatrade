import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NewsPreviewSection() {
  const blogPosts = [
    {
      title: "Ukraine Defence Market: Opportunities and Challenges in 2025",
      excerpt: "An in-depth analysis of the current state of Ukraine's defence industry and emerging opportunities for international partners.",
      category: "Market Analysis",
      readTime: "5 min read"
    },
    {
      title: "Navigating Ukrainian Defence Regulations: A Complete Guide",
      excerpt: "Everything international companies need to know about regulatory compliance and legal requirements in Ukraine.",
      category: "Legal & Regulatory",
      readTime: "8 min read"
    },
    {
      title: "Partnership Success: How We Facilitated a Major Joint Venture",
      excerpt: "Case study of a successful partnership between a European defence company and Ukrainian manufacturer.",
      category: "Success Stories",
      readTime: "6 min read"
    }
  ];

  const topics = [
    "Defence Industry Analysis",
    "Ukraine Market Insights", 
    "Partnership Success Stories",
    "Technology Updates",
    "Legal & Regulatory",
    "OSINT Analysis"
  ];

  return (
    <section className="w-full py-20 bg-scout-dark">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-6">
              Latest Insights & Analysis
            </h2>
            <p className="text-lg md:text-xl text-scout-text-muted max-w-3xl mx-auto">
              Stay informed with our expert analysis, market insights, and industry updates from the Ukrainian defence sector.
            </p>
          </div>

          {/* Featured Blog Posts */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {blogPosts.map((post, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6 hover:border-triada-silver/50 transition-all duration-200 group">
                <div className="mb-4">
                  <span className="inline-block bg-triada-silver text-triada-black text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-triada-silver transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-xs">{post.readTime}</span>
                    <svg className="w-4 h-4 text-triada-silver" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Topics We Cover */}
          <div className="bg-card border border-border rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Topics We Cover</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {topics.map((topic, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-triada-silver rounded-full mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-card border border-border rounded-lg p-8 mb-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">Stay Updated</h3>
              <p className="text-muted-foreground mb-6">
                Subscribe to our weekly digest for the latest defence industry insights and market analysis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-triada-silver"
                />
                <Button className="bg-triada-silver hover:bg-triada-silver/90 text-triada-black font-semibold px-6 py-3">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link to="/blog">
              <Button size="lg" className="bg-triada-silver hover:bg-triada-silver/90 text-triada-black font-semibold px-8 py-4">
                Read All Articles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
