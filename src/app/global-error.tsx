'use client';

import React, { useState, useEffect } from 'react';
import { Home, RefreshCw, AlertTriangle, Zap, Cloud } from 'lucide-react';

interface FloatingElement {
    id: number;
    x: number;
    y: number;
    delay: number;
    duration: number;
}

const ErrorPages: React.FC = () => {
    const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);

    useEffect(() => {
        // Generate floating elements for background animation
        const elements: FloatingElement[] = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 2,
            duration: 3 + Math.random() * 2,
        }));
        setFloatingElements(elements);
    }, []);

    const ServerErrorPage: React.FC = () => (
        <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 flex items-center justify-center relative overflow-hidden">
            {/* Floating background elements */}
            {floatingElements.map((element) => (
                <div
                    key={element.id}
                    className="absolute opacity-20"
                    style={{
                        left: `${element.x}%`,
                        top: `${element.y}%`,
                        animationDelay: `${element.delay}s`,
                        animationDuration: `${element.duration}s`,
                    }}
                >
                    <AlertTriangle className="w-6 h-6 text-yellow-400 animate-pulse" />
                </div>
            ))}

            {/* Main content */}
            <div className="text-center z-10 px-6 max-w-4xl">
                {/* Animated 500 */}
                <div className="relative mb-8">
                    <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 animate-pulse">
                        500
                    </h1>
                    <div className="absolute inset-0 text-9xl md:text-[12rem] font-bold text-white opacity-10 animate-ping">
                        500
                    </div>
                </div>

                {/* Animated server illustration */}
                <div className="mb-8 relative">
                    <div className="w-64 h-64 mx-auto relative">
                        {/* Server rack */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative animate-shake">
                                {/* Main server body */}
                                <div className="w-32 h-40 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg mx-auto relative shadow-2xl">
                                    {/* Server panels */}
                                    <div className="absolute top-4 left-2 right-2 h-8 bg-gradient-to-r from-gray-700 to-gray-600 rounded"></div>
                                    <div className="absolute top-14 left-2 right-2 h-8 bg-gradient-to-r from-gray-700 to-gray-600 rounded"></div>
                                    <div className="absolute top-24 left-2 right-2 h-8 bg-gradient-to-r from-gray-700 to-gray-600 rounded"></div>

                                    {/* LED indicators */}
                                    <div className="absolute top-6 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                    <div className="absolute top-16 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse animation-delay-200"></div>
                                    <div className="absolute top-26 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse animation-delay-400"></div>

                                    {/* Ventilation */}
                                    <div className="absolute bottom-4 left-4 right-4 h-6 bg-gray-900 rounded">
                                        <div className="flex space-x-1 p-1">
                                            {Array.from({ length: 6 }).map((_, i: number) => (
                                                <div key={i} className="w-1 h-4 bg-gray-600 rounded-full"></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Error sparks */}
                                {Array.from({ length: 12 }).map((_, i: number) => (
                                    <div
                                        key={i}
                                        className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                                        style={{
                                            left: `${30 + Math.random() * 40}%`,
                                            top: `${20 + Math.random() * 60}%`,
                                            animationDelay: `${i * 0.2}s`,
                                        }}
                                    >
                                        <Zap className="w-4 h-4 text-yellow-400 animate-ping" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Smoke clouds */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
                            <Cloud className="w-12 h-12 text-gray-400 opacity-60 animate-float" />
                        </div>
                        <div className="absolute top-2 left-1/3 transform -translate-x-1/2 -translate-y-4 animation-delay-300">
                            <Cloud className="w-8 h-8 text-gray-500 opacity-40 animate-float" />
                        </div>
                        <div className="absolute top-1 right-1/3 transform translate-x-1/2 -translate-y-4 animation-delay-600">
                            <Cloud className="w-10 h-10 text-gray-400 opacity-50 animate-float" />
                        </div>
                    </div>
                </div>

                {/* Text content */}
                <div className="space-y-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in-up">
                        Server Meltdown!
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in-up animation-delay-300">
                        Our servers are having a bad day and decided to take a coffee break.
                        Don't worry, our tech wizards are on it!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-500">
                        <button className="group bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                            <div className="flex items-center space-x-2">
                                <Home className="w-5 h-5 group-hover:animate-bounce" />
                                <span>Go Home</span>
                            </div>
                        </button>

                        <button className="group bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white border-opacity-30">
                            <div className="flex items-center space-x-2">
                                <RefreshCw className="w-5 h-5 group-hover:animate-spin" />
                                <span>Refresh Page</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="relative">
            <ServerErrorPage />

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
        
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-shake {
          animation: shake 0.8s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
        </div>
    );
};

export default ErrorPages;