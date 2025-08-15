import React from 'react';

export default function LandingPage() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full h-full p-8 max-w-7xl mx-auto rounded-3xl shadow-2xl overflow-hidden relative" style={{
                backgroundImage: "url('https://placehold.co/1920x1080/FFFFFF/000000?text=Office+Bite+Background')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-85 z-10"></div>
                <div className="relative z-20">
                    <div className="flex items-center justify-between py-4">
                        {/* Logo */}
                        <div className="text-4xl font-extrabold text-gray-800" style={{ fontFamily: 'Pacifico, cursive' }}>Office Bite</div>
                        
                        {/* Navigation */}
                        <nav className="hidden lg:flex items-center space-x-8">
                            <a href="/menu" className="text-gray-600 hover:text-gray-900 transition-colors">Dumplings</a>
                            <a href="/menu" className="text-gray-600 hover:text-gray-900 transition-colors">Recipes</a>
                            <a href="/menu" className="text-gray-600 hover:text-gray-900 transition-colors">Food Menu</a>
                            <a href="/menu" className="text-gray-600 hover:text-gray-900 transition-colors">Order Now</a>
                            <button className="bg-orange-500 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-orange-600 transition-colors">
                                Login
                            </button>
                        </nav>
                    </div>
                    
                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-12">
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
                            <button className="bg-orange-500 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:bg-orange-600 transition-transform transform hover:-translate-y-1">
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
    );
}
