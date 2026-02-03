import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, MapPin, Globe, Check, ArrowRight } from 'lucide-react';
import { fakerEN_US, fakerEN_CA, fakerEN_GB, fakerDE, fakerFR, fakerIT, fakerES, fakerNL, fakerPT_BR } from '@faker-js/faker';
import { useTranslation } from 'react-i18next'; // Added import
import SEO from '../../components/SEO';
import AdPlaceholder from '../../components/AdPlaceholder';

const AddressGenerator = () => {
    const { t } = useTranslation(); // Added hook
    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [country, setCountry] = useState('US');

    const countries = [
        { code: 'US', name: 'United States', flag: '🇺🇸', faker: fakerEN_US },
        { code: 'CA', name: 'Canada', flag: '🇨🇦', faker: fakerEN_CA },
        { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', faker: fakerEN_GB },
        { code: 'DE', name: 'Germany', flag: '🇩🇪', faker: fakerDE },
        { code: 'FR', name: 'France', flag: '🇫🇷', faker: fakerFR },
        { code: 'IT', name: 'Italy', flag: '🇮🇹', faker: fakerIT },
        { code: 'ES', name: 'Spain', flag: '🇪🇸', faker: fakerES },
        { code: 'NL', name: 'Netherlands', flag: '🇳🇱', faker: fakerNL },
        { code: 'BR', name: 'Brazil', flag: '🇧🇷', faker: fakerPT_BR },
    ];

    const CopyField = ({ label, value }) => {
        const [isCopied, setIsCopied] = useState(false);

        const handleCopy = () => {
            navigator.clipboard.writeText(value);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        };

        return (
            <div
                onClick={handleCopy}
                className="group relative p-4 rounded-xl border border-gray-100 bg-white hover:border-brand/30 hover:shadow-md transition-all cursor-pointer"
            >
                <div className="flex justify-between items-start mb-1">
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-wider group-hover:text-brand transition-colors">{label}</div>
                    <div className={`p-1.5 rounded-md transition-all ${isCopied ? 'bg-green-100 text-green-600' : 'text-gray-300 group-hover:text-brand bg-gray-50 group-hover:bg-brand/10'}`}>
                        {isCopied ? <Check className="w-3 w-3" /> : <Copy className="w-3 h-3" />}
                    </div>
                </div>
                <div className="font-mono text-gray-700 font-medium truncate pr-6">{value}</div>
            </div>
        );
    };

    const generate = () => {
        setLoading(true);
        setTimeout(() => {
            try {
                const selectedCountry = countries.find(c => c.code === country) || countries[0];
                const f = selectedCountry.faker;

                // Fallbacks for safer international support
                const state = f.location?.stateAbbr ? f.location.stateAbbr() : (f.location?.state ? f.location.state() : 'N/A');
                const zip = f.location?.zipCode ? f.location.zipCode() : '00000';

                const newAddress = {
                    address: `${f.location.streetAddress()}, ${f.location.city()}, ${state} ${zip}`,
                    details: {
                        street: f.location.streetAddress(),
                        city: f.location.city(),
                        state: state,
                        zip: zip,
                        country: selectedCountry.name
                    }
                };

                setAddress(newAddress);
                setCopied(false);
            } catch (e) {
                console.error("Address generation error:", e);
                // Fallback to basic US if specific locale fails
                setAddress({
                    address: "123 Main St, New York, NY 10001",
                    details: { street: "123 Main St", city: "New York", state: "NY", zip: "10001", country: "Error (Fallback)" }
                });
            } finally {
                setLoading(false);
            }
        }, 400);
    };

    // Generate on mount
    useEffect(() => {
        generate();
    }, []);

    const copyToClipboard = () => {
        if (!address) return;
        navigator.clipboard.writeText(address.address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
            <SEO
                title="Fake Address Generator - US, UK, Europe & Canada"
                description="Generate realistic fake addresses for testing and form validation. Supports United States, Canada, United Kingdom, Germany, France, Italy, Spain, and Netherlands."
                keywords="fake address generator, random address, us address generator, uk address generator, canada address generator, test data, form validation"
                canonical="https://devmock.com/tools/address"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "Fake Address Generator",
                    "applicationCategory": "DeveloperApplication",
                    "operatingSystem": "Any",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    },
                    "description": "Generate random street addresses for multiple countries including US, UK, and Europe for testing purposes."
                }}
            />

            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Random Address Generator</h1>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg">Generate valid street addresses for testing and validation.</p>
            </div>

            {/* Main Tool Card */}
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-200 overflow-hidden mb-16">
                {/* Control Bar */}
                <div className="border-b border-gray-100 bg-gray-50/50 p-6">
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                        <div className="flex-1 w-full">
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Select Region</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {countries.map((c) => (
                                    <button
                                        key={c.code}
                                        onClick={() => setCountry(c.code)}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 border ${country === c.code
                                            ? 'bg-white border-brand text-brand shadow-sm ring-1 ring-brand/20'
                                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className="text-lg leading-none">{c.flag}</span>
                                        <span className="truncate">{c.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="w-full md:w-auto mt-4 md:mt-0">
                            <button
                                onClick={generate}
                                disabled={loading}
                                className="w-full md:w-auto px-8 py-3 bg-brand hover:bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 h-[50px]"
                            >
                                {loading ? <RefreshCw className="animate-spin w-5 h-5" /> : (
                                    <>{t('tools.address.generate')} <ArrowRight className="w-4 h-4 opacity-70" /></>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Output Area */}
                <div className="p-8 md:p-12 min-h-[300px] bg-white relative group flex flex-col items-center justify-center">
                    {address ? (
                        <div className="w-full max-w-2xl animate-fade-in relative">
                            <div className="absolute top-0 right-0 z-10">
                                <button
                                    onClick={copyToClipboard}
                                    className={`p-2 rounded-lg border shadow-sm transition-all flex items-center gap-2 ${copied
                                        ? 'bg-green-50 text-green-600 border-green-200'
                                        : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-900'
                                        }`}
                                >
                                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    <span className="text-xs font-bold">{copied ? 'Copied' : 'Copy'}</span>
                                </button>
                            </div>

                            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8 text-center mb-8">
                                <div className="w-16 h-16 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-brand mx-auto mb-6">
                                    <Globe className="w-8 h-8" />
                                </div>
                                <div className="text-2xl md:text-3xl text-gray-900 font-bold leading-relaxed mb-4 font-serif">
                                    {address.details.street}<br />
                                    {address.details.city}, {address.details.state} {address.details.zip}
                                </div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-200/50 text-gray-600 text-xs font-bold uppercase tracking-wider">
                                    {countries.find(c => c.code === country)?.flag} {address.details.country}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <CopyField label="Street" value={address.details.street} />
                                <CopyField label="City" value={address.details.city} />
                                <CopyField label="State" value={address.details.state} />
                                <CopyField label="Zip Code" value={address.details.zip} />
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-gray-400 py-12">
                            <MapPin className="w-16 h-16 mb-4 opacity-20 mx-auto" />
                            <p className="text-lg">Select a region and click Generate to start</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col lg:flex-row gap-16">
                <main className="flex-1">
                    <article className="prose prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand max-w-none">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Global Address Generator for Testing</h2>
                        <p>
                            This tool creates <strong>realistic fake addresses</strong> for software testing, e-commerce checkout flows, and user registration forms.
                        </p>
                        <p>
                            We support address formats for major North American and European countries, ensuring your application can handle international data correctly.
                        </p>

                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 my-8">
                            <h3 className="text-blue-900 font-bold text-lg mb-2 mt-0">Why Use Fake Addresses?</h3>
                            <ul className="mb-0 text-blue-800 text-sm space-y-2">
                                <li><strong>Privacy First:</strong> Never use real user data in test environments. Avoid GDPR/CCPA violations.</li>
                                <li><strong>Internationalization (i18n):</strong> Verify that your forms handle different postal code formats (e.g., UK alphanumeric vs US numeric).</li>
                                <li><strong>E-commerce Testing:</strong> Validate shipping calculations and address line handling for different regions.</li>
                            </ul>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-4">Supported Regions</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 not-prose">
                            {countries.map(c => (
                                <div key={c.code} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm font-medium text-gray-700">
                                    <span>{c.flag}</span> {c.name}
                                </div>
                            ))}
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

export default AddressGenerator;
