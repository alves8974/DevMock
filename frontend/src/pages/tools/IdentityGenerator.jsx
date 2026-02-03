import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, Check, User, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { faker } from '@faker-js/faker';
import SEO from '../../components/SEO';
import AdPlaceholder from '../../components/AdPlaceholder';

const IdentityGenerator = () => {
    const [identity, setIdentity] = useState(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const generate = () => {
        setLoading(true);
        setTimeout(() => {
            try {
                const firstName = faker.person.firstName();
                const lastName = faker.person.lastName();
                const fullName = `${firstName} ${lastName}`;

                const street = faker.location.streetAddress();
                const city = faker.location.city();
                const state = faker.location.state({ abbreviated: true }); // Trying safer option
                const zip = faker.location.zipCode();
                const fullAddress = `${street}, ${city}, ${state} ${zip}`;

                // Generate consistent email based on name
                const email = faker.internet.email({ firstName, lastName });

                const newIdentity = {
                    name: fullName,
                    address: fullAddress,
                    details: {
                        firstName,
                        lastName,
                        gender: faker.person.sex(),
                        birthDate: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toLocaleDateString('en-US'),
                        email: email,
                        phone: faker.phone.number(),
                        username: faker.internet.username({ firstName, lastName }),
                        password: faker.internet.password(),
                        ip: faker.internet.ipv4(),
                        mac: faker.internet.mac(),
                        company: faker.company.name(),
                        jobTitle: faker.person.jobTitle(),
                        website: faker.internet.domainName(),
                        ssn: faker.string.numeric(9), // Simple numeric string for SSN-like format
                        street,
                        city,
                        state,
                        zip,
                        country: 'United States'
                    }
                };

                setIdentity(newIdentity);
                setCopied(false);
            } catch (e) {
                console.error("Identity generation error:", e);
            } finally {
                setLoading(false);
            }
        }, 500);
    };

    // Generate on mount
    useEffect(() => {
        generate();
    }, []);

    const copyToClipboard = () => {
        if (!identity) return;
        const text = `Name: ${identity.name}\nAddress: ${identity.address}`;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
            <SEO
                title="Fake Identity Generator - Name & Address"
                description="Generate realistic fake identities with names, streets, cities, and zip codes. Useful for software testing, privacy protection, and QA."
                keywords="fake identity generator, fake name generator, fake person, test data generator, mock user data, privacy tool"
                canonical="https://devmock.com/tools/identity"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "Fake Identity Generator",
                    "applicationCategory": "DeveloperApplication",
                    "operatingSystem": "Any",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    },
                    "description": "Generates fictitious consumer identities including name and address for testing purposes."
                }}
            />

            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Fake Identity Generator</h1>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg">Generate realistic user profiles for testing and development.</p>
            </div>

            {/* Main Tool Card */}
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-200 overflow-hidden mb-16">
                {/* Control Bar */}
                <div className="border-b border-gray-100 bg-gray-50/50 p-6 flex justify-center">
                    <button
                        onClick={generate}
                        disabled={loading}
                        className="w-full md:w-auto px-8 py-3 bg-brand hover:bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 min-w-[200px]"
                    >
                        {loading ? <RefreshCw className="animate-spin w-5 h-5" /> : (
                            <>Generate New Identity <ArrowRight className="w-4 h-4 opacity-70" /></>
                        )}
                    </button>
                </div>

                {/* Output Area */}
                <div className="p-8 md:p-12 min-h-[300px] bg-white relative group">
                    {identity ? (
                        <div className="max-w-2xl mx-auto animate-fade-in relative">
                            <div className="absolute top-0 right-0 z-10">
                                <button
                                    onClick={copyToClipboard}
                                    className={`p-2 rounded-lg border shadow-sm transition-all flex items-center gap-2 ${copied
                                        ? 'bg-green-50 text-green-600 border-green-200'
                                        : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-900'
                                        }`}
                                >
                                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    <span className="text-xs font-bold">{copied ? 'Copied' : 'Copy All'}</span>
                                </button>
                            </div>

                            <div className="space-y-6 pt-6">
                                {/* Name Card */}
                                <div className="flex items-start gap-6">
                                    <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center text-brand shrink-0">
                                        <User className="w-8 h-8" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</div>
                                        <div className="text-3xl font-bold text-gray-900 font-alt tracking-tight">{identity.name}</div>
                                    </div>
                                </div>

                                <hr className="border-gray-100" />

                                {/* Address Card */}
                                <div className="flex items-start gap-6">
                                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                                        <MapPin className="w-7 h-7" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Address</div>
                                        <div className="text-xl text-gray-700 leading-relaxed font-medium">
                                            {identity.details.street}<br />
                                            {identity.details.city}, {identity.details.state} {identity.details.zip}<br />
                                            {identity.details.country}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 bg-amber-50 rounded-xl border border-amber-100 p-4 flex gap-4 text-sm text-amber-800">
                                <ShieldCheck className="w-5 h-5 shrink-0 text-amber-600" />
                                <div>
                                    <span className="font-bold block mb-1 text-amber-900">For Testing Only</span>
                                    Identity data is completely fictitious and generated randomly. Do not use for real shipping, verification, or illegal activities.
                                </div>
                            </div>

                        </div>
                    ) : (
                        <div className="text-center text-gray-400 py-12 flex flex-col items-center">
                            <User className="w-20 h-20 mb-6 opacity-10" />
                            <p className="text-xl font-medium text-gray-500">Click Generate to create a user profile</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col lg:flex-row gap-16">
                <main className="flex-1">
                    <article className="prose prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand max-w-none">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Protect Your Privacy with Fake Identities</h2>
                        <p>
                            Our <strong>Fake Identity Generator</strong> creates realistic but fictitious user profiles. These profiles are essential for developers and QA engineers who need to test:
                        </p>
                        <ul>
                            <li><strong>Form Validation:</strong> Test name fields, address inputs, and character limits.</li>
                            <li><strong>E-commerce Checkouts:</strong> Verify shipping logic without using real customer data.</li>
                            <li><strong>Database Seeding:</strong> Populate development databases with realistic user information.</li>
                        </ul>

                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 my-8">
                            <h3 className="text-gray-900 font-bold text-lg mb-2 mt-0">Is this data real?</h3>
                            <p className="mb-0 text-gray-600">
                                No. The names are generated by combining common first and last names. The addresses are constructed using valid formats but do not necessarily point to real deliverable locations.
                            </p>
                        </div>
                    </article>
                </main>

                <aside className="w-full lg:w-80 shrink-0 space-y-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                        <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-xs">Advertisement</h4>
                        <AdPlaceholder type="sidebar" />
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default IdentityGenerator;
