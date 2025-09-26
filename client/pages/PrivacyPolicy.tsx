import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="w-full min-h-screen bg-scout-dark text-scout-text-primary overflow-x-hidden">
      <Header />
      
      <main className="w-full pt-[72px]">
        {/* Hero Section */}
        <section className="w-full py-20 bg-scout-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-scout-text-white mb-8 font-teko">
                PRIVACY POLICY
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
                <h2 className="text-3xl font-bold text-scout-text-white mb-6 font-teko">1. INTRODUCTION</h2>
                <p className="text-scout-text-muted font-metropolis mb-8">
                  Triada Trade ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>

                <h2 className="text-3xl font-bold text-scout-text-white mb-6 font-teko">2. INFORMATION WE COLLECT</h2>
                <h3 className="text-xl font-bold text-scout-text-white mb-4 font-teko">2.1 PERSONAL INFORMATION</h3>
                <p className="text-scout-text-muted font-metropolis mb-4">
                  We may collect personal information that you voluntarily provide to us, including:
                </p>
                <ul className="list-disc list-inside text-scout-text-muted font-metropolis mb-8 space-y-2">
                  <li>Name and contact information (email address, phone number, mailing address)</li>
                  <li>Company information and job title</li>
                  <li>Communication preferences</li>
                  <li>Any other information you choose to provide</li>
                </ul>

                <h3 className="text-xl font-bold text-scout-text-white mb-4 font-teko">2.2 AUTOMATICALLY COLLECTED INFORMATION</h3>
                <p className="text-scout-text-muted font-metropolis mb-4">
                  We may automatically collect certain information about your device and usage patterns, including:
                </p>
                <ul className="list-disc list-inside text-scout-text-muted font-metropolis mb-8 space-y-2">
                  <li>IP address and device identifiers</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited and time spent on our website</li>
                  <li>Referring website information</li>
                </ul>

                <h2 className="text-3xl font-bold text-scout-text-white mb-6 font-teko">3. HOW WE USE YOUR INFORMATION</h2>
                <p className="text-scout-text-muted font-metropolis mb-4">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="list-disc list-inside text-scout-text-muted font-metropolis mb-8 space-y-2">
                  <li>Providing and improving our services</li>
                  <li>Responding to your inquiries and requests</li>
                  <li>Communicating with you about our services</li>
                  <li>Analyzing website usage and trends</li>
                  <li>Complying with legal obligations</li>
                  <li>Protecting our rights and interests</li>
                </ul>

                <h2 className="text-3xl font-bold text-scout-text-white mb-6 font-teko">4. INFORMATION SHARING AND DISCLOSURE</h2>
                <p className="text-scout-text-muted font-metropolis mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-scout-text-muted font-metropolis mb-8 space-y-2">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and interests</li>
                  <li>In connection with a business transfer or merger</li>
                  <li>With trusted service providers who assist us in operating our website and conducting our business</li>
                </ul>

                <h2 className="text-3xl font-bold text-scout-text-white mb-6 font-teko">5. DATA SECURITY</h2>
                <p className="text-scout-text-muted font-metropolis mb-8">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
                </p>

                <h2 className="text-3xl font-bold text-scout-text-white mb-6 font-teko">6. DATA RETENTION</h2>
                <p className="text-scout-text-muted font-metropolis mb-8">
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                </p>

                <h2 className="text-3xl font-bold text-scout-text-white mb-6 font-teko">7. YOUR RIGHTS</h2>
                <p className="text-scout-text-muted font-metropolis mb-4">
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc list-inside text-scout-text-muted font-metropolis mb-8 space-y-2">
                  <li>The right to access your personal information</li>
                  <li>The right to correct inaccurate information</li>
                  <li>The right to delete your personal information</li>
                  <li>The right to restrict processing of your information</li>
                  <li>The right to data portability</li>
                  <li>The right to object to processing</li>
                </ul>

                <h2 className="text-3xl font-bold text-scout-text-white mb-6 font-teko">8. COOKIES AND TRACKING TECHNOLOGIES</h2>
                <p className="text-scout-text-muted font-metropolis mb-8">
                  We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences.
                </p>

                <h2 className="text-3xl font-bold text-scout-text-white mb-6 font-teko">9. THIRD-PARTY LINKS</h2>
                <p className="text-scout-text-muted font-metropolis mb-8">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review their privacy policies.
                </p>

                <h2 className="text-3xl font-bold text-scout-text-white mb-6 font-teko">10. INTERNATIONAL DATA TRANSFERS</h2>
                <p className="text-scout-text-muted font-metropolis mb-8">
                  Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
                </p>

                <h2 className="text-3xl font-bold text-scout-text-white mb-6 font-teko">11. CHANGES TO THIS PRIVACY POLICY</h2>
                <p className="text-scout-text-muted font-metropolis mb-8">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>

                <h2 className="text-3xl font-bold text-scout-text-white mb-6 font-teko">12. CONTACT US</h2>
                <p className="text-scout-text-muted font-metropolis mb-4">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
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







