import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LanguageRedirector = () => {
    const { i18n } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        // Detect browser language or fallback to 'en'
        // i18next-browser-languagedetector already sets i18n.language
        // but we want to ensure we redirect to a supported URL.

        let targetLang = i18n.language;

        // Normalize language code (e.g., 'pt-BR' -> 'pt')
        if (targetLang.startsWith('pt')) targetLang = 'pt';
        else targetLang = 'en'; // Default fallback

        navigate(`/${targetLang}`, { replace: true });
    }, [i18n.language, navigate]);

    return null; // Or a loading spinner
};

export default LanguageRedirector;
