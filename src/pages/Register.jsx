
import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
        
        <div className="mb-4">
          
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm your password"
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>
        
        <p className="mt-4 text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

