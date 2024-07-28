import React from 'react'
import logo from '../assets/logo.png'
import water from '../assets/water.jpg'
import { Link } from 'react-router-dom' 
import video from '../assets/video.mp4'

function LandingPage() {
    return (
        <div className="absolute top-0 left-0  w-screen h-screen bg-cover bg-center z-50 overflow-y-auto" style={{ backgroundImage: `url(${water})` }}>
            <div className="w-full h-full bg-gray-800 bg-opacity-10 backdrop-blur-md overflow-y-auto">
                <div className="w-full px-10 py-3 flex text-3xl text-black font-bold items-center gap-4">
                    <img src={logo} className="w-20 h-20" alt="Logo" />
                    Hack'Ndore
                    <div className="text-black hover:underline hover:text-blue-700 hover:cursor-pointer ml-auto mr-10 text-2xl">
                        <Link to={'/dashboard'}>
                        Dashboard
                        </Link>
                        
                    </div>
                </div>
                <div className='flex mx-10 p-10 flex-col justify-center mb-7 items-center gap-10 mt-14 bg-gray-300 bg-opacity-50 rounded-xl border border-gray-800'>
    {/* <img className='h-96 w-96 rounded-full my-auto' src='https://img.naidunia.com/naidunia/ndnimg/23082020/23_08_2020-narmada_line_indore_face_four_2020823_154048.jpg' /> */}
    <video className='rounded-lg' src={video} autoPlay={true} controls/>
   
    <div className='flex flex-1 text-gray-900 text-center items-center text-2xl font-semibold font-serif'>
        A Smart Water Management System for Indore will install IoT devices, specifically water supply meters, to measure
        the amount of water consumed by average households. These meters will transmit data to a central server using low-
        power, long-range communication technologies like LoRaWAN or NB-IoT. The collected data will be processed and
        stored using cloud services, enabling scalable data management and analysis. AI/ML models will analyze water usage
        patterns to detect anomalies, predict leaks, and optimize distribution. Additionally, these models will help identify
        areas prone to high water usage, making predictions based on weather patterns and occasionally. <br/><br/>
        The system will feature a React-based dashboard for residents and municipal staff, providing real-time monitoring,
        detailed reports, and alerts for leaks. The dashboard will also include visualization tools to display consumption
        trends, distribution metrics, and user complaints. By leveraging IoT and AI/ML technologies, this system aims to
        ensure efficient water distribution, minimize wastage, and enhance the overall management of water resources in
        Indore.
    </div>
</div>

            </div>

        </div>
    )
}

export default LandingPage
