import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Copy, RefreshCw, Check, Type, ArrowRight } from 'lucide-react';
import { faker } from '@faker-js/faker';
import SEO from '../../components/SEO';
import AdPlaceholder from '../../components/AdPlaceholder';

const LoremGenerator = () => {
    const { t } = useTranslation();
    const [count, setCount] = useState(3);
    const [type, setType] = useState('paragraphs');
    const [lorem, setLorem] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const generate = () => {
        setLoading(true);
        // Simulate a small delay for better UX (so the user feels "work" is being done)
        setTimeout(() => {
            let result = '';
            switch (type) {
                case 'words':
                    result = faker.lorem.words(count);
                    break;
                case 'sentences':
                    result = faker.lorem.sentences(count);
                    break;
                case 'paragraphs':
                default:
                    result = faker.lorem.paragraphs(count, '\n\n');
                    break;
            }
            setLorem(result);
            setCopied(false);
            setLoading(false);
        }, 300);
    };

    // Generate on mount
    useEffect(() => {
        generate();
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(lorem);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
            <SEO
                title="Lorem Ipsum Generator - Free Dummy Text"
                description="Generate classic Lorem Ipsum placeholder text for your design and layout projects. Customizable by paragraphs, sentences, or words."
                keywords="lorem ipsum generator, dummy text, placeholder text, lipsum, lorem ipsum text, web design tools"
                canonical="https://devmock.com/tools/lorem"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "Lorem Ipsum Generator",
                    "applicationCategory": "DesignApplication",
                    "operatingSystem": "Any",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    },
                    "description": "A tool to generate Lorem Ipsum placeholder text for graphical and web design."
                }}
            />

            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Lorem Ipsum Generator</h1>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg">Generate classic placeholder text for your design projects.</p>
            </div>

            {/* Main Tool Card */}
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-200 overflow-hidden mb-16">
                {/* Controls Bar */}
                <div className="border-b border-gray-100 bg-gray-50/50 p-6 flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="flex bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
                        {['paragraphs', 'sentences', 'words'].map(t => (
                            <button
                                key={t}
                                onClick={() => setType(t)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all ${type === t
                                    ? 'bg-gray-900 text-white shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="flex items-center gap-3 bg-white px-4 py-2 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-xl shadow-sm">
                            <span className="text-gray-400 font-normal">Count:</span>
                            <span className="text-brand min-w-[20px] text-center">{count}</span>
                            <input
                                type="range"
                                min="1"
                                max="20"
                                value={count}
                                onChange={(e) => setCount(parseInt(e.target.value))}
                                className="w-24 h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-brand"
                            />
                        </div>
                        <button
                            onClick={generate}
                            disabled={loading}
                            className="flex-1 md:flex-none px-6 py-3 bg-brand hover:bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading ? <RefreshCw className="animate-spin w-5 h-5" /> : (
                                <>Generate <ArrowRight className="w-4 h-4 opacity-70" /></>
                            )}
                        </button>
                    </div>
                </div>

                {/* Output Area */}
                <div className="p-8 md:p-12 min-h-[300px] bg-white relative group">
                    {lorem ? (
                        <>
                            <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={copyToClipboard}
                                    className={`p-2 rounded-lg border shadow-sm transition-all ${copied
                                        ? 'bg-green-50 text-green-600 border-green-200'
                                        : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-900'
                                        }`}
                                >
                                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                </button>
                            </div>
                            <div className="prose prose-lg max-w-none text-gray-600 font-serif leading-relaxed">
                                {type === 'paragraphs' ? (
                                    lorem.split('\n').map((para, i) => (
                                        <p key={i} className="mb-6 last:mb-0">{para}</p>
                                    ))
                                ) : (
                                    <p>{lorem}</p>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 py-12">
                            <Type className="w-16 h-16 mb-4 opacity-20" />
                            <p>Select options and click Generate</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col lg:flex-row gap-16">
                <main className="flex-1">
                    <article className="prose prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand max-w-none">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Lorem Ipsum?</h2>
                        <p>
                            <strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. It has been the industry's standard dummy text ever since the 1500s.
                        </p>

                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 my-12">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 mt-0">Why do we use it?</h3>
                            <p className="text-gray-600 m-0">
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                                The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.
                            </p>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2">History</h3>
                        <p className="text-gray-600">
                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.
                        </p>
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

export default LoremGenerator;
