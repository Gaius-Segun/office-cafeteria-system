import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppContext } from '../AppContext';

import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';



export default function LoginPage() {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState('');



  const navigate = useNavigate();

  const { setUserEmail, setCart, setLastOrdered } = useAppContext();



  // ✅ Predefined dummy users

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

    <div className="min-h-screen flex">

     

      {/* LEFT SIDE - BACKGROUND IMAGE */}

      <div

        className="hidden md:block w-1/2 bg-cover bg-center"

        style={{

          // ⬇️ PLACE YOUR FRUITS BACKGROUND IMAGE HERE

          backgroundImage: "url('/foode.jpeg')"

        }}

      ></div>



      {/* RIGHT SIDE - LOGIN FORM */}

      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 bg-white">

        <div className="max-w-md w-full mx-auto">

          <h2 className="text-3xl font-bold text-red-500 mb-2">Welcome!</h2>

          {/* New note added here */}

          <p className="text-sm text-gray-500 mb-6">This app is strictly for office employees.</p>

         



          <form onSubmit={handleLogin} className="space-y-4">

            <input

              type="email"

              placeholder="First Name"

              className="w-full p-3 rounded-lg bg-pink-100 text-gray-900 placeholder-gray-500 focus:outline-none"

              value={email}

              onChange={(e) => setEmail(e.target.value)}

            />



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



            {error && <p className="text-red-500 text-sm">{error}</p>}



            <p className="text-sm text-red-500 cursor-pointer">Forgot your password?</p>



            <button

              type="submit"

              className="w-full bg-pink-400 hover:bg-pink-500 text-white py-3 rounded-lg font-semibold"

            >

              Sign In

            </button>



            <div className="flex items-center justify-center my-4">

              <span className="text-gray-500">OR</span>

            </div>



            <div className="flex justify-center space-x-6 text-2xl text-gray-700">

              <FaGoogle className="cursor-pointer hover:text-red-500" />

              <FaFacebookF className="cursor-pointer hover:text-blue-500" />

              <FaApple className="cursor-pointer hover:text-black" />

            </div>

          </form>

        </div>

      </div>

    </div>

  );

}