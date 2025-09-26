import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  return (
    <div className="w-full min-h-screen bg-scout-dark text-scout-text-primary overflow-x-hidden">
      <Header />
      
      <main className="w-full pt-[72px]">
        {/* Hero Section */}
        <section className="w-full py-20 bg-scout-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-scout-text-white mb-8 font-teko">
                TERMS OF SERVICE
              </h1>
              <p className="text-xl md:text-2xl text-scout-text-muted font-metropolis leading-relaxed">
                Last updated: January 2025
              </p>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />

        {/* Content Section */}
        <section className="w-full py-20 bg-scout-card-bg">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-invert max-w-none">
                <h2 className="text-3xl font-bold text-scout-text-white mb-6 font-teko">1. ACCEPTANCE OF TERMS</h2>
                <p className="text-scout-text-muted font-metropolis mb-8">
                  By accessing and using the Triada Trade website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>

                <h2 className="text-3xl font-bold text-scout-text-white mb-6 font-teko">2. DESCRIPTION OF SERVICE</h2>
                <p className="text-scout-text-muted font-metropolis mb-4">
                  Triada Trade provides defence-sector advisory and delivery services focused on Ukraine, including:
                </p>
                <ul className="list-disc list-inside text-scout-text-muted font-metropolis mb-8 space-y-2">
                  <li>Office of Trade Representatives (OTR) services</li>
                  <li>Triada Export Agency services</li>
                  <li>Training, System Integration & Technical Support</li>
                  <li>Legal, Financing & Consulting services</li>
                  <li>Press & Consulting services</li>
                  <li>OSINT & Open-Source Analysis</li>
                </ul>

                <h2 className="text-3xl font-bold text-scout-text-white mb-6 font-teko">3. USE LICENSE</h2>
                <p className="text-scout-text-muted font-metropolis mb-4">
                  Permission is granted to temporarily download one copy of the materials on Triada Trade's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside text-scout-text-muted font-metropolis mb-8 space-y-2">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>

                <h2 className="text-3xl font-bold text-scout-text-white mb-6 font-teko">4. DISCLAIMER</h2>
                <p className="text-scout-text-muted font-metropolis mb-8">
                  The materials on Triada Trade's website are provided on an 'as is' basis. Triada Trade makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>

                <h2 className="text-3xl font-bold text-scout-text-white mb-6 font-teko">5. LIMITATIONS</h2>
                <p className="text-scout-text-muted font-metropolis mb-8">
                  In no event shall Triada Trade or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Triada Trade's website, even if Triada Trade or a Triada Trade authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
                </p>

                <h2 className="text-3xl font-bold text-scout-text-white mb-6 font-teko">6. ACCURACY OF MATERIALS</h2>
                <p className="text-scout-text-muted font-metropolis mb-8">
                  The materials appearing on Triada Trade's website could include technical, typographical, or photographic errors. Triada Trade does not warrant that any of the materials on its website are accurate, complete, or current. Triada Trade may make changes to the materials contained on its website at any time without notice. However, Triada Trade does not make any commitment to update the materials.
                </p>

                <h2 className="text-3xl font-bold text-scout-text-white mb-6 font-teko">7. LINKS</h2>
                <p className="text-scout-text-muted font-metropolis mb-8">
                  Triada Trade has not reviewed all of the sites linked to our website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Triada Trade of the site. Use of any such linked website is at the user's own risk.
                </p>

                <h2 className="text-3xl font-bold text-scout-text-white mb-6 font-teko">8. MODIFICATIONS</h2>
                <p className="text-scout-text-muted font-metropolis mb-8">
                  Triada Trade may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
                </p>

                <h2 className="text-3xl font-bold text-scout-text-white mb-6 font-teko">9. GOVERNING LAW</h2>
                <p className="text-scout-text-muted font-metropolis mb-8">
                  These terms and conditions are governed by and construed in accordance with the laws of Ukraine and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
                </p>

                <h2 className="text-3xl font-bold text-scout-text-white mb-6 font-teko">10. CONFIDENTIALITY</h2>
                <p className="text-scout-text-muted font-metropolis mb-4">
                  In the course of providing our services, we may have access to confidential information. We agree to:
                </p>
                <ul className="list-disc list-inside text-scout-text-muted font-metropolis mb-8 space-y-2">
                  <li>Maintain strict confidentiality of all client information</li>
                  <li>Use confidential information only for the purpose of providing our services</li>
                  <li>Not disclose confidential information to third parties without written consent</li>
                  <li>Implement appropriate security measures to protect confidential information</li>
                </ul>

                <h2 className="text-3xl font-bold text-scout-text-white mb-6 font-teko">11. COMPLIANCE AND ETHICS</h2>
                <p className="text-scout-text-muted font-metropolis mb-4">
                  All services are provided in compliance with applicable laws and regulations, including:
                </p>
                <ul className="list-disc list-inside text-scout-text-muted font-metropolis mb-8 space-y-2">
                  <li>Ukrainian laws and regulations</li>
                  <li>International trade and export control laws</li>
                  <li>Anti-corruption and anti-bribery laws</li>
                  <li>Data protection and privacy laws</li>
                </ul>

                <h2 className="text-3xl font-bold text-scout-text-white mb-6 font-teko">12. FORCE MAJEURE</h2>
                <p className="text-scout-text-muted font-metropolis mb-8">
                  Triada Trade shall not be liable for any failure or delay in performance under these terms which is due to fire, flood, earthquake, elements of nature or acts of God, acts of war, terrorism, strikes, labor disputes, or any other cause which is beyond the reasonable control of Triada Trade.
                </p>

                <h2 className="text-3xl font-bold text-scout-text-white mb-6 font-teko">13. SEVERABILITY</h2>
                <p className="text-scout-text-muted font-metropolis mb-8">
                  If any provision of these terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these terms will otherwise remain in full force and effect and enforceable.
                </p>

                <h2 className="text-3xl font-bold text-scout-text-white mb-6 font-teko">14. CONTACT INFORMATION</h2>
                <p className="text-scout-text-muted font-metropolis mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-scout-dark border border-scout-border rounded-lg p-6">
                  <p className="text-scout-text-white mb-2"><strong>Email:</strong> info@triada-trade.com</p>
                  <p className="text-scout-text-white mb-2"><strong>Phone:</strong> +380-97-126-5663</p>
                  <p className="text-scout-text-white">
                    <strong>Address:</strong> 01032, Saksahanskoho St 38, Kyiv, Ukraine
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







