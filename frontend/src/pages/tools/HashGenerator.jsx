import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { useTranslation, Trans } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Copy, RefreshCw, Check, FileDigit } from 'lucide-react';
import SEO from '../../components/SEO';
import AdPlaceholder from '../../components/AdPlaceholder';

const HashGenerator = () => {
    const { t } = useTranslation();
    const { variant } = useParams();
    const [text, setText] = useState('');
    const [type, setType] = useState('SHA256');
    const [hash, setHash] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const baseKey = variant ? `tools.hash_${variant}` : 'tools.hash';

    const generate = () => {
        if (!text) return;
        setLoading(true);
        // Simulate async operation for UI consistent with other tools
        setTimeout(() => {
            try {
                let result = '';
                switch (type) {
                    case 'MD5':
                        result = CryptoJS.MD5(text).toString();
                        break;
                    case 'SHA1':
                        result = CryptoJS.SHA1(text).toString();
                        break;
                    case 'SHA256':
                        result = CryptoJS.SHA256(text).toString();
                        break;
                    case 'SHA512':
                        result = CryptoJS.SHA512(text).toString();
                        break;
                    default:
                        result = CryptoJS.SHA256(text).toString();
                }
                setHash(result);
                setCopied(false);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }, 100);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(hash);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
            <SEO
                title={t(`${baseKey}.title`)}
                description={t(`${baseKey}.description`)}
                keywords="hash generator, md5 hash, sha256 generator, sha512 calculator, online hashing, string hashing, cryptography tool"
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

            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t(`${baseKey}.h1`)}</h1>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg">{t(`${baseKey}.description`)}</p>
            </div>

            {/* Main Tool Card */}
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-200 overflow-hidden mb-16">

                {/* Algorithm Selector Bar */}
                <div className="border-b border-gray-100 bg-gray-50/50 p-2 flex justify-center">
                    <div className="bg-gray-200/50 p-1 rounded-xl flex gap-1">
                        {['MD5', 'SHA1', 'SHA256', 'SHA512'].map(algo => (
                            <button
                                key={algo}
                                onClick={() => setType(algo)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${type === algo
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {algo}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row">
                    {/* Input Side */}
                    <div className="p-8 md:p-12 md:w-1/2 border-b md:border-b-0 md:border-r border-gray-100 bg-white">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Input Text</label>
                                <textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder={t('tools.hash.placeholder')}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all text-base min-h-[200px] resize-none font-mono"
                                />
                            </div>

                            <button
                                onClick={generate}
                                disabled={loading || !text}
                                className="w-full py-4 bg-brand hover:bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? <RefreshCw className="animate-spin w-5 h-5" /> : (
                                    <>Calculate Hash <RefreshCw className="w-5 h-5 opacity-70" /></>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Output Side */}
                    <div className="p-8 md:p-12 md:w-1/2 bg-gray-50 flex items-center justify-center">
                        {hash ? (
                            <div className="w-full animate-fade-in">
                                <label className="block text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider text-center">{type} Result</label>
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden group">
                                    <div className="p-6 break-all font-mono text-gray-800 text-lg md:text-xl leading-relaxed max-h-[300px] overflow-y-auto custom-scrollbar">
                                        {hash}
                                    </div>
                                    <button
                                        onClick={copyToClipboard}
                                        className={`w-full py-3 flex items-center justify-center gap-2 font-bold transition-colors ${copied
                                            ? 'bg-green-50 text-green-600'
                                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        {copied ? 'Copied!' : 'Copy to Clipboard'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-gray-400">
                                <FileDigit className="w-24 h-24 mx-auto mb-4 opacity-20" />
                                <p>Enter text to generate hash</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row gap-16">
                <main className="flex-1">
                    <article className="prose prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand max-w-none">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">{t(`${baseKey}.article.title`)}</h2>
                        <div dangerouslySetInnerHTML={{ __html: t(`${baseKey}.article.p1`).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 my-12">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 mt-0">{t(`${baseKey}.article.h2_integrity`)}</h3>
                            <p className="text-gray-600 m-0">{t(`${baseKey}.article.p_integrity`)}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{t(`${baseKey}.article.h2_algorithms`)}</h3>
                                <div dangerouslySetInnerHTML={{ __html: t(`${baseKey}.article.p_algorithms`).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{t(`${baseKey}.article.h2_encryption`)}</h3>
                                <p className="text-gray-600 m-0">{t(`${baseKey}.article.p_encryption`)}</p>
                            </div>
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

export default HashGenerator;
