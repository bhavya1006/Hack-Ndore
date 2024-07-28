import * as React from 'react';
import logo from '../assets/logo.png';
import axios from 'axios'


  

  function Details() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [sortDirection, setSortDirection] = React.useState('asc');
    const [sortColumn, setSortColumn] = React.useState('');
    const [filterValues, setFilterValues] = React.useState({});
    const [data, setData] = React.useState([]);
    const [headers, setHeaders] = React.useState([]);

    React.useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get('http://localhost:3001/get_details');
              console.log(response.data);
              const filteredData = response.data.map(item => {
                  const { water_bill_last_month,payment_status,last_payment_date,id, ...rest } = item;
                  return rest;
              });
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
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleSort = (column) => {
      setSortColumn(column);
      setSortDirection((prevDirection) =>
        prevDirection === 'asc' ? 'desc' : 'asc'
      );
    };
  
    const handleFilter = (column) => {
      const value = prompt('Enter filter value');
      if (value !== null) {
        setFilterValues((prevFilters) => ({
          ...prevFilters,
          [column]: value,
        }));
      }
      handleCloseMenu();
    };
  
    const handleClearFilter = (column) => {
      setFilterValues((prevFilters) => {
        const newFilters = { ...prevFilters };
        delete newFilters[column];
        return newFilters;
      });
      handleCloseMenu();
    };
  
    const handleOpenMenu = (event, column) => {
      setAnchorEl({ element: event.currentTarget, column });
    };
  
    const handleCloseMenu = () => {
      setAnchorEl(null);
    };
  
    const paginatedRows = data
      .filter((row) => {
        return Object.keys(filterValues).every((key) =>
          row[key]
            ? row[key].toString().toLowerCase().includes(filterValues[key].toLowerCase())
            : true
        );
      })
      .sort((a, b) => {
        if (sortColumn) {
          if (sortDirection === 'asc') {
            return a[sortColumn] > b[sortColumn] ? 1 : -1;
          } else {
            return a[sortColumn] < b[sortColumn] ? 1 : -1;
          }
        }
        return 0;
      })
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  

    return (
      <div className=''>
            <div className='w-full text-3xl font-bold text-center mb-10'>
                <div className='flex w-full justify-center items-center text-2xl'>
                    <img src={logo} className='w-16 flex mr-10' />
                    Details water supply in each household, Municipal Corporation, Indore
                    </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg border-[1px] border-gray-400 mx-3 mb-9">
                <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-black">
                    <thead className="text-xs text-gray-800 uppercase bg-gray-50 dark:bg-gray-800 dark:text-black">
                        <tr>
                            {headers.map((header, index) => (
                                <th scope="col" className="px-6 py-3 text-center" key={index} style={{ minWidth: '150px' }}>
                                  <div className='flex align-center justify-center'>
                                    {header.replace(/_/g, ' ')}
                                    <svg className='w-4 h-4 my-auto ml-2' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 6H19M21 12H16M21 18H16M7 20V13.5612C7 13.3532 7 13.2492 6.97958 13.1497C6.96147 13.0615 6.93151 12.9761 6.89052 12.8958C6.84431 12.8054 6.77934 12.7242 6.64939 12.5617L3.35061 8.43826C3.22066 8.27583 3.15569 8.19461 3.10948 8.10417C3.06849 8.02393 3.03853 7.93852 3.02042 7.85026C3 7.75078 3 7.64677 3 7.43875V5.6C3 5.03995 3 4.75992 3.10899 4.54601C3.20487 4.35785 3.35785 4.20487 3.54601 4.10899C3.75992 4 4.03995 4 4.6 4H13.4C13.9601 4 14.2401 4 14.454 4.10899C14.6422 4.20487 14.7951 4.35785 14.891 4.54601C15 4.75992 15 5.03995 15 5.6V7.43875C15 7.64677 15 7.75078 14.9796 7.85026C14.9615 7.93852 14.9315 8.02393 14.8905 8.10417C14.8443 8.19461 14.7793 8.27583 14.6494 8.43826L11.3506 12.5617C11.2207 12.7242 11.1557 12.8054 11.1095 12.8958C11.0685 12.9761 11.0385 13.0615 11.0204 13.1497C11 13.2492 11 13.3532 11 13.5612V17L7 20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                  </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                {Object.entries(item).map(([key, value], subIndex) => (
                                    <td key={subIndex} className="px-6 py-4 text-center" style={{ minWidth: '150px' }}>
                                        {value !== null ? value.toString() : 'N/A'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
  }
  
  export default Details;
  