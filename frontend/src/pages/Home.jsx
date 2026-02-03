import React from 'react';
import { useTranslation } from 'react-i18next';
import ToolCard from '../components/ToolCard';
import SEO from '../components/SEO';
import { Check, Copy, RefreshCw, Sliders, Wifi, Fingerprint, FileDigit, Type, Palette, MapPin } from 'lucide-react';

const Home = () => {
    const { t, i18n } = useTranslation();
    const langPrefix = `/${i18n.language || 'en'}`;

    // Mini Component Previews
    const PreviewPassword = () => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 max-w-[240px] mx-auto transform rotate-[-2deg]">
            <div className="flex items-center justify-between mb-3 bg-gray-100 rounded p-2">
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                </div>
                <div className="h-2 w-12 bg-gray-300 rounded"></div>
            </div>
            <div className="h-2 bg-gray-100 rounded w-3/4 mb-2"></div>
            <div className="h-2 bg-gray-100 rounded w-1/2"></div>
            <div className="mt-4 flex gap-2 justify-center">
                <div className="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center">
                    <RefreshCw className="w-4 h-4" />
                </div>
            </div>
        </div>
    );

    const PreviewUUID = () => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 max-w-[260px] mx-auto font-mono text-xs text-brand/80 break-all transform rotate-[2deg]">
            <div className="flex items-center gap-2 text-gray-400 mb-2 text-[10px] bg-gray-50 p-1 rounded">
                <Fingerprint className="w-3 h-3" /> UUID v4
            </div>
            550e8400-e29b-41d4-a716-446655440000
        </div>
    );

    const PreviewQR = () => (
        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 inline-block transform rotate-[-3deg]">
            <Wifi className="w-16 h-16 text-brand/20 mx-auto" />
            <div className="mt-2 text-[10px] text-center text-gray-400 font-mono">WIFI:S:MyNet...</div>
        </div>
    );

    const PreviewHash = () => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 max-w-[260px] mx-auto">
            <div className="flex gap-2 mb-2">
                <span className="bg-brand/10 text-brand text-[10px] px-2 py-0.5 rounded-full font-bold">SHA256</span>
                <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full">MD5</span>
            </div>
            <div className="h-2 bg-gray-100 rounded w-full mb-1"></div>
            <div className="h-2 bg-gray-100 rounded w-2/3"></div>
        </div>
    );

    // Generic Placeholder for others
    const PreviewGeneric = ({ icon: Icon }) => (
        <div className="flex items-center justify-center h-full opacity-10">
            <Icon className="w-24 h-24 text-gray-900" />
        </div>
    );

    const tools = [
        {
            title: "Strong Password Generator",
            description: "Create secure, high-entropy passwords with customizable rules for length and character types.",
            preview: <PreviewPassword />,
            to: `${langPrefix}/tools/password`
        },
        {
            title: "UUID Generator",
            description: "Generate collision-free RFC4122 v4 (random) and v1 (timestamp) UUIDs for unique identifiers.",
            preview: <PreviewUUID />,
            to: `${langPrefix}/tools/uuid`
        },
        {
            title: "QR Code Generator",
            description: "Instant QR codes for URLs, WiFi configurations, and plain text. Download as high-res PNG.",
            preview: <PreviewQR />,
            to: `${langPrefix}/tools/qr-code`
        },
        {
            title: "Hash Generator",
            description: "Compute cryptographic hashes (SHA-256, MD5) for file integrity verification and security.",
            preview: <PreviewHash />,
            to: `${langPrefix}/tools/hash`
        },
        {
            title: "Lorem Ipsum Generator",
            description: "Generate classic placeholder text for layouts and typography testing.",
            preview: <PreviewGeneric icon={Type} />,
            to: `${langPrefix}/tools/lorem`
        },
        {
            title: "Random Color Generator",
            description: "Discover perfect color palettes with random HEX, RGB, and HSL generator.",
            preview: <PreviewGeneric icon={Palette} />,
            to: `${langPrefix}/tools/color`
        },
    ];

    return (
        <div className="container mx-auto px-4 py-16 animate-fade-in">
            <SEO
                title={t('seo.siteTitle')}
                description={t('seo.siteDescription')}
                keywords="developer tools, data generator, password generator, uuid generator, qr code generator, fake data, devmock"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": "DevMock",
                    "url": "https://devmock.com",
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": "https://devmock.com/search?q={search_term_string}",
                        "query-input": "required name=search_term_string"
                    }
                }}
            />

            <header className="text-center mb-20 space-y-4">
                <div className="inline-block px-4 py-1.5 rounded-full bg-brand/10 text-brand font-bold text-sm mb-4">
                    DevMock Utilities v2.0
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
                    Developer tools,<br className="hidden md:block" />reimagined for speed.
                </h2>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
                    A premium suite of client-side data generators. Secure, instant, and free.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {tools.map((tool, index) => (
                    <ToolCard key={index} {...tool} />
                ))}
            </div>

            <div className="mt-24 border-t border-gray-200 pt-12 text-center">
                <div className="inline-flex items-center gap-2 text-gray-400 text-sm font-medium bg-gray-50 px-4 py-2 rounded-lg">
                    <Check className="w-4 h-4 text-green-500" /> No server logging. Privacy first.
                </div>
            </div>
        </div>
    );
};

export default Home;
