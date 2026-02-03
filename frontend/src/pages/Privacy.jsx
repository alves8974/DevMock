import React from 'react';
import SEO from '../components/SEO';

const Privacy = () => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <SEO
                title="Privacy Policy - DevMock"
                description="Privacy Policy for DevMock. We prioritize your privacy with client-side processing and transparent data practices."
                canonical="https://devmock.com/privacy"
            />

            <article className="prose prose-slate max-w-none">
                <h1>Privacy Policy</h1>
                <p className="text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>

                <p>
                    At <strong>DevMock</strong>, accessible from devmock.com, one of our main priorities is the privacy of our visitors.
                    This Privacy Policy document contains types of information that is collected and recorded by DevMock and how we use it.
                </p>

                <h2>1. Core Principle: Client-Side Processing</h2>
                <p>
                    DevMock is designed as a secure, client-side developer utility suite. This means:
                </p>
                <ul>
                    <li><strong>No Data Storage:</strong> Inputs you provide (such as generated passwords, UUIDs, or QR code data) are processed entirely within your browser. We do not transmit or store this sensitive data on our servers.</li>
                    <li><strong>No Database:</strong> We do not maintain a user database or store personal profiles.</li>
                </ul>

                <h2>2. Information We Collect</h2>
                <p>
                    Since we do not offer user accounts, we collect minimal data focused on site performance and advertising:
                </p>
                <ul>
                    <li><strong>Log Files:</strong> Like most websites, we use log files. These files log visitors when they visit websites. The information collected includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.</li>
                    <li><strong>Cookies:</strong> We use cookies to store information about visitors' preferences (e.g., dark mode toggle) and to record which pages the visitor accesses or visits.</li>
                </ul>

                <h2>3. Third-Party Advertising Partners</h2>
                <p>
                    We may use third-party advertising companies (such as Google AdSense) to serve ads when you visit our website.
                    These companies may use cookies and web beacons to serve ads based on your prior visits to our website or other websites.
                </p>
                <ul>
                    <li><strong>Google DART Cookie:</strong> Google uses DART cookies to serve ads to our site visitors. You may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at <a href="https://policies.google.com/technologies/ads" target="_blank" rel="nofollow noreferrer">https://policies.google.com/technologies/ads</a>.</li>
                </ul>

                <h2>4. CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
                <p>
                    Under the CCPA, among other rights, California consumers have the right to:
                </p>
                <ul>
                    <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
                    <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
                    <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
                </ul>
                <p>
                    Since DevMock does not sell personal data, these provisions are largely not applicable, but we remain committed to transparency.
                </p>

                <h2>5. GDPR Data Protection Rights</h2>
                <p>
                    We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
                </p>
                <ul>
                    <li>The right to access – You have the right to request copies of your personal data.</li>
                    <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
                    <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
                </ul>

                <h2>6. Children's Information</h2>
                <p>
                    We do not knowingly collect any Personal Identifiable Information from children under the age of 13.
                    If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately.
                </p>

                <h2>7. Consent</h2>
                <p>
                    By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
                </p>

                <hr className="my-8" />
                <p className="text-sm text-gray-500">
                    If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
                </p>
            </article>
        </div>
    );
};

export default Privacy;
