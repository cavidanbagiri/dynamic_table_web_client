

import React from 'react'

import { Outlet, Link } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'

import { userLogout } from '../store/login_register_store';

import { triggerShowMyTables } from '../store/common_store';

import NavbarItemComponent from '../components/navbar/navbar_item_component'


function Navbar() {

    const dispatch = useDispatch();

    const is_auth = useSelector((state) => state.loginRegisterSlice.is_auth);



    return (

        <div className='relative w-screen'>

            {/* Check if User Authenticated */}

            <div className='sticky top-0 left-0 z-20  float-left h-screen flex flex-col items-center p-2 rounded-md bg-white'>
                <div className='flex flex-col justify-between h-screen '>
                    <div className='flex flex-col items-center'>
                        <Link to='/' onClick={() => {  }}>
                            <NavbarItemComponent iconName={'fa-house'} iconSize={'text-xl'} iconValue={'Home'} />
                        </Link>

                        <div className='cursor-pointer' onClick={() => { 
                            dispatch(triggerShowMyTables())
                         }}>
                            <NavbarItemComponent iconName={'fa-folder'} iconSize={'text-2xl'} iconValue={'Folder'} />
                        </div>

                        <Link to="/table" onClick={() => {  }}>
                            <NavbarItemComponent iconName={'fa-plus'} iconSize={'text-2xl'} iconValue={'Table'} />
                        </Link>
                        {
                            is_auth === true ?
                                <Link to="/profile" onClick={() => { }}>
                                    <NavbarItemComponent iconName={'fa-plus'} iconSize={'text-2xl'} iconValue={'Profile'} />
                                </Link>
                                :
                                <Link to="/login" onClick={() => {  }}>
                                    <NavbarItemComponent iconName={'fa-plus'} iconSize={'text-2xl'} iconValue={'Login'} />
                                </Link>
                        }
                        {
                            is_auth === true &&
                            <div onClick={() => { 
                                const userResponse = confirm("Do you want to proceed?");
                                if (userResponse) {dispatch(userLogout());}
                            }} >
                                
                                <NavbarItemComponent iconName={'fa-circle-user'} iconSize={'text-2xl'} iconValue={'Logout'} />
                            </div>
                        }

                    </div>
                </div>
            </div>

            <Outlet />


        </div>

    )
}

export default Navbar