import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ToolCard = ({ title, description, to, preview }) => {
    return (
        <Link to={to} className="group block h-full">
            <div className="h-full bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-brand/30 hover:-translate-y-1 flex flex-col">
                {/* Visual Preview Section - Fixed Height */}
                <div className="h-48 bg-gray-50 border-b border-gray-100 relative overflow-hidden flex items-center justify-center p-6 group-hover:bg-blue-50/30 transition-colors">
                    <div className="w-full text-center transition-transform duration-500 group-hover:scale-105">
                        {preview}
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand transition-colors">
                        {title}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                        {description}
                    </p>

                    <div className="flex items-center text-brand font-bold text-sm gap-2 group-hover:gap-3 transition-all mt-auto">
                        Open Tool <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ToolCard;
