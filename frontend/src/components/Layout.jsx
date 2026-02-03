import { Link, useLocation, Outlet, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Terminal, Shield, Github } from 'lucide-react';
import { useEffect } from 'react';

const Layout = ({ children }) => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const { lang } = useParams();

    useEffect(() => {
        if (lang && ['en', 'pt'].includes(lang) && i18n.language !== lang) {
            i18n.changeLanguage(lang);
        }
    }, [lang, i18n]);

    // Helper to keep language prefix in links
    const getLink = (path) => {
        const lang = i18n.language || 'en';
        // Remove leading slash if path has it, to standardize
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return `/${lang}/${cleanPath}`;
    };

    const languages = [
        { code: 'en', label: 'English', flag: '🇺🇸' },
        { code: 'pt', label: 'Português', flag: '🇧🇷' }
    ];

    const switchLanguage = (lang) => {
        const currentPath = location.pathname;
        // Example: /en/tools/uuid
        const parts = currentPath.split('/').filter(Boolean); // ['en', 'tools', 'uuid']

        if (['en', 'pt'].includes(parts[0])) {
            parts[0] = lang;
        } else {
            parts.unshift(lang);
        }

        const newPath = `/${parts.join('/')}`;
        window.location.href = newPath;
    };

    return (
        <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
            <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to={getLink('')} className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-xl bg-gray-900 flex items-center justify-center text-white group-hover:bg-black transition-colors">
                            <Terminal className="w-5 h-5" />
                        </div>
                        <span className="text-lg font-bold text-gray-900 tracking-tight">DevMock</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-6">
                        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
                            <Link to={getLink('tools/password')} className="hover:text-brand transition-colors">Password</Link>
                            <Link to={getLink('tools/uuid')} className="hover:text-brand transition-colors">UUID</Link>
                            <Link to={getLink('tools/qr-code')} className="hover:text-brand transition-colors">QR Code</Link>
                        </nav>

                        {/* Language Switcher */}
                        <div className="flex gap-2 bg-gray-100 rounded-full p-1">
                            {languages.map(l => (
                                <button
                                    key={l.code}
                                    onClick={() => switchLanguage(l.code)}
                                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${i18n.language === l.code ? 'bg-white text-brand shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    {l.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 w-full mt-16">
                <Outlet />
            </main>

            <footer className="bg-brand-dark text-white pt-20 pb-10">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 text-sm">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Terminal className="text-white w-6 h-6" />
                                <span className="font-bold text-xl">DevMock</span>
                            </div>
                            <p className="text-gray-400 leading-relaxed max-w-xs">
                                {t('footer.tagline')}
                            </p>
                        </div>

                        <div>
                            <h4 className="font-bold text-gray-200 mb-6 uppercase tracking-wider text-xs">{t('footer.security')}</h4>
                            <ul className="space-y-3 text-gray-400">
                                <li><Link to={getLink('tools/password')} className="hover:text-white transition-colors">Password Generator</Link></li>
                                <li><Link to={getLink('tools/hash')} className="hover:text-white transition-colors">Hash Generator</Link></li>
                                <li><Link to={getLink('tools/uuid')} className="hover:text-white transition-colors">UUID Generator</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-gray-200 mb-6 uppercase tracking-wider text-xs">{t('footer.utility')}</h4>
                            <ul className="space-y-3 text-gray-400">
                                <li><Link to={getLink('tools/qr-code')} className="hover:text-white transition-colors">QR Code Generator</Link></li>
                                <li><Link to={getLink('tools/lorem')} className="hover:text-white transition-colors">Lorem Ipsum</Link></li>
                                <li><Link to={getLink('tools/color')} className="hover:text-white transition-colors">Color Generator</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-gray-200 mb-6 uppercase tracking-wider text-xs">{t('footer.data')}</h4>
                            <ul className="space-y-3 text-gray-400">
                                <li><Link to={getLink('tools/address')} className="hover:text-white transition-colors">Address Generator</Link></li>
                                <li><Link to={getLink('tools/identity')} className="hover:text-white transition-colors">Identity Generator</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
                        <p>© {new Date().getFullYear()} DevMock. All rights reserved.</p>
                        <div className="flex gap-6">
                            <Link to={getLink('privacy')} className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
                            <Link to={getLink('terms')} className="hover:text-gray-300 transition-colors">Terms of Use</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
