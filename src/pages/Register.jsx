
import React from 'react';
import { Link } from 'react-router-dom';


import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';


import { setRegisterErrorInitial } from '../store/login_register_store';

import UserService from '../service/UserService';

import MessageBox from '../components/common/MessageBox';

const Register = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const is_registration_error = useSelector((state) => state.loginRegisterSlice.is_registration_error);
  const registration_message = useSelector((state) => state.loginRegisterSlice.registration_message);


  const [name, setname] = useState('');
  const [middle_name, setMiddleName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    return regex.test(email);
  };

  async function register() {

    setEmailError('');

    // Validate email
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (password !== confirm_password) {
      alert('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    if (!username || !email || !password) {
      alert('All fields are required');
      return;
    }
    const user_data = {
      name: name,
      middle_name: middle_name,
      surname: surname,
      username: username,
      email: email,
      password: password,
    };

    dispatch(UserService.userRegister(user_data));
  }


  useEffect(() => {
    if (is_registration_error === 0) {
      setTimeout(() => {
        dispatch(setRegisterErrorInitial());
      }, 1500)
    }
    else if (is_registration_error === 1) {
      setTimeout(() => {
        navigate('/login');
        dispatch(setRegisterErrorInitial());
      }, 600)
    }
  }, [is_registration_error])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100" >

      {
        is_registration_error == 0 &&
        <MessageBox color={'bg-red-500'} message={registration_message} />
      }
      {
        is_registration_error == 1 &&
        <MessageBox color={'bg-green-500'} message={registration_message} />
      }

      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

        <div className="mb-4">
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            id="middle_name"
            placeholder="Enter your middle name"
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={middle_name}
            onChange={(e) => setMiddleName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            id="surname"
            placeholder="Enter your surname"
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm your password"
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={confirm_password}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button 
          onClick={register}
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>

        <p className="mt-4 text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

