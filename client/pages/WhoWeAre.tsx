import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function WhoWeAre() {
  return (
    <div className="w-full min-h-screen" style={{backgroundColor: '#0a1628'}}>
      <Header />
      
      <main className="w-full pt-[72px]">
        {/* Hero Section */}
        <section className="w-full py-20" style={{backgroundColor: '#0a1628'}}>
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-scout-text-white mb-8 font-teko">
                WHO WE ARE
              </h1>
              <p className="text-xl md:text-2xl text-scout-text-muted leading-relaxed">
                Triada Trade is a defence-sector advisory and delivery partner focused on Ukraine. We combine a collaborative operating model with a deep network across public and private stakeholders to move fast on complex initiatives—while upholding strict standards of ethics, transparency, and trust.
              </p>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />

        {/* Values Section */}
        <section className="w-full py-20" style={{backgroundColor: '#0a1628'}}>
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-16 text-center font-teko">
                OUR VALUES
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-scout-green rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-scout-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-scout-text-white mb-4 font-teko">ETHICS</h3>
                  <p className="text-scout-text-muted">
                    Upholding the highest standards of integrity and ethical conduct in all our partnerships and operations.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-scout-green rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-scout-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-scout-text-white mb-4 font-teko">TRANSPARENCY</h3>
                  <p className="text-scout-text-muted">
                    Maintaining clear, open communication and transparent processes throughout all our engagements.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-scout-green rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-scout-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-scout-text-white mb-4 font-teko">TRUST</h3>
                  <p className="text-scout-text-muted">
                    Building lasting relationships based on mutual trust, reliability, and consistent delivery of results.
                  </p>
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







