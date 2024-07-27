import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoo from '../assets/logoo.png';

function Sidebar({ children }) {
    const location = useLocation();
    const [activeRoute, setActiveRoute] = useState(location.pathname);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        setActiveRoute(location.pathname);
    }, [location]);

    return (
        <div className='w-full h-full flex flex-col'>
            <nav className="w-full fixed  text-black text-3xl flex items-center justify-between p-4 z-50 md:hidden">
                <button onClick={toggleSidebar} className="text-black">
                    ☰
                </button>
            </nav>
            <aside isOpen={isSidebarOpen} onClose={toggleSidebar} id="logo-sidebar" className={`fixed top-1 left-1 bottom-1 z-40 w-64 rounded-lg pt-4 border-r-2 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-[102%]'}   bg-[#212631] md:translate-x-0 dark:bg-gray-800`} aria-label="Sidebar">
                <div className="h-full flex flex-col px-3 py-4 overflow-y-auto rounded-lg bg-[#212631] dark:bg-gray-900">
                    <ul className="flex-1 flex flex-col space-y-2">
                        <li className='flex items-center mt-14 relative mb-16'>
                            <img src={logoo} className="h-36 w-full absolute left-0" alt="Logo" />
                            <a href="https://flowbite.com" className="flex flex-col w-full">
                                {/* <span className="self-center text-white text-md font-semibold text-center dark:text-white">Municipal Corps</span> */}
                            </a>
                        </li>
                        <li>
                            <Link to="/" className={`flex items-center p-2 text-white rounded-lg dark:text-white ${activeRoute === '/' ? 'bg-[#2A303D] dark:hover:bg-gray-700' : 'hover:bg-[#2A303D] dark:hover:bg-gray-700'} group`}>
                                <svg className="w-10 h-10 transition duration-75 dark:text-gray-400 text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ms-3 text-xl">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/details" className={`flex items-center p-2 text-white rounded-lg dark:text-white ${activeRoute === '/details' ? 'bg-[#2A303D] dark:hover:bg-gray-700' : 'hover:bg-[#2A303D] dark:hover:bg-gray-700'} group`}>
                                <svg className='fill-gray-500 group-hover:fill-white w-10 h-10' viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M32,6H4A2,2,0,0,0,2,8V28a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V8A2,2,0,0,0,32,6ZM19,22H9a1,1,0,0,1,0-2H19a1,1,0,0,1,0,2Zm8-4H9a1,1,0,0,1,0-2H27a1,1,0,0,1,0,2Zm0-4H9a1,1,0,0,1,0-2H27a1,1,0,0,1,0,2Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap text-xl">Details</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/insights" className={`flex items-center p-2 text-white rounded-lg dark:text-white ${activeRoute === '/insights' ? 'bg-[#2A303D] dark:hover:bg-gray-700' : 'hover:bg-[#2A303D] dark:hover:bg-gray-700'} group`}>
                                <svg className='w-10 h-10 fill-gray-500 group-hover:fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
                                    <rect x="6.48" y="18" width="5.76" height="11.52" rx="1" ry="1"></rect>
                                    <rect x="15.12" y="6.48" width="5.76" height="23.04" rx="1" ry="1"></rect>
                                    <rect x="23.76" y="14.16" width="5.76" height="15.36" rx="1" ry="1"></rect>
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap text-xl">Insights</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/reports" className={`flex items-center p-2 text-white rounded-lg dark:text-white ${activeRoute === '/reports' ? 'bg-[#2A303D] dark:hover:bg-gray-700' : 'hover:bg-[#2A303D] dark:hover:bg-gray-700'} group`}>
                                <svg className='w-10 h-10 fill-gray-500 group-hover:fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                    <path d="M28,14H14c-1.1,0-2-0.9-2-2s0.9-2,2-2h1h13c0.6,0,1-0.4,1-1s-0.4-1-1-1H15h-1H7C5.9,8,5,7.1,5,6s0.9-2,2-2h14 c0.6,0,1-0.4,1-1s-0.4-1-1-1H7C4.8,2,3,3.8,3,6v15c0,2.2,1.8,4,4,4h3v2c0,2.2,1.8,4,4,4h14c0.6,0,1-0.4,1-1V15 C29,14.4,28.6,14,28,14z"></path>
                                    <path d="M28,11H14c-0.6,0-1,0.4-1,1s0.4,1,1,1h14c0.6,0,1-0.4,1-1S28.6,11,28,11z"></path>
                                    <path d="M21,5H7C6.4,5,6,5.4,6,6s0.4,1,1,1h14c0.6,0,1-0.4,1-1S21.6,5,21,5z"></path>
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap text-xl">Reports</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile" className={`flex items-center p-2 text-white rounded-lg dark:text-white ${activeRoute === '/profile' ? 'bg-[#2A303D] dark:hover:bg-gray-700' : 'hover:bg-[#2A303D] dark:hover:bg-gray-700'} group`}>
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

            <div className='h-full flex flex-col flex-1 gap-10 pt-16 md:py-7 overflow-y-auto p-4 md:ml-64'>
                {children}
            </div>
        </div>
    );
}

export default Sidebar;
