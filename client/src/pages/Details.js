import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';
import data from '../indore_households (1).json';
import logo from '../assets/logo.png';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#E8F5E9', 
      color: theme.palette.common.black,
      fontSize: 14,
      minWidth: 180,
      fontWeight: 'bold',
      border: '1px solid #ccc', 
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      minWidth: 180,
      textAlign: 'center',
      border: '1px solid #ccc', 
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
      backgroundColor: '#E8F5E9', 
    },
    '&:nth-of-type(odd)': {
      backgroundColor: '#E1F5FE', 
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    border: '2px solid #ccc', 
    borderRadius: '8px', 
  }));
  

  function Details() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [sortDirection, setSortDirection] = React.useState('asc');
    const [sortColumn, setSortColumn] = React.useState('');
    const [filterValues, setFilterValues] = React.useState({});
  
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
  
    const headers = Object.keys(data[0] || {});
  
    return (
      <div className=''>
        <div className='w-full text-3xl font-bold text-center mb-10'>
        <marquee scrollamount={20} className='flex flex-col'>
            <div className='flex items-center'>             <img src={logo} className='w-48 flex'/>
            Detail of Water Supply in every household <img src={logo} className='w-48 flex'/> Municipal Corporation,  Indoor</div>
            </marquee>
        </div>
        <StyledTableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <StyledTableCell key={header}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: '',
                        textAlign: 'center',
                      }}
                    >
                      {header.replace(/_/g, ' ').toUpperCase()}
                      <IconButton
                        aria-controls="menu"
                        aria-haspopup="true"
                        onClick={(event) => handleOpenMenu(event, header)}
                      >
                        <SortIcon color='warning' />
                      </IconButton>
                      <Menu
                        id="menu"
                        anchorEl={anchorEl?.element}
                        open={Boolean(anchorEl?.element) && anchorEl?.column === header}
                        onClose={handleCloseMenu}
                      >
                        <MenuItem onClick={() => handleSort(header)}>
                          {sortDirection === 'asc' ? 'Descending' : 'Ascending'}
                        </MenuItem>
                        <MenuItem onClick={() => handleClearFilter(header)}>
                          Clear Filter
                        </MenuItem>
                        <MenuItem onClick={() => handleFilter(header)}>
                          Filter by
                        </MenuItem>
                      </Menu>
                    </div>
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => (
                <StyledTableRow key={row.household_id}>
                  {headers.map((header) => (
                    <StyledTableCell key={header}>
                      {row[header] !== null ? row[header].toString() : 'N/A'}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
        <div style={{ padding: '16px', display: 'flex', justifyContent: 'flex-end' }}>
          <TablePagination
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            // Disable row per page selection
            onRowsPerPageChange={() => {}}
          />
        </div>
      </div>
    );
  }
  
  export default Details;
  