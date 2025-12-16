import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useLoading } from "@/App";

export default function TermsOfService() {
  const { setHeroAnimationsComplete } = useLoading();

  useEffect(() => {
    setHeroAnimationsComplete(true);
    return () => {
      setHeroAnimationsComplete(false);
    };
  }, [setHeroAnimationsComplete]);

  return (
    <div className="w-full min-h-screen bg-white text-black">
      <Header staticFinal />
      
      <main className="w-full" style={{ 
        marginLeft: "clamp(1rem, 4vw, 70px)",
        marginRight: "clamp(1rem, 4vw, 70px)",
        maxWidth: "calc(100vw - clamp(2rem, 8vw, 140px))",
        paddingTop: "clamp(4rem, 8vw, 8rem)",
        paddingBottom: "clamp(4rem, 8vw, 8rem)"
      }}>
        <div className="max-w-4xl mx-auto">
          <h1 className="font-teko text-4xl md:text-5xl lg:text-6xl uppercase mb-8 md:mb-12">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg max-w-none font-metropolis space-y-6">
            <section>
              <h2 className="font-teko text-2xl md:text-3xl uppercase mt-8 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="font-teko text-2xl md:text-3xl uppercase mt-8 mb-4">2. Use License</h2>
              <p className="text-gray-700 leading-relaxed">
                Permission is granted to temporarily download one copy of the materials on Triada Trade's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section>
              <h2 className="font-teko text-2xl md:text-3xl uppercase mt-8 mb-4">3. Disclaimer</h2>
              <p className="text-gray-700 leading-relaxed">
                The materials on Triada Trade's website are provided on an 'as is' basis. Triada Trade makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="font-teko text-2xl md:text-3xl uppercase mt-8 mb-4">4. Limitations</h2>
              <p className="text-gray-700 leading-relaxed">
                In no event shall Triada Trade or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Triada Trade's website, even if Triada Trade or a Triada Trade authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="font-teko text-2xl md:text-3xl uppercase mt-8 mb-4">5. Accuracy of Materials</h2>
              <p className="text-gray-700 leading-relaxed">
                The materials appearing on Triada Trade's website could include technical, typographical, or photographic errors. Triada Trade does not warrant that any of the materials on its website are accurate, complete, or current. Triada Trade may make changes to the materials contained on its website at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="font-teko text-2xl md:text-3xl uppercase mt-8 mb-4">6. Links</h2>
              <p className="text-gray-700 leading-relaxed">
                Triada Trade has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Triada Trade of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="font-teko text-2xl md:text-3xl uppercase mt-8 mb-4">7. Modifications</h2>
              <p className="text-gray-700 leading-relaxed">
                Triada Trade may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="font-teko text-2xl md:text-3xl uppercase mt-8 mb-4">8. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of Ukraine and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section className="mt-12 pt-8 border-t border-gray-300">
              <p className="text-gray-600 text-sm">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

