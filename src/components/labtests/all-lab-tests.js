import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Avatar, Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const  AllLabTests = ({labTests, onButtonClick, onPaymentUpdate}) => {
  const [startDate, setStartDate] = useState(new Date());
  const columns = [
    { id: 'Id', label: 'Id', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'title', label: 'Title', minWidth: 100 },
    {
      id: 'rate',
      label: 'Rate',
      minWidth: 100,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'discountrate',
      label: 'Discount Rate',
      minWidth: 140,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'slot',
      label: 'Time Slot',
      minWidth: 140,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'contactnumber',
      label: 'Contact',
      minWidth: 100,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'location',
      label: 'Location',
      minWidth: 140,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'branche',
      label: 'Branch',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'city',
      label: 'City',
      minWidth: 120,
      align: 'center',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'currentDate',
      label: 'Current Date',
      minWidth: 140,
      align: 'center',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'image',
      label: 'Image',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'payment',
      label: 'Pyment Status',
      minWidth: 150,
      align: 'center',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'Pupdate',
      label: 'Update Pyment',
      minWidth: 150,
      align: 'center',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 100,
      align: 'center',
      format: (value) => value.toFixed(2),
    },
    // {
    //   id: 'SData',
    //   label: 'Select Date',
    //   minWidth: 170,
    //   align: 'center',
    //   format: (value) => value.toFixed(2),
    // },
    {
      id: 'update',
      label: 'Approve',
      minWidth: 100,
      align: 'center',
      format: (value) => value.toFixed(2),
    },
  ];
  const createData = (Id, name, title, rate, discountrate, slot, contactnumber, location, branche, city, currentDate, image, payment, Pupdate, status, SData, update, _id) => {
    return { Id, name, title, rate, discountrate, slot, contactnumber, location, branche, city, currentDate, image, payment, Pupdate, status, SData, update, _id};
  }
  const tableData = labTests.map((labData) => {
    const { name, title, rate, discountrate, slot, contactnumber, location, branche, Id, image, payment, status, _id } = labData
    const update = "update"
    const city = 'Lahore'
    const SData = 'Select Data'
    const Pupdate = 'Pupdate'
    const currentDate = new Date().toLocaleDateString();
    return createData(Id, name, title, rate, discountrate, slot, contactnumber, location, branche, city, currentDate, image, payment, Pupdate, status, SData, update, _id)
  })

  const rows = tableData
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleUpdate = (id, payment) => {
    if(payment === 'pending')
      toast.error("Please Update payment first");
    else
      onButtonClick(id)
  }
  const handleDataChange = (date) => {
    console.log('data is', date)
    setStartDate(date)
  }

  const handlePaymentUpdate = (id) => {
    onPaymentUpdate(id)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      // console.log('row is', row._id)
                      const value = row[column.id];
                      if (column.id === 'image'){
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Grid container justifyContent='center'>
                            <a href={value} rel = "noreferrer" target="_blank">
                              <Avatar
                                alt="Labtest"
                                src={value}
                                variant="square"
                                sx={{width: '100px', height: '100px'}}
                              />
                            </a>
                            </Grid>
                          </TableCell>
                        );
                      }
                      if (column.id === 'update'){
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Grid container justifyContent='center'>
                              <Button
                              variant='contained'
                              onClick={() => handleUpdate(row._id, row.payment )}
                              >
                                Approve
                              </Button>
                            </Grid>
                          </TableCell>
                        );
                      }
                      if (column.id === 'Pupdate'){
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Grid container justifyContent='center'>
                              <Button
                              variant='contained'
                              onClick={() => handlePaymentUpdate(row._id)}
                              sx={{bgcolor: 'success.main'}}
                              >
                                Approve
                              </Button>
                            </Grid>
                          </TableCell>
                        );
                      }
                      if (column.id === 'SData'){
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Grid container justifyContent='center'>
                              <DatePicker
                                selected={startDate}
                                onChange={date => handleDataChange(date)}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                timeCaption="time"
                              />
                            </Grid>
                          </TableCell>
                        );
                      }
                      if (column.id === 'status'){
                        return (
                          <TableCell key={column.id} align={column.align}>
                           {value === 'pending' ?
                              <Typography color= 'error.main' fontWeight='bold'>
                                {value}
                              </Typography>
                              :
                              <Typography color= 'success.main' fontWeight='bold'>
                                {value}
                            </Typography>
                          }
                          </TableCell>
                        );
                      }
                      if (column.id === 'payment'){
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value === 'pending' ?
                            <Typography color= 'error.main' fontWeight='bold'>
                              {value}
                            </Typography>
                            :
                            <Typography color= 'success.main' fontWeight='bold'>
                              {value}
                            </Typography>
                            }
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
