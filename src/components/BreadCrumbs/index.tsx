'use client';

import Link from "next/link";

type BreadcrumbItem = {
    current?: boolean;
    href: string;
    label: string;
};

const Breadcrumbs = ({ items }: {
    items: BreadcrumbItem[]
}) => {
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-0 flex-wrap">
                {items.map((item, index) => (
                    <li key={index} className="inline-flex items-center breadcrumb-item">
                        {/* Render link if not the current item, otherwise render span */}
                        {item?.current ? (
                            <span className="text-blue-700 text-sm font-semibold px-2 py-1">
                                {item.label}
                            </span>
                        ) : (
                            <Link
                                href={item.href}
                                className="inline-flex items-center rounded-md py-1 text-sm font-medium text-slate-500 transition-colors duration-200 hover:text-cyan-700"
                            >
                                {/* Conditionally render home icon for the first item */}
                                {index === 0 && (
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                                    </svg>
                                )}
                                {item.label}
                            </Link>
                        )}
                        {/* Add separator if it's not the last item */}
                        {index < items.length - 1 && (
                            <span className="mx-2 text-gray-400">/</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs; // Export the main App component
