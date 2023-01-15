import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { products } from '../__mocks__/products';
import { DoctorCard } from '../components/doctor/doctor-card';
import { DashboardLayout } from '../components/dashboard-layout';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { NursesListToolbar } from '../components/nurses/nurses-list-toolbar';
import { NurseCard } from '../components/nurses/nurse-card';
import { HospitalsListToolbar } from '../components/hospitals/hospitals-list-toolbar';
import { HospitalCard } from '../components/hospitals/hospital-card';

const Page = () => {
  const [hospitals, setHospitals] =useState()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    async function getData() {
      try{
        const res = await fetch('https://health-care-server-sooty.vercel.app/Hospitals')
        const data = await res.json()
        setHospitals(data)
        setIsLoading(false)
        console.log(data)
      }
      catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])
  return(
    <>
    {isLoading ?
    <Box sx={{ display: 'flex', height: '100vh', width: '100%', }} justifyContent='center' alignItems="center">
    <CircularProgress />
    </Box> :
    <>
      <Head>
        <title>
          Hospitals | Health Care
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
          <HospitalsListToolbar />
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              {hospitals?.map((hospital) => (
                <Grid
                  item
                  key={hospital._id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <HospitalCard hospital={hospital} />
                </Grid>
              ))}
            </Grid>
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
