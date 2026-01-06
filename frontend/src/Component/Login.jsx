import React, { useState } from 'react';
import { login } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUserCircle } from 'react-icons/fa';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      setSuccess('Login successful! Redirecting...');
      // Delay a bit so user can see success message
      setTimeout(() => {
        navigate('/admin');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-600 via-indigo-700 to-purple-800 px-6 py-12">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10 sm:p-12">
        {/* Icon at the top */}
        <div className="flex justify-center mb-8">
          <FaUserCircle className="text-blue-600" size={72} aria-hidden="true" />
        </div>

        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center tracking-wide">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-200"
              autoComplete="email"
              aria-describedby="emailHelp"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition pr-12"
              autoComplete="current-password"
              aria-describedby="passwordHelp"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-gray-400 hover:text-blue-600 focus:outline-none"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <p
              className="text-red-600 bg-red-100 px-4 py-2 rounded-md text-center font-medium"
              role="alert"
            >
              {error}
            </p>
          )}

          {/* Success Message */}
          {success && (
            <p
              className="text-green-700 bg-green-100 px-4 py-2 rounded-md text-center font-medium"
              role="alert"
            >
              {success}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg bg-blue-600 text-white text-lg font-semibold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ${
              loading ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
