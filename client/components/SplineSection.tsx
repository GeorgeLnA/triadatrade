import Spline from '@splinetool/react-spline';

export default function SplineSection() {
  return (
    <section className="w-full py-20 bg-scout-dark">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-8 font-teko">
              3D INTERACTIVE EXPERIENCE
            </h2>
            <p className="text-lg text-scout-text-muted max-w-3xl mx-auto font-metropolis">
              Explore our interactive 3D visualization to better understand our capabilities and services.
            </p>
          </div>
          
          <div className="relative w-full h-[600px] bg-scout-card-bg border border-scout-border rounded-lg overflow-hidden">
            <Spline scene="https://prod.spline.design/7gdOxUyfoiRoqT9h/scene.splinecode" />
          </div>
        </div>
      </div>
    </section>
  );
}
