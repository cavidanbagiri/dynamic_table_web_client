

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
                onClick={() => {
                    if (is_auth === true) {
                        setCond(!cond);

                        if (rule === 'add') {
                            dispatch(TableService.addToFavorites(table_id));
                            // dispatch(TableService.fetchFavoriteTables());
                        }
                        else if (rule === 'delete') {
                            dispatch(TableService.deleteFromFavorites(table_id));
                            // dispatch(TableService.fetchFavoriteTables());
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
                className='w-10 h-10 flex items-center justify-center rounded-full cursor-pointer'
            >


                {cond ? (
                    <FaStar className='text-xl text-yellow-300 m-auto ' />
                ) : (
                    <CiStar className='text-xl text-gray-500 m-auto' />
                )}

            </div>
        </>
    )
}

export default FavoriteIconComponent