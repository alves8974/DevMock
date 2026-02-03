import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Copy, RefreshCw, Check } from 'lucide-react';
import SEO from '../../components/SEO';
import AdPlaceholder from '../../components/AdPlaceholder';

const UUIDGenerator = () => {
    const { t } = useTranslation();
    const { variant } = useParams();
    const [version, setVersion] = useState('v4');
    const [uuid, setUuid] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const baseKey = variant ? `tools.uuid_${variant}` : 'tools.uuid';

    const generate = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post('http://localhost:5000/api/generate/uuid', {
                version
            });
            setUuid(data.result);
            setCopied(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(uuid);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
            <SEO
                title={t(`${baseKey}.title`)}
                description={t(`${baseKey}.description`)}
                keywords="uuid generator, v4 uuid, v1 uuid, guid generator, free uuid tool, online uuid, rfc4122 generator"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": t(`${baseKey}.title`),
                    "applicationCategory": "DeveloperApplication",
                    "operatingSystem": "Any",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    },
                    "description": t(`${baseKey}.description`)
                }}
            />

            {/* Header - Simple & Clean */}
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t(`${baseKey}.h1`)}</h1>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg">{t(`${baseKey}.description`)}</p>
            </div>

            {/* Main Tool Card - Unified Layout */}
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-200 overflow-hidden mb-16">

                {/* Control Bar */}
                <div className="border-b border-gray-100 bg-gray-50/50 p-2 flex justify-center">
                    <div className="bg-gray-200/50 p-1 rounded-xl flex gap-1">
                        <button
                            onClick={() => setVersion('v4')}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${version === 'v4'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            UUID v4 (Random)
                        </button>
                        <button
                            onClick={() => setVersion('v1')}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${version === 'v1'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            UUID v1 (Timestamp)
                        </button>
                    </div>
                </div>

                {/* Generator Area */}
                <div className="p-8 md:p-16 text-center">
                    <div className="relative group max-w-2xl mx-auto">
                        <div
                            className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-gray-900 tracking-tight break-all cursor-pointer hover:text-brand transition-colors py-8 select-all"
                            onClick={copyToClipboard}
                        >
                            {uuid || '...'}
                        </div>

                        <div className={`absolute top-0 right-0 left-0 flex justify-center pointer-events-none transition-opacity duration-300 ${copied ? 'opacity-100' : 'opacity-0'}`}>
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold border border-green-200 shadow-sm">
                                Copied to clipboard!
                            </span>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center gap-4">
                        <button
                            onClick={generate}
                            disabled={loading}
                            className="px-8 py-4 bg-gray-900 hover:bg-black text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex items-center gap-3"
                        >
                            {loading ? <RefreshCw className="animate-spin w-5 h-5" /> : (
                                <>Generate New UUID <RefreshCw className="w-5 h-5 opacity-50" /></>
                            )}
                        </button>

                        <button
                            onClick={copyToClipboard}
                            className="px-8 py-4 bg-white border border-gray-200 hover:border-brand/50 hover:bg-blue-50/30 text-gray-700 hover:text-brand rounded-xl font-bold text-lg transition-all flex items-center gap-3"
                        >
                            <Copy className="w-5 h-5" /> Copy
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Section - Simplified */}
            <div className="grid md:grid-cols-3 gap-12">
                <div className="md:col-span-2">
                    <article className="prose prose-lg prose-gray max-w-none">
                        <h2 className="text-2xl font-bold text-gray-900">{t(`${baseKey}.article.title`)}</h2>
                        <div dangerouslySetInnerHTML={{ __html: t(`${baseKey}.article.p1`).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

                        <div className="my-8 p-6 bg-blue-50/50 rounded-2xl border border-blue-100 text-blue-900">
                            <h3 className="text-lg font-bold mb-2 text-blue-900">{t(`${baseKey}.article.h2_versions`)}</h3>
                            <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: t(`${baseKey}.article.p_versions`).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </div>

                        <h3 className="text-xl font-bold text-gray-900">{t(`${baseKey}.article.h2_usecase`)}</h3>
                        <p>{t(`${baseKey}.article.p_usecase`)}</p>
                    </article>
                </div>

                <aside className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" /> Key Features
                        </h4>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2"></div>RFC 4122 Compliant</li>
                            <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2"></div>Version 1 & 4 Support</li>
                            <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2"></div>Cryptographically Secure</li>
                            <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2"></div>Copy to Clipboard</li>
                            <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2"></div>No Server Logs</li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default UUIDGenerator;
