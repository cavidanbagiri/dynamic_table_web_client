

import React from 'react'


import { CiHome } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { CiViewTable } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { PiFoldersLight } from "react-icons/pi";




function NavbarItemComponent(props) {
  return (
    <div className='relative text-white hover:bg-gray-100 px-[10px] py-[10px] flex items-center rounded-lg'>
            <span>
                {props.iconValue === 'Home' && <CiHome className={`${props.selected === 'Home' ? 'text-indigo-600 ' : 'text-black'} my-3 text-3xl`} />}
                {props.iconValue === 'Table' && <CiViewTable className={`${props.selected === 'Table' ? 'text-indigo-600 ' : 'text-black'} my-3 text-3xl`} />}
                {props.iconValue === 'Folder' && <PiFoldersLight className={`${props.selected === 'Folder' ? 'text-indigo-600 ' : 'text-black'} my-3 text-3xl`} />}
                {props.iconValue === 'Profile' && <CiUser className={`${props.selected === 'Profile' ? 'text-indigo-600' : 'text-black'} my-3 text-3xl` }/>}
                {props.iconValue === 'Login' && <CiLogin className={`${props.selected === 'Login' ? 'text-indigo-600' : 'text-black'} my-3 text-3xl` }/>}
                {props.iconValue === 'Logout' && <CiLogout className={`${props.selected === 'Logout' ? 'text-indigo-600' : 'text-black'} my-3 text-3xl` }/>}
            </span>
            {/* {
                props.isShown &&
                <div>
                    <span
                        style={{fontWeight: 600}}
                        className="text-ellipsis tooltip-box-animation absolute top-3 left-10 ml-1 bg-slate-900 py-3 px-5 text-white border text-xl rounded-md flex">
                        {props.iconValue}
                    </span>
                </div>

            } */}

        </div>
  )
}

export default NavbarItemComponent