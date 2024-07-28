import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import axios from 'axios';

function Risks() {
    const [data, setData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [rows,setRows]=useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/reports');
                console.log(response.data);
                const filteredData = response.data.map(item => {
                    const { id, ...rest } = item;
                    return rest;
                });
                setRows(filteredData.length)
                console.log(filteredData.length)
                setData(filteredData);
                if (filteredData.length > 0) {
                    setHeaders(Object.keys(filteredData[0]));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleAction = (action, rowIndex) => {
        console.log(`Action: ${action}, Row: ${rowIndex}`);
        // Implement the logic for "Resolved" and "Reject" actions here
    };

    return (
        <div className=''>
            <div className='w-full text-2xl font-bold text-center mb-10'>
                <div className='flex w-full justify-center items-center'>
                    <img src={logo} className='w-16 flex mr-10' />
                    Leakage Risks Reports Municipal Corporation, Indoor
                </div>
            </div>
            <div className='flex w-full justify-end text-lg pr-10 py-3'>
                <div className='text-red-600 mr-4'>{rows}</div> Risks of Lekage
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg border-[1px] border-gray-400 mx-3 mb-9">
                <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-400">
                    <thead className="text-xs text-gray-800 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
                        <tr>
                            {headers.map((header, index) => (
                                <th scope="col" className="px-6 py-3 text-center" key={index} style={{ minWidth: '150px' }}>
                                    {header.replace(/_/g, ' ')}
                                </th>
                            ))}
                            <th scope="col" className="px-6 py-3 text-center" style={{ minWidth: '150px' }}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, rowIndex) => (
                            <tr key={rowIndex} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                {Object.entries(item).map(([key, value], colIndex) => (
                                    <td 
                                        key={colIndex} 
                                        className="px-6 py-4 text-center" 
                                        style={{ minWidth: '150px' }}
                                        id={`row-${rowIndex}-col-${colIndex}`}
                                    >
                                        {value !== null ? value.toString() : 'N/A'}
                                    </td>
                                ))}
                                <td className="px-6 py-4 text-center" style={{ minWidth: '150px' }}>
                                    <button 
                                        onClick={() => handleAction('Resolved', rowIndex)} 
                                        className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                                    >
                                        Resolved
                                    </button>
                                    <button 
                                        onClick={() => handleAction('Reject', rowIndex)} 
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Risks;
