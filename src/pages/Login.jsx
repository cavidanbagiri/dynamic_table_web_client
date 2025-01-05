import React from 'react';
import { useState, useEffect } from 'react';


import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import UserService from '../service/UserService';

import { setLoginErrorInitial } from '../store/login_register_store';

import MessageBox from '../components/common/MessageBox';

const Login = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const is_login_error = useSelector((state) => state.loginRegisterSlice.is_login_error);
    const login_pending = useSelector((state) => state.loginRegisterSlice.login_pending);
    const login_message = useSelector((state) => state.loginRegisterSlice.login_message);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function login() {
        const user_data = {
            email: email,
            password: password,
        };
        dispatch(UserService.userLogin(user_data));
    }


    useEffect(() => {
        if (is_login_error === 0) {
            setTimeout(() => {
                dispatch(setLoginErrorInitial());
            }, 1500)
        }
        else if (is_login_error === 1) {
            setTimeout(() => {
                navigate('/');
                dispatch(setLoginErrorInitial());
            }, 600)
        }
    }, [is_login_error])

    return (
        <div className="flex items-center justify-center  min-h-screen bg-gray-100 ">


            {
                is_login_error == 0 &&
                <MessageBox color={'bg-red-500'} message={login_message} />
            }
            {
                is_login_error == 1 &&
                <MessageBox color={'bg-green-500'} message={login_message} />
            }

            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

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

                {
                    !login_pending ?
                        <button
                            onClick={login}
                            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition duration-200"
                        >
                            Login
                        </button>
                        :
                        <Box className="flex justify-center" sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                }


                <p className="mt-4 text-center text-gray-600">
                    Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
