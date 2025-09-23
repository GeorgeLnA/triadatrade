export default function QuoteSection() {
  return (
    <section className="w-full py-16 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-lg md:text-xl text-scout-text-white/90 italic mb-2">
            "As the security landscape continues to evolve… the opportunities for international defense companies to expand their footprint in [Ukraine] are significant."
          </blockquote>
          <cite className="text-sm text-scout-text-muted">
            — Marie-Pierre Raymond, Defence Scientist, Innovation Portfolio Manager, DRDC
          </cite>
        </div>
      </div>
    </section>
  );
}
