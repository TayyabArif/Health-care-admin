import Head from 'next/head';
import { Box, Container } from '@mui/material';
import {AllLabTests} from '../components/labtests/all-lab-tests'
import { LabTestToolbar } from '../components/labtests/lab-test-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { MedicineToolbar } from '../components/medicine/medicine-toolbar';
import { AllMedicines } from '../components/medicine/all-medicines';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const [medicines, setMedicines] =useState()
  const [isLoading, setIsLoading] = useState(true)
  const [id, setId] = useState("")

  useEffect(() => {
    async function getData() {
      try{
        const res = await fetch('https://health-care-server-sooty.vercel.app/getmedicine')
        const data = await res.json()
        setMedicines(data[0])
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
    axios.put(`https://health-care-server-sooty.vercel.app/updatemedicine?_id=${id}&status=approved`, {headers: { 'Content-Type': 'application/json' }})
    .then(response => {
        // Handle the response
        setId(response.data[0]._id)
        setIsLoading(false)
        toast.success("Your Medicine is Approved Successfully!");
    })
    .catch(error => {
      setIsLoading(false)
      setId("")
      toast.error("An error occur while Approving Medicine");
    });
  };
  const paymentUpdate = (id) => {
    setIsLoading(true)
    axios.put(`https://health-care-server-sooty.vercel.app/medicinepayment?_id=${id}&payment=paid`, {headers: { 'Content-Type': 'application/json' }})
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
          <MedicineToolbar />
          <Box sx={{ mt: 3 }}>
            <AllMedicines medicines = {medicines} onButtonClick={handleButtonClick} onPaymentUpdate={paymentUpdate}/>
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
