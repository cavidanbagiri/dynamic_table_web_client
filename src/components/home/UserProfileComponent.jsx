
import React from 'react'

import profile_image from '../../assets/profile_image.jpg'

function UserProfileComponent() {
  return (
    

    <div className='flex flex-row h-30 items-center bg-gray-50 p-2 mx-3 mt-2'>
      {

        localStorage.getItem('profile_image') !== "null" ?
          <div className='flex flex-row items-center'>
            <img className='w-16 h-16 rounded-full'
              src={localStorage.getItem('profile_image')} alt="" />
            <div className='ml-3'>
              <p className='font-bold text-2xl'>
                {
                  localStorage.getItem('username') 
                }
              </p>
            </div>
          </div>
          :
          <div className='flex flex-row items-center'>
            <img className='w-16 h-16 rounded-full'
              src={profile_image} alt="" />
            <div className='ml-3'>
              <p className='font-bold text-2xl'>
                {
                  localStorage.getItem('username')
                }
              </p>
            </div>
          </div>

      }
    </div>

  )
}

export default UserProfileComponent
