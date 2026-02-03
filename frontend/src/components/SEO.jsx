import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SEO = ({ title, description, keywords, canonical, type = 'website', schema }) => {
    const { i18n } = useTranslation();
    const siteTitle = 'DevMock';
    const finalTitle = title ? `${title} | ${siteTitle}` : siteTitle;

    // Construct canonical URL based on current language
    const baseUrl = 'https://devmock.com';
    const currentLang = i18n.language || 'en';

    // If canonical is provided, it might be the base path (e.g., /tools/uuid). 
    // We need to inject the language to make it specific.
    // However, usually canonical is passed as full URL. Let's assume passed canonical is GENERIC and we suffix it, 
    // OR we just use window.location if not provided.

    // Let's rely on constructing it from window location for now to be safe with the new router
    // accessing window in render is safe with Helmet as it defers.
    const path = window.location.pathname;
    const finalCanonical = `${baseUrl}${path}`;

    // Generate hreflang tags
    // Logic: distinct URL for each language.
    // If path is /en/tools/uuid, the alternate is /pt/tools/uuid
    const cleanPath = path.replace(/^\/(en|pt)/, ''); // Remove current lang prefix
    const enUrl = `${baseUrl}/en${cleanPath}`;
    const ptUrl = `${baseUrl}/pt${cleanPath}`;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <html lang={currentLang} />
            <title>{finalTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={finalCanonical} />

            {/* Hreflang Tags for SEO */}
            <link rel="alternate" hreflang="en" href={enUrl} />
            <link rel="alternate" hreflang="pt" href={ptUrl} />
            <link rel="alternate" hreflang="x-default" href={enUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={finalCanonical} />
            <meta property="og:site_name" content={siteTitle} />
            <meta property="og:locale" content={currentLang} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={description} />

            {/* Structured Data (JSON-LD) */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
