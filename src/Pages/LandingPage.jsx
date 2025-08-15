import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    // useNavigate hook for programmatic navigation
    const navigate = useNavigate();

    // Handle the button click to navigate to the login page
    const handleExploreClick = () => {
        navigate('/login');
    };

    return (
        <>
            {/* Embedded CSS for animations */}
            <style>
                {`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes backgroundZoom {
                    from {
                        transform: scale(1);
                    }
                    to {
                        transform: scale(1.05);
                    }
                }

                .animate-fadeInUp {
                    animation: fadeInUp 1s ease-out forwards;
                }

                .animate-backgroundZoom {
                    animation: backgroundZoom 30s ease-in-out infinite alternate;
                }
                `}
            </style>
            
            <div className="flex items-center justify-center min-h-screen font-inter">
                <div 
                    className="w-full h-full p-8 max-w-7xl mx-auto rounded-3xl shadow-2xl overflow-hidden relative transform transition-transform duration-300" 
                    style={{
                        backgroundImage: "url('https://i.pinimg.com/736x/dc/bf/09/dcbf09334b88a24e7ebb9ef24a52657e.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    {/* The semi-transparent overlay to make text readable */}
                    <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-50 z-10"></div>
                    
                    {/* The div for the background zoom animation */}
                    <div className="absolute top-0 left-0 w-full h-full z-0 animate-backgroundZoom" style={{
                         backgroundImage: "url('https://i.pinimg.com/736x/dc/bf/09/dcbf09334b88a24e7ebb9ef24a52657e.jpg')",
                         backgroundSize: 'cover',
                         backgroundPosition: 'center',
                    }}></div>

                    <div className="relative z-20">
                        <div className="flex items-center justify-between py-4">
                            {/* Logo with a new colorful gradient and bold text */}
                            <div className="text-4xl font-extrabold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent" style={{ fontFamily: 'Pacifico, cursive' }}>Office Bite</div>
                        </div>
                        
                        {/* Main Content Grid with fade-in animation */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-12 animate-fadeInUp">
                            {/* Left Section (Text) */}
                            <div className="p-4 lg:p-8">
                                <h2 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-4">
                                    The Easiest Part <br/>of Your Day
                                </h2>
                                <p className="text-lg text-gray-600 mb-8 max-w-lg">
                                    Fuel your productivity with delicious and convenient office meals.
                                </p>
                                <p className="text-sm text-gray-500 mb-8 max-w-md">
                                    Office Bite streamlines your lunch experience, allowing you to manage your daily allowance, order your favorite meals, and track your history with ease.
                                </p>
                                <button
                                    onClick={handleExploreClick}
                                    className="bg-orange-500 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:bg-orange-600 transition-transform transform hover:-translate-y-1 animate-pulse"
                                >
                                    Explore Now
                                </button>
                            </div>
                            
                            {/* Right Section (Image) */}
                            <div className="relative flex justify-center items-center">
                                {/* The background image now serves this purpose. */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
