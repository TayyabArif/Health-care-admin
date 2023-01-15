import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { products } from '../__mocks__/products';
import { DoctorListToolbar } from '../components/doctor/doctor-list-toolbar';
import { DoctorCard } from '../components/doctor/doctor-card';
import { DashboardLayout } from '../components/dashboard-layout';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Page = () => {
  const [doctors, setDoctors] =useState()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    async function getData() {
      try{
        const res = await fetch('https://health-care-server-sooty.vercel.app/doctors')
        const data = await res.json()
        setDoctors(data)
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
          Doctors | Health Care
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
          <DoctorListToolbar />
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              {doctors?.map((doctor) => (
                <Grid
                  item
                  key={doctor._id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <DoctorCard doctor={doctor} />
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
