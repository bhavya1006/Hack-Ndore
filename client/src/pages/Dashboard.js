import React, { useEffect, useState } from 'react';
import wc from '../assets/water_consumption_plot.png'
import axios from 'axios'

function Dashboard() {
    const [imageURL, setImageURL] = useState('');
    // const [downloadUrl, setDownloadUrl] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/plot/').then((response) => {
            // setImageURL()
            console.log(response.data)
            
        });
    }, []);

    return (
        <div className="w-full h-screen">
            <div className="w-full flex flex-wrap px-4 h-auto py-2 gap-10 items-center justify-center">
                <div className="w-56 h-56 text-white text-4xl bg-[#6761D9] flex justify-center items-center p-3 flex-col rounded-lg gap-3 shadow-md shadow-black">
                <div className='flex w-full justify-center text-5xl '>
                <text>10245 L</text>
                        </div>
                    <div className='text-lg'>
                        <text>supplied this month</text>
                    </div>
                    <svg className='w-14 h-14 fill-gray-500 text-gray-500' viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.5 5.5L3.11612 6.11612C3.68206 6.68206 4.44964 7 5.25 7C6.05036 7 6.81794 6.68206 7.38388 6.11612L7.61612 5.88388C8.18206 5.31794 8.94964 5 9.75 5C10.5504 5 11.3179 5.31794 11.8839 5.88388L12.1161 6.11612C12.6821 6.68206 13.4496 7 14.25 7C15.0504 7 15.8179 6.68206 16.3839 6.11612L16.6161 5.88388C17.1821 5.31794 17.9496 5 18.75 5C19.5504 5 20.3179 5.31794 20.8839 5.88388L21.5 6.5M2.5 11.5L3.11612 12.1161C3.68206 12.6821 4.44964 13 5.25 13C6.05036 13 6.81794 12.6821 7.38388 12.1161L7.61612 11.8839C8.18206 11.3179 8.94964 11 9.75 11C10.5504 11 11.3179 11.3179 11.8839 11.8839L12.1161 12.1161C12.6821 12.6821 13.4496 13 14.25 13C15.0504 13 15.8179 12.6821 16.3839 12.1161L16.6161 11.8839C17.1821 11.3179 17.9496 11 18.75 11C19.5504 11 20.3179 11.3179 20.8839 11.8839L21.5 12.5M2.5 17.5L3.11612 18.1161C3.68206 18.6821 4.44964 19 5.25 19C6.05036 19 6.81794 18.6821 7.38388 18.1161L7.61612 17.8839C8.18206 17.3179 8.94964 17 9.75 17C10.5504 17 11.3179 17.3179 11.8839 17.8839L12.1161 18.1161C12.6821 18.6821 13.4496 19 14.25 19C15.0504 19 15.8179 18.6821 16.3839 18.1161L16.6161 17.8839C17.1821 17.3179 17.9496 17 18.75 17C19.5504 17 20.3179 17.3179 20.8839 17.8839L21.5 18.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </div>
                <div className="w-56 h-56 text-white text-4xl bg-[#2B89DB] flex justify-center items-center flex-col  rounded-lg gap-3 p-3 shadow-md shadow-black">
                <div className='flex w-full justify-center text-5xl'>

                    <text>1024 L</text>
                    </div>
                    <div className='text-lg'>
                        <text>Water consumed /month (Avg.)</text>
                    </div>
                    <svg className='w-10 h-18' viewBox="0 -6.5 1037 1037" fill="#FFFFFF" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <path d="M891.441709 707.318755a150.855429 150.855429 0 0 1-94.556541-33.01162l-17.78533-14.202674a73.828314 73.828314 0 0 0-87.647133-3.710609l-43.375734 29.17306a38.462377 38.462377 0 0 1-42.735974-63.976009l43.375734-29.17306a150.215669 150.215669 0 0 1 178.493065 7.549169L844.995127 614.169686a74.468074 74.468074 0 0 0 88.414844 3.198801l43.631638-30.068724a38.398401 38.398401 0 1 1 43.631639 63.208296l-43.631639 30.068725a150.599525 150.599525 0 0 1-85.5999 26.741971zM891.441709 865.595402a150.855429 150.855429 0 0 1-94.556541-33.011621l-17.78533-14.202674a73.700362 73.700362 0 0 0-87.647133-3.710608l-43.247782 28.5333a38.462377 38.462377 0 0 1-42.735974-63.976009l43.375734-29.173061a150.215669 150.215669 0 0 1 178.493065 7.54917l17.785331 14.202674a74.468074 74.468074 0 0 0 88.414844 3.1988l43.631638-30.068724a38.398401 38.398401 0 1 1 43.631639 63.208297l-43.631639 30.068724a150.471573 150.471573 0 0 1-85.727852 27.381732zM891.441709 1023.872048a150.855429 150.855429 0 0 1-94.556541-33.011621l-17.78533-14.202674a73.700362 73.700362 0 0 0-87.647133-3.710608l-43.375734 29.17306a38.462377 38.462377 0 0 1-42.735974-63.976009l43.375734-29.17306a150.215669 150.215669 0 0 1 178.493065 7.549169l17.785331 14.202674a74.468074 74.468074 0 0 0 88.414844 3.1988l43.631638-30.068724a38.398401 38.398401 0 1 1 43.631639 63.208297l-43.631639 30.068724a150.471573 150.471573 0 0 1-85.5999 26.741972zM493.766837 533.559915a14.58653 14.58653 0 0 0-14.58653-14.970386h-126.800449a14.842434 14.842434 0 0 0-14.58653 14.842434v41.84031a14.714482 14.714482 0 0 0 14.58653 14.842434h126.800449a14.842434 14.842434 0 0 0 14.58653-14.970386V533.559915z m344.190929-117.332h-126.80045a14.842434 14.842434 0 0 0-14.58653 14.842434v41.84031a14.714482 14.714482 0 0 0 14.58653 14.842434h126.80045a14.842434 14.842434 0 0 0 14.58653-14.970387V431.198301a14.58653 14.58653 0 0 0-14.58653-14.970386z m-306.061227 511.808072H366.966388v-101.082095h-113.49344v101.082095H88.542796A16.889666 16.889666 0 0 1 71.65313 911.018368V88.286892a16.889666 16.889666 0 0 1 16.889666-17.14557h443.225791a16.889666 16.889666 0 0 1 17.017618 17.14557v521.020618a89.566413 89.566413 0 0 1 28.149444-30.452581l43.375734-29.17306v-188.089466a16.889666 16.889666 0 0 1 16.889667-17.401475h274.58503a16.889666 16.889666 0 0 1 16.889667 16.889667v197.17406l19.320754-12.795202a89.566413 89.566413 0 0 1 51.180808-15.866051h1.535424V308.620267a35.698613 35.698613 0 0 0-35.570661-35.698613H620.439335V35.826565A35.826565 35.826565 0 0 0 584.740722 0H35.698613A35.826565 35.826565 0 0 0 0.127952 35.698613v928.675747a35.826565 35.826565 0 0 0 35.698613 35.826565h506.817943a89.566413 89.566413 0 0 1 4.222417-70.501562z m-179.132825-232.744721a14.842434 14.842434 0 0 0-14.58653 14.842434v41.84031a14.714482 14.714482 0 0 0 14.58653 14.842434h126.800449a14.842434 14.842434 0 0 0 14.58653-14.970386v-41.84031a14.58653 14.58653 0 0 0-14.58653-14.970386h-126.800449z m141.386979-516.542297a14.58653 14.58653 0 0 0-14.58653-14.970386h-126.800449a14.842434 14.842434 0 0 0-14.58653 14.842434v41.84031a14.714482 14.714482 0 0 0 14.58653 14.842434h126.800449a14.842434 14.842434 0 0 0 14.58653-14.970386v-41.072598z m0 177.213545a14.58653 14.58653 0 0 0-14.58653-14.970386h-126.800449a14.842434 14.842434 0 0 0-15.098339 15.994002v41.84031a14.714482 14.714482 0 0 0 14.586531 14.842434h126.800449a14.842434 14.842434 0 0 0 14.58653-14.970386V356.98613z m-210.992877 0a14.58653 14.58653 0 0 0-14.58653-14.970386h-127.696114A14.842434 14.842434 0 0 0 126.672498 356.98613v41.84031a14.714482 14.714482 0 0 0 14.202674 14.330626h126.80045a14.842434 14.842434 0 0 0 14.58653-14.970386V356.98613z m0-177.213545a14.58653 14.58653 0 0 0-14.58653-14.970386h-127.696114a14.842434 14.842434 0 0 0-14.58653 14.970386v41.84031a14.714482 14.714482 0 0 0 14.58653 15.354242h126.80045a14.842434 14.842434 0 0 0 14.58653-14.970386v-41.712358zM140.875172 695.803074a14.842434 14.842434 0 0 0-14.58653 14.842434v41.84031a14.458578 14.458578 0 0 0 4.222416 10.492065 14.842434 14.842434 0 0 0 10.364114 4.350369h126.80045a14.842434 14.842434 0 0 0 14.58653-14.970386v-41.84031a14.58653 14.58653 0 0 0-14.58653-14.970386h-126.80045zM282.262152 533.559915a14.58653 14.58653 0 0 0-14.58653-14.970386h-126.80045a14.842434 14.842434 0 0 0-14.58653 14.842434v41.84031a14.714482 14.714482 0 0 0 14.58653 14.970386h126.80045a14.842434 14.842434 0 0 0 14.58653-14.970386V533.559915z"></path>
  </g>
</svg>
                </div>
                <div className="w-56 h-56 text-white text-4xl bg-[#F7A00D] flex justify-center items-center flex-col rounded-lg px-3 shadow-md shadow-black">
                <div className='flex w-full justify-center text-5xl'>

                    <text>10</text>
                    </div>
                    <div className='text-lg'>
                        Risks of Leakages
                    </div>
                    
                    <svg className='w-16 h-16' fill="#FFFFFF" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"  version="1.1"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2,5V13H4V11H10L12,9L10,7H4V5H2M20,5V7H12L14,9L12,11H20V13H22V5H20M12,13C12,13 10,15.17 10,16.5A2,2 0 0,0 12,18.5A2,2 0 0,0 14,16.5C14,15.17 12,13 12,13Z"></path></g></svg>
                </div>
                <div className="w-56 h-56 px-3 text-white text-4xl bg-[#DF4544] flex justify-center items-center flex-col rounded-lg gap-3 shadow-md shadow-black">
                <div className='flex w-full justify-center text-5xl'>
                    <text>42</text>
                        </div>
                    <div className='text-lg'>
                        Complaints pending
                    </div>
                    <svg className='w-16 h-16' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="none" d="M0 0h24v24H0z"></path> <path fill-rule="nonzero" d="M3.783 2.826L12 1l8.217 1.826a1 1 0 0 1 .783.976v9.987a6 6 0 0 1-2.672 4.992L12 23l-6.328-4.219A6 6 0 0 1 3 13.79V3.802a1 1 0 0 1 .783-.976zM5 4.604v9.185a4 4 0 0 0 1.781 3.328L12 20.597l5.219-3.48A4 4 0 0 0 19 13.79V4.604L12 3.05 5 4.604zM12 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm-4.473 5a4.5 4.5 0 0 1 8.946 0H7.527z"></path> </g> </g></svg>
                </div>
            </div>
            <div className="w-full flex mx-3 mt-3 items-center justify-center py-3 shadow-md shadow-black rounded-xl">
                <div className="flex-1 rounded-xl  p-3">
                    <div className="flex text-center flex-col text-xl font-bold">

                        {/* <img className='' src={wc} alt="Fetched Image" /> */}

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
