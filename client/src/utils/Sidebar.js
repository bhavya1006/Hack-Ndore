import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Avatar } from '@mui/material';

function Sidebar({ children }) {
    const location = useLocation();
    const [activeRoute, setActiveRoute] = useState(location.pathname);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [visible, setVisible] = useState(true);


    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

 

    useEffect(() => {
        setActiveRoute(location.pathname);
    }, [location]);
    return (
        <div className='w-full h-full flex flex-row'>
            
            <aside isOpen={isSidebarOpen} onClose={toggleSidebar} id="logo-sidebar" className={` fixed top-0 left-0 h-full rounded-l-none z-40 md:w-72 rounded-2xl pt-10 border-r-2 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-[102%]'}   bg-[#172f60] md:translate-x-0 dark:bg-gray-800`} aria-label="Sidebar">
                <div className="h-full flex flex-col px-3 py-4 overflow-y-auto rounded-2xl bg-[#172f60] dark:bg-gray-900">
                    <ul className="flex-1 flex flex-col space-y-2 pt-12">

                        <li>
                            <Link to="/dashboard" className={`flex items-center p-2 text-white rounded-lg dark:text-white ${activeRoute === '/' ? 'bg-[#465677] dark:hover:bg-gray-700' : 'hover:bg-[#2A303D] dark:hover:bg-gray-700'} group`}>
                                <svg className="w-10 h-10 transition duration-75 dark:text-gray-400 text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ms-3 text-xl">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/details" className={`flex items-center p-2 text-white rounded-lg dark:text-white ${activeRoute === '/details' ? 'bg-[#465677] dark:hover:bg-gray-700' : 'hover:bg-[#2A303D] dark:hover:bg-gray-700'} group`}>
                                <svg className='fill-gray-500 group-hover:fill-white w-10 h-10' viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M32,6H4A2,2,0,0,0,2,8V28a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V8A2,2,0,0,0,32,6ZM19,22H9a1,1,0,0,1,0-2H19a1,1,0,0,1,0,2Zm8-4H9a1,1,0,0,1,0-2H27a1,1,0,0,1,0,2Zm0-4H9a1,1,0,0,1,0-2H27a1,1,0,0,1,0,2Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap text-xl">Details</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/risks" className={`flex items-center p-2 text-white rounded-lg dark:text-white ${activeRoute === '/risks' ? 'bg-[#465677] dark:hover:bg-gray-700' : 'hover:bg-[#2A303D] dark:hover:bg-gray-700'} group`}>
                            <svg className='w-10 h10' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12ZM12 6.25C12.4142 6.25 12.75 6.58579 12.75 7V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V7C11.25 6.58579 11.5858 6.25 12 6.25ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"  className='fill-gray-500 group-hover:fill-white'></path> </g></svg>
                                <span className="flex-1 ms-3 whitespace-nowrap text-xl">Risk Alerts</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/complaints" className={`flex items-center p-2 text-white rounded-lg dark:text-white ${activeRoute === '/complaints' ? 'bg-[#465677] dark:hover:bg-gray-700' : 'hover:bg-[#2A303D] dark:hover:bg-gray-700'} group`}>
                                <svg className='w-10 h-10 fill-gray-500 group-hover:fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                    <path d="M28,14H14c-1.1,0-2-0.9-2-2s0.9-2,2-2h1h13c0.6,0,1-0.4,1-1s-0.4-1-1-1H15h-1H7C5.9,8,5,7.1,5,6s0.9-2,2-2h14 c0.6,0,1-0.4,1-1s-0.4-1-1-1H7C4.8,2,3,3.8,3,6v15c0,2.2,1.8,4,4,4h3v2c0,2.2,1.8,4,4,4h14c0.6,0,1-0.4,1-1V15 C29,14.4,28.6,14,28,14z"></path>
                                    <path d="M28,11H14c-0.6,0-1,0.4-1,1s0.4,1,1,1h14c0.6,0,1-0.4,1-1S28.6,11,28,11z"></path>
                                    <path d="M21,5H7C6.4,5,6,5.4,6,6s0.4,1,1,1h14c0.6,0,1-0.4,1-1S21.6,5,21,5z"></path>
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap text-xl">Complaints</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile" className={`flex items-center p-2 text-white rounded-lg dark:text-white ${activeRoute === '/profile' ? 'bg-[#465677] dark:hover:bg-gray-700' : 'hover:bg-[#2A303D] dark:hover:bg-gray-700'} group`}>
                                <svg className='w-10 h-10 fill-gray-500 group-hover:fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
                                    <circle cx="18" cy="12" r="6"></circle>
                                    <path d="M18,20c-6.63,0-12,4.92-12,11h24C30,24.92,24.63,20,18,20z"></path>
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap text-xl">Profile</span>
                            </Link>
                        </li>
                    </ul>
                    <div className='flex justify-center mt-auto pb-10'>
                        {/* Additional content can go here */}
                    </div>
                </div>
            </aside>

            <div className='h-full flex flex-col w-full  gap-10 overflow-y-auto overflow-x-hidden  ml-0 md:ml-72'>
            <nav className="w-full border-b-[1px]  border-white md:border-gray-400 bg-[#172f60] md:bg-white justify-between md:justify-between text-3xl flex py-3 z-50 ">
                <button onClick={toggleSidebar} className="  text-white text-xl  md:hidden ml-10 my-auto">
                    ☰
                </button>
                <div className='flex gap-3  pl-4'>
                    <div className=''>
                        <img src={logo} className={`h-16 w-16`}   alt="Logo" />
                    </div>
                    <a href="/" className="flex w-full">
                        <span className="self-center text-white md:text-black text-2xl font-semibold text-center dark:text-white">Indore Municipal Corporation</span>
                    </a>
                </div>
                <div className='flex mr-10 my-auto'>
                <Avatar sx={{width:50,height:50}} alt="Travis Howard" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX1XEzQaJH4Ftweq0MjLjKY6Hiu0-owm4vZA&s" />
                </div>

            </nav>
                {children}
            </div>
        </div>
    );
}

export default Sidebar;
