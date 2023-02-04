import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
// import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Grid, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  button:{
    flexDirection: 'row',
  }
}));

export const  AllAppointments = ({appointments, onButtonClick, onButtonClick1}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [apptDetail, setApptDetail] = React.useState({
    email: '',
    docEmail: '',
    hospital: '',
    doctor: '',
    date: '',
    time: ''
  })
  const [consultDetail, setConsultDetail] = React.useState({
    email: '',
    docEmail: '',
  })

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

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
  const createData = (name, pEmail, dName, dEmail, dDegree, hName, hCity, contactnumber, dPhoneno, speciality, Disease, date, time, currentDate, image, status, update, _id) => {
    return { name, pEmail, dName, dEmail, hName, hCity, dDegree, contactnumber, dPhoneno, speciality, Disease, date, time, currentDate, image, status, update, _id};
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
    const time = labData.Hospital.time
    const speciality = labData.Doctor.speciality
    const pEmail = labData.Patient.email
    const dEmail = labData.Doctor.email
    const dDegree = labData.Doctor.degree
    const hCity = labData.Hospital.city
    const currentDate = new Date().toLocaleDateString();
    return createData(name, pEmail, dName, dEmail, dDegree, hName, hCity, phone, dPhoneno, speciality, Disease, date, time, currentDate, image, status, update, _id)
  })

  const rows = tableData
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [iid, setIid] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleUpdate = (id) => {
    setIid(id)
    handleOpen()
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="form-modal-title"
        aria-describedby="form-modal-description"
      >
        <div className={classes.paper} >
          <Typography fontSize={25} color={'#5048e5'}>Details</Typography>
          <TextField
            id="standard-basic"
            label="Hospital name"
            placeholder='Hospital/Clinic'
            value={apptDetail.hospital}
            onChange={(e)=>setApptDetail({...apptDetail,hospital: e.target.value})}
            fullWidth
          />
          <TextField
            id="standard-basic"
            label="Doctor name"
            placeholder='Doctor'
            value={apptDetail.doctor}
            onChange={(e)=>setApptDetail({...apptDetail,doctor: e.target.value})}
            fullWidth
          />
          <TextField
            id="standard-basic"
            label="Date"
            placeholder='e.g 13/12/2022'
            value={apptDetail.date}
            onChange={(e)=>setApptDetail({...apptDetail,date: e.target.value})}
            fullWidth
          />
          <TextField
            id="standard-basic"
            label="Time"
            placeholder='e.g: 02:00pm-09:00pm'
            value={apptDetail.time}
            onChange={(e)=>setApptDetail({...apptDetail,time: e.target.value})}
            fullWidth
          />
          <div className={classes.button}>
          <Button
            style={{marginTop: 10, marginRight: 5,}}
            variant='contained'
            onClick={()=>{
              onButtonClick(iid,apptDetail)
            }}
          >
            Send
          </Button>
          <Button
            style={{
              marginTop: 10,
              marginLeft: 5,
              borderWidth: 1,
              // borderColor: 'black',
              // backgroundColor: 'white'
            }}
            variant='outlined'
            onClick={handleClose}
          >
            cancel
          </Button>  
          </div>
          {/* <Button
            style={{marginTop: 10}}
            variant='contained'
            onClick={()=>console.log('Email sent to patient')}
          >
            Send
          </Button> */}
        </div>
      </Modal>
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
                              disabled={row.status == 'approved'}
                              style={row.status == 'approved'?{backgroundColor: 'gray',color: 'white'}:null}
                              variant='contained'
                              onClick={() => {
                                row.hName != 'Video Consultation Hospital'?
                                setApptDetail({
                                  email: row.pEmail,
                                  docEmail: row.dEmail,
                                  hospital: row.hName,
                                  doctor: row.dName,
                                  date: row.date,
                                  time: row.time
                                }):
                                onButtonClick1(row._id,{
                                  email: row.pEmail,
                                  docEmail: row.dEmail,
                                })
                                handleUpdate(row._id);
                              }}
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
                            <Typography style={{textTransform: 'capitalize'}} color= 'error.main' fontWeight='bold'>
                              {value}
                            </Typography>
                            :
                            <Typography style={{textTransform: 'capitalize'}} color= 'success.main' fontWeight='bold'>
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
