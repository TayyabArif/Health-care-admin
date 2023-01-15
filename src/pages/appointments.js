import Head from 'next/head';
import { Box, Container } from '@mui/material';
import {AllLabTests} from '../components/labtests/all-lab-tests'
import { LabTestToolbar } from '../components/labtests/lab-test-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { AppointmentListToolbar } from '../components/Appointments/appointment-list-toolbar';
import { AllAppointments } from '../components/Appointments/all-appointments';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const [appointments, setAppointments] =useState()
  const [isLoading, setIsLoading] = useState(true)
  const [id, setId] = useState("")

  useEffect(() => {
    async function getData() {
      try{
        const res = await fetch('https://health-care-server-sooty.vercel.app/getappointment')
        const data = await res.json()
        setAppointments(data)
        setIsLoading(false)
      }
      catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id])

  const handleButtonClick = (id) => {
    console.log(id)
    setIsLoading(true)
    axios.put(`https://health-care-server-sooty.vercel.app/updateAppointmentStatus?_id=${id}&status=approved`, {headers: { 'Content-Type': 'application/json' }})
    .then(response => {
        // Handle the response
        console.log(response.data[0]._id)
        setId(response.data[0]._id)
        setIsLoading(false)
        toast.success("Your Appointment is Approved Successfully!");
    })
    .catch(error => {
      setId("")
      toast.error("An error occur while Approving Appointment");
    });
  };

  return (
  <>
  {isLoading ?
    <Box sx={{ display: 'flex', height: '100vh', width: '100%', }} justifyContent='center' alignItems="center">
    <CircularProgress />
    </Box> :
    <>
      <Head>
        <title>
          Health care | Appointments
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <AppointmentListToolbar />
          <Box sx={{ mt: 3 }}>
            <AllAppointments appointments = {appointments} onButtonClick= {handleButtonClick}/>
            <ToastContainer />
          </Box>
        </Container>
      </Box>
    </>
  }
  </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
