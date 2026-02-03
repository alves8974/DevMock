import React from 'react';

const AdPlaceholder = ({ type = 'native' }) => {
    // Types: 'banner-top' (728x90), 'sidebar' (300x250), 'native' (responsive card usually)

    if (type === 'banner-top') {
        return (
            <div className="w-full max-w-[728px] h-[90px] mx-auto bg-slate-800/40 border border-slate-700/30 rounded flex items-center justify-center mb-8">
                <span className="text-slate-600 text-xs font-mono">ADVERTISEMENT 728x90</span>
            </div>
        );
    }

    if (type === 'sidebar') {
        return (
            <div className="w-[300px] h-[250px] bg-slate-800/40 border border-slate-700/30 rounded flex items-center justify-center my-4">
                <span className="text-slate-600 text-xs font-mono">ADVERTISEMENT 300x250</span>
            </div>
        );
    }

    return (
        <div className="w-full h-24 bg-slate-800/40 border border-slate-700/30 rounded flex items-center justify-center my-4">
            <span className="text-slate-600 text-xs font-mono">NATIVE ADVERTISEMENT</span>
        </div>
    );
};

export default AdPlaceholder;
