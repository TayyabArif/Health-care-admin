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

export const  AllAppointments = ({appointments, onButtonClick}) => {
  const columns = [
    { id: 'name', label: 'Patient Name', minWidth: 100 },
    {
      id: 'pEmail',
      label: 'Patient Email',
      minWidth: 150,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'dName', label: 'Doctor name', minWidth: 100 },
    {
      id: 'dEmail',
      label: 'Doctor Email',
      minWidth: 150,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'dDegree',
      label: 'Doctor Degree',
      minWidth: 120,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'hName',
      label: 'Hospital Name',
      minWidth: 100,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'hCity',
      label: 'Hospital City',
      minWidth: 100,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'contactnumber',
      label: 'Patient Contact',
      minWidth: 140,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'dPhoneno',
      label: 'Doctor Contact',
      minWidth: 140,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'speciality',
      label: 'Doctor speciality',
      minWidth: 140,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'Disease',
      label: 'Disease',
      minWidth: 140,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'date',
      label: 'Test Date',
      minWidth: 100,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'currentDate',
      label: 'Current Date',
      minWidth: 140,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'image',
      label: 'Image',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 100,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'update',
      label: 'Approve',
      minWidth: 100,
      align: 'center',
      format: (value) => value.toFixed(2),
    },
  ];
  const createData = (name, pEmail, dName, dEmail, dDegree, hName, hCity, contactnumber, dPhoneno, speciality, Disease, date, currentDate, image, status, update, _id) => {
    return { name, pEmail, dName, dEmail, hName, hCity, dDegree, contactnumber, dPhoneno, speciality, Disease, date, currentDate, image, status, update, _id};
  }
  const tableData = appointments?.map((labData) => {
    const { image, status, _id, Disease } = labData
    const update = "update"
    const name = labData.Patient.name
    const phone = labData.Patient.phoneno
    const dName = labData.Doctor.name
    const hName = labData.Hospital.name
    const dPhoneno = labData.Doctor.phoneno
    const date = labData.Hospital.date
    const speciality = labData.Doctor.speciality
    const pEmail = labData.Patient.email
    const dEmail = labData.Doctor.email
    const dDegree = labData.Doctor.degree
    const hCity = labData.Hospital.city
    const currentDate = new Date().toLocaleDateString();
    return createData(name, pEmail, dName, dEmail, dDegree, hName, hCity, phone, dPhoneno, speciality, Disease, date, currentDate, image, status, update, _id)
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

  const handleUpdate = (id) => {
    onButtonClick(id)
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
                              onClick={() => handleUpdate(row._id)}
                              >
                                Approve
                              </Button>
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
