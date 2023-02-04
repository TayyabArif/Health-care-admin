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

  const handleButtonClick = (id,detail) => {
    console.log(id, detail)
    setIsLoading(true)
    axios.put(`https://health-care-server-sooty.vercel.app/updateAppointmentStatus?_id=${id}&status=approved`, {headers: { 'Content-Type': 'application/json' }})
    .then(response => {
        // Handle the response
        console.log(response.data[0]._id)
        setId(response.data[0]._id)
        setIsLoading(false)
        axios.post(`https://health-care-server-sooty.vercel.app/sendApptMail?email=${detail.email}&hospital=${detail.hospital}&doctor=${detail.doctor}&date=${detail.date}&time=${detail.time}`).then((res)=>{
          toast.success("Appointment details shared with patient!");
        }).catch((e)=>{
          console.log('Error in sending mail!',e)
          toast.error("An error occur while sending mail to patient");
        })

        axios.post(`https://health-care-server-sooty.vercel.app/sendApptMail?email=${detail.docEmail}&hospital=${detail.hospital}&doctor=${detail.doctor}&date=${detail.date}&time=${detail.time}`).then((res)=>{
          toast.success("Appointment details shared with doctor!");
        }).catch((e)=>{
          console.log('Error in sending mail!',e)
          toast.error("An error occur while sending mail to doctor");
        })

        toast.success("Your Appointment is Approved Successfully!");
    })
    .catch(error => {
      setId("")
      toast.error("An error occur while Approving Appointment");
    });
  };

  const handleButtonClick1 = (id,detail) => {
    console.log(id, detail)
    setIsLoading(true)
    axios.put(`https://health-care-server-sooty.vercel.app/updateAppointmentStatus?_id=${id}&status=approved`, {headers: { 'Content-Type': 'application/json' }})
    .then(response => {
        // Handle the response
        console.log(response.data[0]._id)
        setId(response.data[0]._id)
        setIsLoading(false)

        axios.post(`https://health-care-server-sooty.vercel.app/createvideocallid`).then((res)=>{
          console.log(res.data)
          let temp = res.data.callID;

          axios.post(`https://health-care-server-sooty.vercel.app/sendVideoID?email=${detail.email}&id=${temp}`).then((res)=>{
            toast.success("Video call details shared with patient!");
            console.log(res.data)
          }).catch((e)=>{
            console.log('Error in sending mail!1',e)
            toast.error("An error occur while sending mail to patient");
          })

          axios.post(`https://health-care-server-sooty.vercel.app/sendVideoID?email=${detail.docEmail}&id=${temp}`).then((res)=>{
            toast.success("Video call detail shared with doctor!");
            console.log(res.data)
          }).catch((e)=>{
            console.log('Error in sending mail!2',e)
            toast.error("An error occur while sending mail to doctor");
          })

        }).catch((e)=>{
          console.log('Error in sending mail!3',e)
          toast.error("An error occur while Generating video call id");
        })

        toast.success("Your Video consultation is Approved Successfully!");
    })
    .catch(error => {
      setId("")
      toast.error("An error occur while Approving video consultation");
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
            <AllAppointments appointments = {appointments} onButtonClick= {handleButtonClick} onButtonClick1= {handleButtonClick1}/>
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
