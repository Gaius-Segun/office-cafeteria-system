import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { setUserEmail, setCart, setLastOrdered } = useAppContext();

  // ✅ Predefined dummy users (for testing)
  const users = {
    "gaiussegun37@gmail.com": "gesundheit.555",
    "walker123@gmail.com": "test123",
    "marydoe@gmail.com": "pass456"
  };

  const handleLogin = (e) => {
    e.preventDefault();
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
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-fixed bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://i.pinimg.com/1200x/96/b1/7b/96b17b608d947ed90b19d5be54c952bd.jpg')", // ⬅️ Full page background image
        backgroundSize: "cover" // Change to "contain" if you want the full image without cropping
      }}
    >
      {/* LOGIN FORM CARD */}
      <div className="bg-white bg-opacity-90 p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-red-500 mb-2 text-center">Welcome!</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          This app is strictly for office employees.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* ⬇️ EMAIL INPUT FIELD */}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 rounded-lg bg-pink-100 text-gray-900 placeholder-gray-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* ⬇️ PASSWORD INPUT FIELD */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full p-3 rounded-lg border border-pink-300 text-gray-900 placeholder-gray-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          {/* ERROR MESSAGE */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* FORGOT PASSWORD */}
          <p className="text-sm text-red-500 cursor-pointer">
            Forgot your password?
          </p>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full bg-pink-400 hover:bg-pink-500 text-white py-3 rounded-lg font-semibold"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
