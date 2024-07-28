import React, { useEffect, useState } from 'react';
import axios from 'axios'

function Dashboard() {
    const [imageURL, setImageURL] = useState('');
    const [imageUpieChart, setPieChart] = useState('');


    useEffect(() => {
        axios.get('http://localhost:3001/plot/').then((response) => {
            setImageURL(`http://localhost:3001/${response.data.fileUrl}`)
            console.log(response)
        });

        // axios.get('http://localhost:3001/piechart/').then((response) => {
        //     setPieChart(`http://localhost:3001/${response.data.fileUrl}`)
        //     console.log(response)
        // }); 
    }, []);

    return (
        <div className="w-full h-screen">
            <div className="w-full grid lg:grid-cols-4 md:grid-rows-1 md:grid-cols-2 sm:grid-rows-2 grid-cols-1 grid-rows-4 px-4 h-auto py-2 gap-7 items-center justify-center">
                <div className=" flex-1 h-full text-white text-xl border-[1px] border-gray-400 bg-[#6761D9] flex justify-center items-center p-3 flex-col rounded-lg gap-3 ">
                    <div className='flex w-full justify-center text-3xl '>
                        <text>10245 L</text>
                    </div>
                    <div className='text-lg'>
                        <text>supplied this month</text>
                    </div>
                    <svg className='w-14 h-14 fill-gray-500 text-gray-500' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.5 5.5L3.11612 6.11612C3.68206 6.68206 4.44964 7 5.25 7C6.05036 7 6.81794 6.68206 7.38388 6.11612L7.61612 5.88388C8.18206 5.31794 8.94964 5 9.75 5C10.5504 5 11.3179 5.31794 11.8839 5.88388L12.1161 6.11612C12.6821 6.68206 13.4496 7 14.25 7C15.0504 7 15.8179 6.68206 16.3839 6.11612L16.6161 5.88388C17.1821 5.31794 17.9496 5 18.75 5C19.5504 5 20.3179 5.31794 20.8839 5.88388L21.5 6.5M2.5 11.5L3.11612 12.1161C3.68206 12.6821 4.44964 13 5.25 13C6.05036 13 6.81794 12.6821 7.38388 12.1161L7.61612 11.8839C8.18206 11.3179 8.94964 11 9.75 11C10.5504 11 11.3179 11.3179 11.8839 11.8839L12.1161 12.1161C12.6821 12.6821 13.4496 13 14.25 13C15.0504 13 15.8179 12.6821 16.3839 12.1161L16.6161 11.8839C17.1821 11.3179 17.9496 11 18.75 11C19.5504 11 20.3179 11.3179 20.8839 11.8839L21.5 12.5M2.5 17.5L3.11612 18.1161C3.68206 18.6821 4.44964 19 5.25 19C6.05036 19 6.81794 18.6821 7.38388 18.1161L7.61612 17.8839C8.18206 17.3179 8.94964 17 9.75 17C10.5504 17 11.3179 17.3179 11.8839 17.8839L12.1161 18.1161C12.6821 18.6821 13.4496 19 14.25 19C15.0504 19 15.8179 18.6821 16.3839 18.1161L16.6161 17.8839C17.1821 17.3179 17.9496 17 18.75 17C19.5504 17 20.3179 17.3179 20.8839 17.8839L21.5 18.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </div>
                <div className="flex-1 text-white text-xl border-[1px] border-gray-400 bg-[#2B89DB] flex justify-center items-center flex-col  rounded-lg gap-3 p-3 ">
                    <div className='flex w-full justify-center text-3xl'>
                        <text>1024 L</text>
                    </div>
                    <div className='text-lg'>
                        <text>Water consumed /month (Avg.)</text>
                    </div>
                    <svg  viewBox="0 0 1024 1024" fill="#FFFFFF" className="icon w-10 h-10" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M372.363636 302.545455h139.636364V186.181818h-139.636364zM162.909091 0v209.454545H0v814.545455h417.047273a150.574545 150.574545 0 0 1-13.498182-62.138182 175.476364 175.476364 0 0 1 2.792727-30.952727H256V93.090909h581.818182v93.090909h93.090909V0z m0 930.909091H93.090909V302.545455h69.818182z m209.454545-442.181818h139.636364v-116.363637h-139.636364z m465.454546 442.181818h-127.069091a175.476364 175.476364 0 0 1 3.025454 30.952727 150.574545 150.574545 0 0 1-13.730909 62.138182H930.909091v-186.181818h-93.090909zM372.363636 674.909091h68.421819A325.818182 325.818182 0 0 1 512 563.898182V558.545455h-139.636364zM605.090909 791.272727h-93.090909a232.727273 232.727273 0 0 1 232.727273-232.727272h186.181818v93.090909h-186.181818a139.636364 139.636364 0 0 0-139.636364 139.636363zM651.636364 279.272727h279.272727v93.090909H651.636364zM744.727273 418.909091h93.090909v186.181818h-93.090909zM930.909091 465.454545h93.090909v279.272728h-93.090909zM558.545455 1024a64.232727 64.232727 0 0 1-62.138182-62.138182c0-62.138182 62.138182-93.090909 62.138182-124.043636 0 30.952727 62.138182 62.138182 62.138181 124.043636A64.232727 64.232727 0 0 1 558.545455 1024z"></path></g></svg>
                </div>
                <div className="flex-1 h-full text-white text-xl border-[1px] border-gray-400 bg-[#F7A00D] flex justify-center items-center flex-col rounded-lg px-3 ">
                    <div className='flex w-full justify-center text-3xl'>

                        <text>10</text>
                    </div>
                    <div className='text-lg'>
                        Risks of Leakages
                    </div>

                    <svg className='w-16 h-16' fill="#FFFFFF" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" version="1.1"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2,5V13H4V11H10L12,9L10,7H4V5H2M20,5V7H12L14,9L12,11H20V13H22V5H20M12,13C12,13 10,15.17 10,16.5A2,2 0 0,0 12,18.5A2,2 0 0,0 14,16.5C14,15.17 12,13 12,13Z"></path></g></svg>
                </div>
                <div className="flex-1 h-full px-3 text-white text-xl border-[1px] border-gray-400 bg-[#DF4544] flex justify-center items-center flex-col rounded-lg gap-3 ">
                    <div className='flex w-full justify-center text-3xl'>
                        <text>42</text>
                    </div>
                    <div className='text-lg'>
                        Complaints pending
                    </div>
                    <svg className='w-16 h-16' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="none" d="M0 0h24v24H0z"></path> <path fill-rule="nonzero" d="M3.783 2.826L12 1l8.217 1.826a1 1 0 0 1 .783.976v9.987a6 6 0 0 1-2.672 4.992L12 23l-6.328-4.219A6 6 0 0 1 3 13.79V3.802a1 1 0 0 1 .783-.976zM5 4.604v9.185a4 4 0 0 0 1.781 3.328L12 20.597l5.219-3.48A4 4 0 0 0 19 13.79V4.604L12 3.05 5 4.604zM12 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm-4.473 5a4.5 4.5 0 0 1 8.946 0H7.527z"></path> </g> </g></svg>
                </div>
            </div>
            <div className="w-full flex px-3 :px-8 mt-3 items-center justify-center py-3 ">
                <div className="flex-1 rounded-xl pr-3">
                    <div className="flex w-full text-center justify-center items-center flex-col text-xl  rounded-lg">
                        <img className='w-full md:w-11/12 border-[1px] border-gray-400 rounded-lg' src={imageURL} alt="Fetched Image" />
                    </div>
                </div>
            </div>
            <div className="w-full flex mx-3 items-center justify-center py-3">
                <div className="flex-1 rounded-xl border-black border-opacity-15 border-2 p-3">
                    <div className="flex text-center flex-col text-xl font-bold">
                        <h2>Average Water Consumption Per Month</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
