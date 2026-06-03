'use client';

import React, { useState, useEffect } from 'react';
import { Home, RefreshCw, Star } from 'lucide-react';

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

    const NotFoundPage: React.FC = () => (
        <div className="bg-gradient-to-br py-8 from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
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
                    <Star className="w-6 h-6 text-white animate-pulse" />
                </div>
            ))}

            {/* Main content */}
            <div className="text-center flex items-center z-10 px-6 max-w-4xl">
                {/* Animated astronaut illustration */}
                <div className="mb-8 relative">
                    <div className="w-48 h-48 mx-auto relative">
                        {/* Planet/moon */}
                        <div className="absolute top-4 right-8 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-spin-slow shadow-lg">
                            <div className="absolute inset-2 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full">
                                <div className="absolute inset-1 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full"></div>
                            </div>
                        </div>



                        {/* Astronaut body */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative animate-float">
                                {/* Helmet */}
                                <div className="w-24 h-24 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full mx-auto mb-2 relative overflow-hidden">
                                    <div className="absolute inset-2 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-30"></div>
                                    <div className="absolute inset-4 bg-white rounded-full opacity-80"></div>
                                    {/* Reflection */}
                                    <div className="absolute top-2 left-2 w-4 h-4 bg-white rounded-full opacity-60"></div>
                                </div>

                                {/* Body */}
                                <div className="w-20 h-28 bg-gradient-to-b from-gray-200 to-gray-400 rounded-2xl mx-auto relative">
                                    <div className="absolute inset-2 bg-gradient-to-b from-blue-500 to-purple-600 rounded-xl opacity-80"></div>
                                    {/* Control panel */}
                                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-800 rounded opacity-80"></div>
                                    <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-green-400 rounded animate-pulse"></div>
                                </div>

                                {/* Arms */}
                                <div className="absolute top-8 -left-6 w-12 h-4 bg-gradient-to-r from-gray-200 to-gray-400 rounded-full transform rotate-12"></div>
                                <div className="absolute top-8 -right-6 w-12 h-4 bg-gradient-to-r from-gray-200 to-gray-400 rounded-full transform -rotate-12"></div>

                                {/* Legs */}
                                <div className="absolute -bottom-2 left-2 w-6 h-16 bg-gradient-to-b from-gray-200 to-gray-400 rounded-full"></div>
                                <div className="absolute -bottom-2 right-2 w-6 h-16 bg-gradient-to-b from-gray-200 to-gray-400 rounded-full"></div>
                            </div>
                        </div>

                        {/* Floating particles */}
                        {Array.from({ length: 8 }).map((_, i: number) => (
                            <div
                                key={i}
                                className="absolute w-2 h-2 bg-white rounded-full opacity-60"
                                style={{
                                    left: `${20 + i * 10}%`,
                                    top: `${30 + Math.sin(i) * 20}%`,
                                    animationDelay: `${i * 0.3}s`,
                                }}
                            >
                                <div className="w-full h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-ping"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Text content */}
                <div className="space-y-4">
                    <div className='flex items-center gap-4'>
                        <div className="relative mb-0">
                            <h1 className="text-xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-pulse">
                                404
                            </h1>
                        </div>
                        <h2 className="text-4xl text-left md:text-5xl font-bold text-white animate-fade-in-up">
                            Lost in Space!
                        </h2>
                    </div>
                    <p className="text-xl text-left  text-gray-300 max-w-2xl mx-auto animate-fade-in-up animation-delay-300">
                        Oops! The page you're looking for has drifted into the cosmic void.
                        Let's get you back to familiar territory.
                    </p>

                    <div className="flex text-left flex-col sm:flex-row gap-4 justify-start items-center animate-fade-in-up animation-delay-500">
                        <button className="group cursor-pointer bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                            <div className="flex items-center space-x-2">
                                <Home className="w-5 h-5 group-hover:animate-bounce" />
                                <span>Return Home</span>
                            </div>
                        </button>

                        <button className="grou cursor-pointer bg-gray-500 hover:bg-opacity-30 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-gray-500 border-opacity-30">
                            <div className="flex items-center space-x-2">
                                <RefreshCw className="w-5 h-5 group-hover:animate-spin" />
                                <span>Try Again</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="relative flex justify-center">
            <div className='border border-px w-3xl rounded-3xl overflow-hidden'>
                <NotFoundPage />
            </div>
            {/*  */}
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