

import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import TableService from '../../service/TableService';


import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";


function FavoriteIconComponent({ table_id, rule }) {

    const dispatch = useDispatch();

    const is_auth = useSelector((state) => state.loginRegisterSlice.is_auth);

    const [cond, setCond] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (rule === 'add') {
            setCond(false);
        }
        else if (rule === 'delete') {
            setCond(true);
        }
    }, [rule]);

    return (
        <>

            <div
                onClick={(e) => {
                    e.stopPropagation();
                    if (is_auth === true) {
                        setCond(!cond);
                        if (rule === 'add') {
                            dispatch(TableService.addToFavorites(table_id));
                        }
                        else if (rule === 'delete') {
                            dispatch(TableService.deleteFromFavorites(table_id));
                        }
                    }
                    else {
                        navigate('/login');
                    }
                }}
                onMouseEnter={() => {
                    if (rule === 'add') {
                        setCond(true);
                    }
                    else if (rule === 'delete') {
                        setCond(false);
                    }
                }}
                onMouseLeave={() => {
                    if (rule === 'add') {
                        setCond(false);
                    }
                    else if (rule === 'delete') {
                        setCond(true);
                    }
                }}
                className='w-8 h-8 flex items-center justify-center rounded-full cursor-pointer border-white'
            >

                {cond ? (
                    <FaStar className='text-lg text-yellow-300 m-auto ' />
                ) : (
                    <CiStar className='text-lg text-gray-500 m-auto' />
                )}

            </div>
        </>
    )
}

export default FavoriteIconComponent