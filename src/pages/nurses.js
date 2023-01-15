import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { products } from '../__mocks__/products';
import { DoctorCard } from '../components/doctor/doctor-card';
import { DashboardLayout } from '../components/dashboard-layout';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { NursesListToolbar } from '../components/nurses/nurses-list-toolbar';
import { NurseCard } from '../components/nurses/nurse-card';

const Page = () => {
  const [nurses, setNurses] =useState()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    async function getData() {
      try{
        const res = await fetch('https://health-care-server-sooty.vercel.app/nurses')
        const data = await res.json()
        setNurses(data)
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
          Nurses | Health Care
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
          <NursesListToolbar />
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              {nurses?.map((nurse) => (
                <Grid
                  item
                  key={nurse._id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <NurseCard nurse={nurse} />
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
