import Head from 'next/head';
import { Box, Container } from '@mui/material';
import {AllLabTests} from '../components/labtests/all-lab-tests'
import { LabTestToolbar } from '../components/labtests/lab-test-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const [labTests, setLabTests] =useState()
  const [isLoading, setIsLoading] = useState(true)
  const [id, setId] = useState("")
  useEffect(() => {
    async function getData() {
      try{
        const res = await fetch('https://health-care-server-sooty.vercel.app/getlabtests')
        const data = await res.json()
        setLabTests(data)
        setIsLoading(false)
      }
      catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id])

  const handleButtonClick = (id) => {
    setIsLoading(true)
    axios.put(`https://health-care-server-sooty.vercel.app/updatelabtest?_id=${id}&status=approved`, {headers: { 'Content-Type': 'application/json' }})
    .then(response => {
        // Handle the response
        setId(response.data[0]._id)
        setIsLoading(false)
        toast.success("Your Lab test is Approved Successfully!");
    })
    .catch(error => {
      setIsLoading(false)
      setId("")
      toast.error("An error occur while Approving Lab test");
    });
  };

  const paymentUpdate = (id) => {
    setIsLoading(true)
    axios.put(`https://health-care-server-sooty.vercel.app/labtestpayment?_id=${id}&payment=paid`, {headers: { 'Content-Type': 'application/json' }})
    .then(response => {
        // Handle the response
        setId(response.data[0]._id)
        setIsLoading(false)
        toast.success("Your Payment Approved Successfully!");
    })
    .catch(error => {
      setIsLoading(false)
      setId("")
      toast.error("An error occur while Approving Payment");
    });
  }
  return (
  <>
  {isLoading ?
    <Box sx={{ display: 'flex', height: '100vh', width: '100%', }} justifyContent='center' alignItems="center">
    <CircularProgress />
    </Box> :
    <>
      <Head>
        <title>
          Health care | Lab Tests
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
          <LabTestToolbar />
          <Box sx={{ mt: 3 }}>
            <AllLabTests labTests = {labTests} onButtonClick = {handleButtonClick} onPaymentUpdate={paymentUpdate}/>
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
