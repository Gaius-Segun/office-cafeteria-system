import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    // useNavigate hook for programmatic navigation
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Handle the button click to navigate to the login page
    const handleExploreClick = () => {
        navigate('/login');
    };

    // Track mouse position for parallax effects
    const handleMouseMove = (e) => {
        setMousePosition({
            x: (e.clientX / window.innerWidth) * 100,
            y: (e.clientY / window.innerHeight) * 100
        });
    };

    useEffect(() => {
        // Trigger animations after component mounts
        setTimeout(() => setIsLoaded(true), 100);
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen font-inter relative overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating food elements */}
                <div className="absolute top-20 left-16 text-6xl animate-float delay-300 opacity-20">🍔</div>
                <div className="absolute top-40 right-20 text-4xl animate-float delay-700 opacity-15">🍕</div>
                <div className="absolute bottom-32 left-1/4 text-5xl animate-float delay-1000 opacity-20">🥗</div>
                <div className="absolute bottom-20 right-1/3 text-3xl animate-float delay-1500 opacity-25">🍟</div>
                <div className="absolute top-1/2 left-10 text-4xl animate-float delay-2000 opacity-15">🌮</div>
                
                {/* Geometric shapes */}
                <div 
                    className="absolute top-32 right-1/4 w-32 h-32 bg-orange-200/30 rounded-full animate-pulse blur-sm"
                    style={{
                        transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
                    }}
                ></div>
                <div 
                    className="absolute bottom-40 left-1/6 w-24 h-24 bg-red-200/20 rounded-full animate-bounce-slow blur-sm"
                    style={{
                        transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`
                    }}
                ></div>
                <div 
                    className="absolute top-1/3 right-16 w-16 h-16 bg-pink-200/25 rounded-full animate-ping opacity-60"
                    style={{
                        transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
                    }}
                ></div>
            </div>

            <div className="flex items-center justify-center min-h-screen relative z-10">
                <div className="w-full max-w-7xl mx-auto p-8">
                    {/* Enhanced Navigation Bar */}
                    <div className={`flex items-center justify-between py-6 mb-8 transform transition-all duration-1000 ${
                        isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
                    }`}>
                        {/* Logo with enhanced styling */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                            <div 
                                className="relative text-5xl font-extrabold bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent px-6 py-3 rounded-2xl backdrop-blur-sm transform hover:scale-105 transition-all duration-300 cursor-pointer"
                                style={{ fontFamily: 'Pacifico, cursive' }}
                            >
                                Office Bites
                            </div>
                        </div>

                        {/* Navigation items */}
                        <div className="hidden md:flex items-center space-x-8">
                            <button className="text-gray-700 hover:text-orange-500 font-semibold transition-colors duration-300 transform hover:scale-105">
                                About
                            </button>
                            <button className="text-gray-700 hover:text-orange-500 font-semibold transition-colors duration-300 transform hover:scale-105">
                                Menu
                            </button>
                            <button className="text-gray-700 hover:text-orange-500 font-semibold transition-colors duration-300 transform hover:scale-105">
                                Contact
                            </button>
                        </div>
                    </div>
                    
                    {/* Main Hero Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
                        {/* Left Section (Enhanced Text) */}
                        <div className={`space-y-8 transform transition-all duration-1200 delay-300 ${
                            isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
                        }`}>
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-orange-200/50 shadow-lg animate-fade-in-up">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                <span className="text-sm font-semibold text-gray-700">Now Available for Office Workers</span>
                            </div>

                            {/* Main Heading */}
                            <div className="space-y-4">
                                <h1 className="text-6xl lg:text-8xl font-black text-gray-900 leading-[0.9] tracking-tight">
                                    The <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse-gentle">Easiest</span>
                                    <br />
                                    Part of Your
                                    <br />
                                    <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">Day</span>
                                </h1>
                                <div className="w-24 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-width-expand"></div>
                            </div>

                            {/* Subtitle */}
                            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-medium max-w-lg">
                                Fuel your productivity with <span className="text-orange-600 font-bold">delicious</span> and convenient office meals.
                            </p>

                            {/* Features List */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                        <span className="text-green-600 text-sm">✓</span>
                                    </div>
                                    <span className="font-medium">Manage your daily allowance effortlessly</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                        <span className="text-green-600 text-sm">✓</span>
                                    </div>
                                    <span className="font-medium">Order your favorite meals instantly</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                        <span className="text-green-600 text-sm">✓</span>
                                    </div>
                                    <span className="font-medium">Track your order history with ease</span>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button
                                    onClick={handleExploreClick}
                                    className="group relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-5 px-10 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                    <div className="relative flex items-center gap-3">
                                        <span className="text-lg">🚀</span>
                                        <span>Start Your Journey</span>
                                        <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">→</span>
                                    </div>
                                    {/* Shimmer effect */}
                                    <div className="absolute inset-0 bg-white/20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                                </button>
                                
                                <button className="group bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 font-semibold py-5 px-8 rounded-2xl border-2 border-gray-200/50 hover:border-orange-300 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg group-hover:animate-bounce">📱</span>
                                        <span>View Demo</span>
                                    </div>
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-8 pt-8 border-t border-gray-200/50">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-orange-600">500+</div>
                                    <div className="text-sm text-gray-600">Happy Users</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-red-600">50+</div>
                                    <div className="text-sm text-gray-600">Menu Items</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-pink-600">24/7</div>
                                    <div className="text-sm text-gray-600">Support</div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Right Section (Enhanced Visual) */}
                        <div className={`relative flex justify-center items-center transform transition-all duration-1200 delay-600 ${
                            isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
                        }`}>
                            <div className="relative">
                                {/* Main food hero image */}
                                <div 
                                    className="w-96 h-96 lg:w-[500px] lg:h-[500px] rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 relative"
                                    style={{
                                        backgroundImage: "url('https://i.pinimg.com/736x/dc/bf/09/dcbf09334b88a24e7ebb9ef24a52657e.jpg')",
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                >
                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                                    
                                    {/* Floating elements on the image */}
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg animate-bounce-gentle">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                            <span className="text-sm font-semibold text-gray-800">Fresh Daily</span>
                                        </div>
                                    </div>
                                    
                                    <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg">
                                        <div className="text-2xl font-bold text-gray-800">₦500</div>
                                        <div className="text-sm text-gray-600">Average meal cost</div>
                                    </div>
                                </div>

                                {/* Floating cards around the main image */}
                                <div className="absolute -top-8 -left-8 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl animate-float delay-500">
                                    <div className="text-3xl mb-2">⭐</div>
                                    <div className="text-sm font-semibold text-gray-800">4.9 Rating</div>
                                </div>
                                
                                <div className="absolute -bottom-8 -right-8 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl animate-float delay-1200">
                                    <div className="text-3xl mb-2">🚚</div>
                                    <div className="text-sm font-semibold text-gray-800">Quick Delivery</div>
                                </div>

                                {/* Glow effects */}
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-3xl blur-2xl animate-pulse -z-10"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { 
                        transform: translateY(0px) rotate(0deg);
                    }
                    50% { 
                        transform: translateY(-20px) rotate(3deg);
                    }
                }
                
                @keyframes bounce-gentle {
                    0%, 100% { 
                        transform: translateY(0);
                    }
                    50% { 
                        transform: translateY(-5px);
                    }
                }
                
                @keyframes bounce-slow {
                    0%, 100% { 
                        transform: translateY(0);
                    }
                    50% { 
                        transform: translateY(-10px);
                    }
                }
                
                @keyframes pulse-gentle {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.8; }
                }
                
                @keyframes width-expand {
                    from { width: 0; }
                    to { width: 6rem; }
                }
                
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                
                .animate-bounce-gentle {
                    animation: bounce-gentle 3s infinite;
                }
                
                .animate-bounce-slow {
                    animation: bounce-slow 4s infinite;
                }
                
                .animate-pulse-gentle {
                    animation: pulse-gentle 3s infinite;
                }
                
                .animate-width-expand {
                    animation: width-expand 1s ease-out 0.8s forwards;
                    width: 0;
                }
                
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out;
                }
                
                .delay-300 { animation-delay: 300ms; }
                .delay-500 { animation-delay: 500ms; }
                .delay-700 { animation-delay: 700ms; }
                .delay-1000 { animation-delay: 1000ms; }
                .delay-1200 { animation-delay: 1200ms; }
                .delay-1500 { animation-delay: 1500ms; }
                .delay-2000 { animation-delay: 2000ms; }
            `}</style>
        </div>
    );
}