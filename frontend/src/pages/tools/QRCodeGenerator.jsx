import React, { useState } from 'react';
import QRCode from 'qrcode';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Download, RefreshCw, Wifi, QrCode, ArrowRight, Check } from 'lucide-react';
import SEO from '../../components/SEO';
import AdPlaceholder from '../../components/AdPlaceholder';

const QRCodeGenerator = () => {
    const { t } = useTranslation();
    const { variant } = useParams();
    const [text, setText] = useState('');
    const [qrImage, setQrImage] = useState('');
    const [loading, setLoading] = useState(false);

    // WiFi mode state
    const [isWifi, setIsWifi] = useState(false);
    const [wifiSsid, setWifiSsid] = useState('');
    const [wifiPass, setWifiPass] = useState('');
    const [wifiAuth, setWifiAuth] = useState('WPA');

    const baseKey = variant ? `tools.qrcode_${variant}` : 'tools.qrcode';

    const generate = async () => {
        setLoading(true);
        let payload = text;

        if (isWifi) {
            // Escape special characters for WiFi string
            const escape = (str) => str.replace(/([\\;,:])/g, '\\$1');
            const ssid = escape(wifiSsid);
            const pass = escape(wifiPass);
            payload = `WIFI:S:${ssid};T:${wifiAuth};P:${pass};;`;
        }

        if (!payload) {
            setLoading(false);
            return;
        }

        try {
            const url = await QRCode.toDataURL(payload, {
                width: 400,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#ffffff'
                }
            });
            setQrImage(url);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
            <SEO
                title={t(`${baseKey}.title`)}
                description={t(`${baseKey}.description`)}
                keywords="qr code generator, free qr code, wifi qr code, url to qr, text to qr, qr code png, offline qr code"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": t(`${baseKey}.title`),
                    "applicationCategory": "UtilityApplication",
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

                {/* Tabs */}
                <div className="flex border-b border-gray-100 bg-gray-50/50">
                    <button
                        onClick={() => setIsWifi(false)}
                        className={`flex-1 py-4 text-sm font-bold transition-all border-b-2 ${!isWifi ? 'bg-white text-gray-900 border-gray-900' : 'text-gray-500 border-transparent hover:text-gray-700'
                            }`}
                    >
                        {t('tools.qrcode.tab_text')}
                    </button>
                    <button
                        onClick={() => setIsWifi(true)}
                        className={`flex-1 py-4 text-sm font-bold transition-all flex items-center justify-center gap-2 border-b-2 ${isWifi ? 'bg-white text-gray-900 border-gray-900' : 'text-gray-500 border-transparent hover:text-gray-700'
                            }`}
                    >
                        <Wifi className="w-4 h-4" /> {t('tools.qrcode.tab_wifi')}
                    </button>
                </div>

                <div className="flex flex-col md:flex-row">
                    {/* Controls Side */}
                    <div className="p-8 md:p-12 md:w-1/2 border-b md:border-b-0 md:border-r border-gray-100 bg-white">
                        <div className="space-y-6">
                            {!isWifi ? (
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Content to Encode</label>
                                    <textarea
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        placeholder={t('tools.qrcode.placeholder_text')}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all text-base min-h-[160px] resize-none"
                                    />
                                </div>
                            ) : (
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Network Name (SSID)</label>
                                        <input
                                            type="text"
                                            placeholder={t('tools.qrcode.placeholder_ssid')}
                                            value={wifiSsid}
                                            onChange={(e) => setWifiSsid(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Security</label>
                                            <select
                                                value={wifiAuth}
                                                onChange={(e) => setWifiAuth(e.target.value)}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all appearance-none"
                                            >
                                                <option value="WPA">WPA/WPA2</option>
                                                <option value="WEP">WEP</option>
                                                <option value="nopass">{t('tools.qrcode.opt_nopass')}</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                                            <input
                                                type="password"
                                                placeholder={t('tools.qrcode.placeholder_pass')}
                                                value={wifiPass}
                                                onChange={(e) => setWifiPass(e.target.value)}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all disabled:opacity-50 disabled:bg-gray-100"
                                                disabled={wifiAuth === 'nopass'}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={generate}
                                disabled={loading || (!text && !wifiSsid)}
                                className="w-full py-4 bg-gray-900 hover:bg-black text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? <RefreshCw className="animate-spin w-5 h-5" /> : (
                                    <>Generate QR Code <ArrowRight className="w-5 h-5 opacity-70" /></>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Preview Side */}
                    <div className="p-8 md:p-12 md:w-1/2 bg-gray-50 flex items-center justify-center">
                        {qrImage ? (
                            <div className="text-center animate-fade-in w-full max-w-sm">
                                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 mb-6">
                                    <img src={qrImage} alt="Generated QR Code" className="w-full max-w-[240px] mx-auto mix-blend-multiply" />
                                </div>
                                <a
                                    href={qrImage}
                                    download="qrcode.png"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 border border-gray-300 hover:border-gray-400 rounded-xl font-bold shadow-sm hover:shadow transition-all"
                                >
                                    <Download className="w-5 h-5 text-gray-600" />
                                    Download high-res PNG
                                </a>
                            </div>
                        ) : (
                            <div className="text-center text-gray-400 py-12">
                                <QrCode className="w-24 h-24 mx-auto mb-4 opacity-20" />
                                <p>Enter content to generate preview</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col lg:flex-row gap-16">
                <main className="flex-1">
                    <article className="prose prose-lg prose-gray max-w-none">
                        <h2 className="text-2xl font-bold text-gray-900">{t(`${baseKey}.article.title`)}</h2>
                        <div dangerouslySetInnerHTML={{ __html: t(`${baseKey}.article.p1`).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

                        <div className="my-8 p-6 bg-blue-50/50 rounded-2xl border border-blue-100 text-blue-900">
                            <h3 className="text-lg font-bold mb-2 text-blue-900">{t(`${baseKey}.article.h2_wifi`)}</h3>
                            <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: t(`${baseKey}.article.p_wifi`).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
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

export default QRCodeGenerator;
