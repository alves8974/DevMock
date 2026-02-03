import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation, Trans } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Copy, RefreshCw, Check } from 'lucide-react';
import SEO from '../../components/SEO';
import AdPlaceholder from '../../components/AdPlaceholder';

const PasswordGenerator = () => {
    const { t } = useTranslation();
    const { variant } = useParams();
    const [length, setLength] = useState(16);
    const [options, setOptions] = useState({ numbers: true, symbols: true });
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const baseKey = variant ? `tools.password_${variant}` : 'tools.password';

    const generate = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post('http://localhost:5000/api/generate/password', {
                length,
                ...options
            });
            setPassword(data.result);
            setCopied(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
            <SEO
                title={t('tools.password.title')}
                description={t('tools.password.description')}
                keywords="password generator, strong password, secure password, random password, password security"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": t('tools.password.title'),
                    "applicationCategory": "SecurityApplication",
                    "operatingSystem": "Any",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    },
                    "description": t('tools.password.description')
                }}
            />

            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('tools.password.h1')}</h1>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg">{t('tools.password.description')}</p>
            </div>

            {/* Main Tool Card */}
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-200 overflow-hidden mb-16">
                {/* Generator Display */}
                <div className="bg-gray-50 border-b border-gray-100 p-8 md:p-12 text-center">
                    <div className="relative group max-w-3xl mx-auto mb-8">
                        <div
                            className="bg-white rounded-2xl border-2 border-brand/20 p-6 md:p-8 text-3xl md:text-5xl font-mono font-bold text-gray-900 tracking-wider break-all shadow-sm hover:border-brand transition-colors cursor-pointer select-all flex items-center justify-center min-h-[5rem]"
                            onClick={copyToClipboard}
                        >
                            {password}
                        </div>

                        <button
                            onClick={copyToClipboard}
                            className={`absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 p-3 rounded-full hover:bg-white hover:shadow-md transition-all ${copied ? 'text-green-500' : 'text-gray-400 hover:text-brand'}`}
                        >
                            {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                        </button>
                    </div>

                    <div className="flex justify-center gap-4">
                        <button
                            onClick={generate}
                            className="px-8 py-4 bg-brand hover:bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all flex items-center gap-2"
                        >
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} /> Generate New
                        </button>
                    </div>
                </div>

                {/* Controls */}
                <div className="p-8 md:p-12 bg-white">
                    <div className="max-w-3xl mx-auto space-y-10">
                        {/* Length Slider */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="font-bold text-gray-700">Password Length</label>
                                <span className="bg-gray-100 px-4 py-1 rounded-lg font-mono font-bold text-brand">{length}</span>
                            </div>
                            <input
                                type="range"
                                min="6"
                                max="50"
                                value={length}
                                onChange={(e) => setLength(parseInt(e.target.value))}
                                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand"
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-2 font-mono">
                                <span>6</span>
                                <span>50</span>
                            </div>
                        </div>

                        {/* Options Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { key: 'uppercase', label: 'ABC Uppercase' },
                                { key: 'lowercase', label: 'abc Lowercase' },
                                { key: 'numbers', label: '123 Numbers' },
                                { key: 'symbols', label: '!@# Symbols' }
                            ].map(opt => (
                                <label
                                    key={opt.key}
                                    className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${options[opt.key]
                                        ? 'border-brand bg-blue-50/50 text-gray-900'
                                        : 'border-gray-100 bg-white text-gray-500 hover:border-gray-300'
                                        }`}
                                >
                                    <span className="font-medium">{opt.label}</span>
                                    <div className={`w-12 h-7 rounded-full relative transition-colors ${options[opt.key] ? 'bg-brand' : 'bg-gray-300'}`}>
                                        <input
                                            type="checkbox"
                                            checked={options[opt.key]}
                                            onChange={() => setOptions({ ...options, [opt.key]: !options[opt.key] })}
                                            className="sr-only"
                                        />
                                        <div className={`absolute top-1 left-1 bg-white w-5 h-5 rounded-full shadow-sm transition-transform ${options[opt.key] ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content & SEO */}
            <div className="grid md:grid-cols-3 gap-12">
                <div className="md:col-span-2">
                    <article className="prose prose-lg prose-gray max-w-none">
                        <h2 className="text-2xl font-bold text-gray-900">{t('tools.password.article.title')}</h2>
                        <div dangerouslySetInnerHTML={{ __html: t('tools.password.article.p1').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

                        <h3 className="text-xl font-bold text-gray-900 mt-8">{t('tools.password.article.h2_tips')}</h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600">
                            <li>Use a mix of characters (Symbols significantly increase entropy).</li>
                            <li>Avoid common words or patterns.</li>
                            <li>Aim for at least 16 characters for critical accounts.</li>
                        </ul>
                    </article>
                </div>
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

export default PasswordGenerator;
