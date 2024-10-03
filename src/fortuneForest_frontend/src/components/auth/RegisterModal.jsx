import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { fortuneForest_backend } from 'declarations/fortuneForest_backend';

const RegisterModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      await fortuneForest_backend.create_user(email, password);
      toast.success("Registration Successful!");
      onClose();
    } catch (error) {
      toast.error("Registration Failed: " + error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full border-4 border-[#75b957]">
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="flex items-center">
            <img src="/fortuneforest.jpg" alt="FortuneForest logo" className="w-10 h-10 mr-3 rounded-full" />
            <h2 className="text-2xl font-bold text-black">Create Account</h2>
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Welcome EcoGamer! Join and Help us to Reforestation the environment
          </p>
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
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
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-[#75b957] rounded-md shadow-sm focus:outline-none focus:ring-[#75b957] focus:border-[#75b957]"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-[#75b957] rounded-md shadow-sm focus:outline-none focus:ring-[#75b957] focus:border-[#75b957]"
              required
            />
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
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
