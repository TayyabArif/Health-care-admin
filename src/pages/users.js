import Head from 'next/head';
import { Box, Button, Container } from '@mui/material';
import { CustomerListResults } from '../components/user/customer-list-results';
import { CustomerListToolbar } from '../components/user/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import CircularProgress from '@mui/material/CircularProgress';
import { customers } from '../__mocks__/customers';
import { useEffect, useState } from 'react';

const Page = () => {
  const [users, setUsers] =useState()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    async function getData() {
      try{
        const res = await fetch('https://health-care-server-sooty.vercel.app/users')
        const data = await res.json()
        setUsers(data)
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
          Health care | Users
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
          <CustomerListToolbar />
          <Box sx={{ mt: 3 }}>
            <Button >name</Button>
            <CustomerListResults customers={users} />
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
