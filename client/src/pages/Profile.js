import { Avatar } from '@mui/material'
import React from 'react'
import barcode from '../assets/barcode.webp'

function Profile() {
    return (
        <div className='w-full h-full bg-white p-8 rounded-lg border-[2px] border-gray-900 border-opacity-35'>
            <div className='flex items-center'>
                <div className=''>
                    <Avatar sx={{ width: 150, height: 150 }}
                        alt="Travis Howard" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX1XEzQaJH4Ftweq0MjLjKY6Hiu0-owm4vZA&s" />
                </div>
                <div className='flex flex-col ml-11'>
                    <div className='text-3xl font-bold'>
                        Ayushman Lakshkar
                    </div>
                    <div className='text-3xl text-gray-600'>
                        Municipal Corporation Head
                    </div>
                </div>
            </div>
            <div className='my-7 flex flex-col gap-3'>
                <div className='text-xl font-bold'>
                    Email Address - <text className='font-medium'>ayushman.lakshkar7@gmail.com</text>
                </div>
                <div className='text-xl font-bold'>
                    Phone Number - <text className='font-medium'>+91 99xxxxxxx0</text>
                </div>
                <div className='text-xl font-bold'>
                    Address - <text className='font-medium'>Ghass Mandi, Kilagate, Indore, Madhya Pradesh</text>
                </div>
            </div>
            <div className='flex justify-center w-full'>
                <img className='w-1/2' src='https://t3.ftcdn.net/jpg/02/55/97/94/360_F_255979498_vewTRAL5en9T0VBNQlaDBoXHlCvJzpDl.jpg' />
            </div>
            <div className='flex justify-center w-full text-3xl -mt-6'>
                4820287750789
            </div>
        </div>
    )
}

export default Profile
