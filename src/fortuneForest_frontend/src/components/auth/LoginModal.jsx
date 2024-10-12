import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { fortuneForest_backend } from 'declarations/fortuneForest_backend';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await fortuneForest_backend.verify_user_login_credentials(email, password);
      if (user) {
        toast.success("Login Successful!");
        if (typeof onLoginSuccess === 'function') {
          onLoginSuccess(user);
        }
        onClose();
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full border-4 border-[#75b957]">
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="flex items-center">
            <img src="/fortuneforest.jpg" alt="FortuneForest logo" className="w-10 h-10 mr-3 rounded-full" />
            <h2 className="text-2xl font-bold text-black">Login</h2>
          </div>
          <p className="text-sm text-gray-600 mt-2">Play FortuneForest Now!</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder='m@example.com'
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-[#75b957] rounded-md shadow-sm focus:outline-none focus:ring-[#75b957] focus:border-[#75b957]"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2 bg-white border border-[#75b957] rounded-md shadow-sm focus:outline-none focus:ring-[#75b957] focus:border-[#75b957] pr-10"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FiEyeOff className="h-5 w-5 text-gray-500" /> : <FiEye className="h-5 w-5 text-gray-500" />}
              </button>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#75b957]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#75b957] hover:bg-[#5a9042] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#75b957]"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
