import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, Check, Palette, ArrowRight } from 'lucide-react';
import SEO from '../../components/SEO';
import AdPlaceholder from '../../components/AdPlaceholder';

const ColorGenerator = () => {
    const [colorData, setColorData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(null);

    const generateColor = () => {
        setLoading(true);
        // Simulate loading for effect
        setTimeout(() => {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);

            const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
            const rgb = `rgb(${r}, ${g}, ${b})`;

            // Calculate HSL
            let r_ = r / 255;
            let g_ = g / 255;
            let b_ = b / 255;
            let cmin = Math.min(r_, g_, b_),
                cmax = Math.max(r_, g_, b_),
                delta = cmax - cmin,
                h = 0,
                s = 0,
                l = 0;

            if (delta === 0) h = 0;
            else if (cmax === r_) h = ((g_ - b_) / delta) % 6;
            else if (cmax === g_) h = (b_ - r_) / delta + 2;
            else h = (r_ - g_) / delta + 4;

            h = Math.round(h * 60);
            if (h < 0) h += 360;
            l = (cmax + cmin) / 2;
            s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
            s = +(s * 100).toFixed(1);
            l = +(l * 100).toFixed(1);

            const hsl = `hsl(${h}, ${s}%, ${l}%)`;

            setColorData({ hex, rgb, hsl });
            setLoading(false);
        }, 100);
    };

    useEffect(() => {
        generateColor();
    }, []);

    const copyToClipboard = (text, key) => {
        navigator.clipboard.writeText(text);
        setCopied(key);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
            <SEO
                title="Random Color Generator - HEX, RGB, HSL"
                description="Generate beautiful random colors instantly. Convert between HEX, RGB, and HSL formats. Ideal for designers, developers, and artists seeking inspiration."
                keywords="random color generator, color picker, hex color, rgb color, hsl color, web design tools, color palette"
                canonical="https://devmock.com/tools/color"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "Random Color Generator",
                    "applicationCategory": "DesignApplication",
                    "operatingSystem": "Any",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    },
                    "description": "A tool to generate random colors and provide their codes in HEX, RGB, and HSL formats."
                }}
            />

            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Random Color Generator</h1>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg">Instant random colors for your next design project.</p>
            </div>

            {/* Main Tool Card */}
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-200 overflow-hidden mb-16">

                {colorData ? (
                    <div className="flex flex-col md:flex-row h-full min-h-[400px]">
                        {/* Preview Side */}
                        <div
                            className="md:w-1/2 relative transition-colors duration-500 flex items-center justify-center p-12 group"
                            style={{ backgroundColor: colorData.hex }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/10 pointer-events-none"></div>
                            <div className="relative z-10 text-center">
                                <span className="inline-block bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl text-2xl font-mono font-bold text-gray-900 shadow-xl border border-white/50 mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                    {colorData.hex}
                                </span>
                                <button
                                    onClick={generateColor}
                                    disabled={loading}
                                    className="block w-full px-8 py-3 bg-gray-900/90 hover:bg-black text-white rounded-xl font-bold shadow-lg backdrop-blur transition-all active:scale-[0.98]"
                                >
                                    {loading ? <RefreshCw className="animate-spin w-5 h-5 mx-auto" /> : 'Generate New Color'}
                                </button>
                            </div>
                        </div>

                        {/* Details Side */}
                        <div className="md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center">
                            <div className="space-y-4">
                                {[
                                    { label: 'HEX', val: colorData.hex },
                                    { label: 'RGB', val: colorData.rgb },
                                    { label: 'HSL', val: colorData.hsl }
                                ].map((item) => (
                                    <div key={item.label} className="group">
                                        <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-brand/30 hover:shadow-md transition-all duration-300">
                                            <div>
                                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{item.label}</div>
                                                <div className="text-lg font-mono text-gray-800 font-medium">{item.val}</div>
                                            </div>
                                            <button
                                                onClick={() => copyToClipboard(item.val, item.label)}
                                                className={`p-2 rounded-lg transition-all ${copied === item.label
                                                    ? 'bg-green-50 text-green-600'
                                                    : 'text-gray-400 hover:text-brand hover:bg-blue-50'}`}
                                            >
                                                {copied === item.label ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-12 flex justify-center">
                        <RefreshCw className="animate-spin w-8 h-8 text-brand" />
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="flex flex-col lg:flex-row gap-16">
                <main className="flex-1">
                    <article className="prose prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand max-w-none">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Color Formats Explained</h2>
                        <p>
                            Web developers and designers use various formats to define colors. Our tool generates three of the most common formats:
                        </p>

                        <div className="grid md:grid-cols-3 gap-6 my-10">
                            {[
                                { t: 'HEX', d: 'Hexadecimal code, standard for web.', e: '#3b82f6' },
                                { t: 'RGB', d: 'Red Green Blue light intensity.', e: 'rgb(59, 130, 246)' },
                                { t: 'HSL', d: 'Hue, Saturation, Lightness.', e: 'hsl(217, 91%, 60%)' }
                            ].map(f => (
                                <div key={f.t} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 mt-0">{f.t}</h3>
                                    <p className="text-gray-600 text-sm mb-3">{f.d}</p>
                                    <code className="text-xs font-mono bg-white px-2 py-1 rounded border border-gray-200 text-brand">
                                        {f.e}
                                    </code>
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

export default ColorGenerator;
