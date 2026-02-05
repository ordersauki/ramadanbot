'use client';

export default function PrivacyPolicy() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#F4D03F] to-[#C9A961]">
            Privacy Policy
          </h1>
          <p className="text-gray-400">Last updated: February 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-200 leading-relaxed">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-[#F4D03F] mb-4">1. Introduction</h2>
            <p>
              Welcome to Ramadan Bot ("we," "us," "our," or "Application"). We are committed to protecting your privacy and ensuring you have a positive experience on our platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application and website.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-[#F4D03F] mb-4">2. Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-[#C9A961] mb-2">2.1 User-Provided Information</h3>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li><strong>PIN/Authentication:</strong> Your personal identification number (PIN) for accessing the application</li>
                  <li><strong>User Name:</strong> Your display name used in generated flyers</li>
                  <li><strong>Generated Content:</strong> Ramadan reflections, flyer images, and personal data embedded in flyers</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#C9A961] mb-2">2.2 Automatically Collected Information</h3>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li><strong>Device Information:</strong> Device type, operating system, unique device identifiers</li>
                  <li><strong>Usage Data:</strong> Application interaction logs, flyer generation events, download timestamps</li>
                  <li><strong>IP Address:</strong> Your IP address for security and analytics purposes</li>
                  <li><strong>Cookies & Similar Technologies:</strong> Local storage for session management and preferences</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#C9A961] mb-2">2.3 Third-Party Services</h3>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li><strong>Google Gemini API:</strong> We send your flyer requests to Google's Gemini API to generate reflections</li>
                  <li><strong>Analytics:</strong> We may use analytics services to understand usage patterns</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Use of Information */}
          <section>
            <h2 className="text-2xl font-bold text-[#F4D03F] mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-3 ml-2">
              <li>To generate personalized Ramadan reflections and flyers</li>
              <li>To maintain your user account and track generation quotas</li>
              <li>To enforce rate limiting and prevent abuse</li>
              <li>To improve our application features and user experience</li>
              <li>To send you important updates about the application</li>
              <li>To troubleshoot technical issues and debug problems</li>
              <li>To comply with legal obligations and protect our rights</li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-[#F4D03F] mb-4">4. Data Sharing and Disclosure</h2>
            <div className="space-y-4">
              <p>
                <strong>We do not sell your personal data.</strong> However, we may share information in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong>Third-Party Service Providers:</strong> Google Gemini API, database providers, hosting services</li>
                <li><strong>Legal Requirements:</strong> When required by law, court orders, or government authorities</li>
                <li><strong>Administrators:</strong> An admin dashboard allows designated administrators to view user generation history (secure access only)</li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-[#F4D03F] mb-4">5. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your information, including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-4">
              <li>Secure HTTPS/TLS encryption for all data in transit</li>
              <li>PIN-based authentication for account access</li>
              <li>Database encryption and secure storage practices</li>
              <li>Regular security reviews and updates</li>
            </ul>
            <p className="mt-4">
              However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee absolute security.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-[#F4D03F] mb-4">6. Data Retention</h2>
            <p>
              We retain your information for as long as your account is active or as needed to provide you services. You can request deletion of your account and associated data at any time. Generated flyers and history may be retained for administrative and analytics purposes but will be anonymized when possible.
            </p>
          </section>

          {/* User Rights */}
          <section>
            <h2 className="text-2xl font-bold text-[#F4D03F] mb-4">7. Your Rights and Choices</h2>
            <ul className="list-disc list-inside space-y-3 ml-2">
              <li><strong>Access:</strong> You can view your generation history through the History feature in the application</li>
              <li><strong>Modify:</strong> You can update your display name and preferences in Settings</li>
              <li><strong>Delete:</strong> You can request account deletion by contacting our support team</li>
              <li><strong>Opt-Out:</strong> You can disable analytics or decline optional features</li>
              <li><strong>Consent Withdrawal:</strong> You may withdraw consent for specific data uses</li>
            </ul>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-[#F4D03F] mb-4">8. Children's Privacy</h2>
            <p>
              Our application is intended for general audiences but not specifically targeted at children under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will promptly delete it. Parents or guardians who believe their child has provided information to us should contact us immediately.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-2xl font-bold text-[#F4D03F] mb-4">9. Third-Party Links and Services</h2>
            <p>
              Our application integrates with Google Gemini API and other third-party services. This Privacy Policy does not apply to third-party services, and we are not responsible for their privacy practices. We encourage you to review the privacy policies of any third-party services you access through our application.
            </p>
          </section>

          {/* Policy Changes */}
          <section>
            <h2 className="text-2xl font-bold text-[#F4D03F] mb-4">10. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we do, we will notify you by updating the "Last updated" date at the top of this page. Your continued use of the application following any changes constitutes your acceptance of the new Privacy Policy.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-[#F4D03F] mb-4">11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, your personal information, or our privacy practices, please contact us:
            </p>
            <div className="mt-4 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
              <p><strong>Email:</strong> support@ramadanbot.vercel.app</p>
              <p><strong>Website:</strong> www.ramadanbot.vercel.app</p>
              <p className="mt-4 text-sm text-gray-400">
                We will respond to your inquiry within 30 days.
              </p>
            </div>
          </section>

          {/* Compliance */}
          <section>
            <h2 className="text-2xl font-bold text-[#F4D03F] mb-4">12. Compliance</h2>
            <p>
              This Privacy Policy complies with:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-4">
              <li>Google Play Store Privacy Requirements</li>
              <li>GDPR (General Data Protection Regulation) principles where applicable</li>
              <li>CCPA (California Consumer Privacy Act) standards</li>
              <li>Industry best practices for data privacy and security</li>
            </ul>
          </section>

          {/* Disclaimer */}
          <section className="mt-12 p-6 bg-blue-900/30 rounded-lg border border-blue-700">
            <p className="text-sm text-blue-200">
              <strong>Disclaimer:</strong> This application is provided for personal use during Ramadan. While we strive to provide accurate content, we do not guarantee the absolute correctness or completeness of generated reflections. Users should consult religious scholars for authentic Islamic guidance.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p className="text-sm">
            © 2026 Ramadan Bot. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
