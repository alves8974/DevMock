import React from 'react';
import SEO from '../components/SEO';

const Terms = () => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <SEO
                title="Terms of Use - DevMock"
                description="Terms of Use for DevMock developer tools. Understand your rights and responsibilities when using our password, UUID, and code generators."
                canonical="https://devmock.com/terms"
            />

            <article className="prose prose-slate max-w-none">
                <h1>Terms of Use</h1>
                <p className="text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>

                <h2>1. Acceptance of Terms</h2>
                <p>
                    By accessing and using <strong>DevMock</strong> (the "Service"), you accept and agree to be bound by the terms and provision of this agreement.
                    If you do not agree to abide by these terms, please do not use this Service.
                </p>

                <h2>2. Description of Service</h2>
                <p>
                    DevMock provides a suite of developer utilities including but not limited to Password Generators, UUID Generators, QR Code Generators, and Dummy Data Generators.
                    These tools are provided "as is" for development, testing, and educational purposes.
                </p>

                <h2>3. Use License</h2>
                <p>
                    Permission is granted to use the materials (information or software) on DevMock's website for personal or commercial development projects.
                </p>
                <p><strong>You are explicitly permitted to:</strong></p>
                <ul>
                    <li>Use the <em>output</em> of our tools (e.g., generated passwords, UUIDs, QR codes) in your own commercial or personal projects without attribution.</li>
                    <li>Use the site for testing and QA purposes.</li>
                </ul>
                <p><strong>You are restricted from:</strong></p>
                <ul>
                    <li>Systematically scraping or extracting data from the site for the purpose of cloning the service.</li>
                    <li>Using the website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website.</li>
                    <li>Using the Service for any illegal or unauthorized purpose.</li>
                </ul>

                <h2>4. Disclaimer</h2>
                <p>
                    The materials on DevMock's website are provided on an 'as is' basis. DevMock makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
                <p>
                    Further, DevMock does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
                    <strong>Always verify generated data (especially security-critical data like hashes) before use in production environments.</strong>
                </p>

                <h2>5. Limitations</h2>
                <p>
                    In no event shall DevMock or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on DevMock's website, even if DevMock or a DevMock authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>

                <h2>6. Accuracy of Materials</h2>
                <p>
                    The materials appearing on DevMock's website could include technical, typographical, or photographic errors. DevMock does not warrant that any of the materials on its website are accurate, complete, or current. DevMock may make changes to the materials contained on its website at any time without notice.
                </p>

                <h2>7. Links</h2>
                <p>
                    DevMock has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by DevMock of the site. Use of any such linked website is at the user's own risk.
                </p>

                <h2>8. Modifications</h2>
                <p>
                    DevMock may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
                </p>

                <h2>9. Governing Law</h2>
                <p>
                    These terms and conditions are governed by and construed in accordance with the laws of the United States and the European Union, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                </p>
            </article>
        </div>
    );
};

export default Terms;
