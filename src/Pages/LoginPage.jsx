import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setUserEmail, setCart, setLastOrdered } = useAppContext();

  // Predefined dummy users (for testing)
  const users = {
    "gaiussegun37@gmail.com": "gesundheit.555",
    "walker123@gmail.com": "test123",
    "marydoe@gmail.com": "pass456"
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (users[email] && users[email] === password) {
      setUserEmail(email);
      const savedData = JSON.parse(localStorage.getItem(`userData_${email}`)) || {
        cart: [],
        lastOrdered: []
      };
      setCart(savedData.cart);
      setLastOrdered(savedData.lastOrdered);
      navigate('/dashboard');
    } else {
      setError('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Floating shapes animation */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-float-slow"></div>
        
        {/* Food pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('https://i.pinimg.com/1200x/96/b1/7b/96b17b608d947ed90b19d5be54c952bd.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-twinkle"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-300/50 rounded-full animate-twinkle-delayed"></div>
        <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-pink-300/40 rounded-full animate-twinkle-slow"></div>
        <div className="absolute top-1/2 left-1/5 w-2 h-2 bg-purple-300/30 rounded-full animate-twinkle"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        {/* Brand Header */}
        <div className="absolute top-8 left-8 animate-slide-down">
          <h1 className="text-3xl font-bold text-white flex items-center space-x-2">
            <span className="text-4xl animate-bounce">🍽️</span>
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Office Bites
            </span>
          </h1>
        </div>

        {/* Login Form Card */}
        <div className="group bg-white/95 backdrop-blur-xl p-12 rounded-3xl shadow-2xl w-full max-w-lg border border-white/20 animate-scale-in hover:shadow-3xl transition-all duration-500 relative overflow-hidden">
          
          {/* Card Background Decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-200/20 to-indigo-200/20 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            {/* Welcome Section */}
            <div className="text-center mb-10 animate-fade-in">
              <div className="inline-block p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl mb-6 animate-bounce-in">
                <span className="text-5xl">👋</span>
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                Welcome Back!
              </h2>
              <p className="text-gray-600 text-lg font-medium">
                Sign in to access your office cafeteria
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-4 animate-expand"></div>
            </div>

            <form onSubmit={handleLogin} className="space-y-8">
              {/* Email Input */}
              <div className="space-y-2 animate-slide-in-left">
                <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <span>📧</span>
                  <span>Email Address</span>
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:bg-white transition-all duration-300 group-hover:shadow-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2 animate-slide-in-right">
                <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <span>🔐</span>
                  <span>Password</span>
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="w-full p-4 pr-12 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:bg-white transition-all duration-300 group-hover:shadow-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl hover:scale-110 transition-transform duration-200 focus:outline-none"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl animate-shake flex items-center space-x-3">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <p className="font-semibold">Authentication Failed</p>
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              )}

              {/* Forgot Password */}
              <div className="text-center animate-fade-in">
                <button
                  type="button"
                  className="text-purple-600 hover:text-pink-600 text-sm font-medium hover:underline transition-colors duration-200"
                >
                  Forgot your password? 🤔
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden animate-bounce-in"
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:animate-shine"></div>
                
                {/* Button content */}
                <div className="relative z-10 flex items-center justify-center space-x-3">
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl group-hover:animate-bounce">🚀</span>
                      <span>Sign In to Cafeteria</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </>
                  )}
                </div>
                
                {/* Button glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-10 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 animate-fade-in-up">
              <p className="text-sm font-semibold text-blue-800 mb-3 flex items-center space-x-2">
                <span>🧪</span>
                <span>Demo Credentials:</span>
              </p>
              <div className="space-y-2 text-xs text-blue-700">
                <p><span className="font-medium">Email:</span> gaiussegun37@gmail.com</p>
                <p><span className="font-medium">Password:</span> gesundheit.555</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 text-center text-white/70 animate-fade-in">
          <p className="text-sm">
            🔒 Secure login for office employees only
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes twinkle-delayed {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(2); }
        }
        
        @keyframes twinkle-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.3); }
        }
        
        @keyframes scale-in {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes slide-down {
          from { transform: translateY(-30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes bounce-in {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes expand {
          from { width: 0; }
          to { width: 5rem; }
        }
        
        @keyframes slide-in-left {
          from { transform: translateX(-30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slide-in-right {
          from { transform: translateX(30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
          20%, 40%, 60%, 80% { transform: translateX(3px); }
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        
        .animate-twinkle-delayed {
          animation: twinkle-delayed 4s ease-in-out infinite;
        }
        
        .animate-twinkle-slow {
          animation: twinkle-slow 5s ease-in-out infinite;
        }
        
        .animate-scale-in {
          animation: scale-in 0.8s ease-out;
        }
        
        .animate-slide-down {
          animation: slide-down 1s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-bounce-in {
          animation: bounce-in 1s ease-out;
        }
        
        .animate-expand {
          animation: expand 1s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-out;
        }
        
        .animate-shine {
          animation: shine 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}