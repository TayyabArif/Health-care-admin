import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';
import { useEffect, useState } from 'react';

export const Doctors = (props) => {
  const [doctors, setDoctors] = useState()
  useEffect(() => {
    async function getData() {
      try{
        const res = await fetch('https://health-care-server-sooty.vercel.app/doctors')
        const data = await res.json()
        setDoctors(data.length)
      }
      catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])
  return (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            Doctors
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {doctors}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <img src='/Assets/images/stethoscope.svg' alt='Picture' className=''/>
          </Avatar>
          {/* <img src='/Assets/images/stethoscope.svg' alt='Picture' className=''/> */}
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* <ArrowDownwardIcon color="error" />
        <Typography
          color="error"
          sx={{
            mr: 1
          }}
          variant="body2"
        >
          12%
        </Typography> */}
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Till Today
        </Typography>
      </Box>
    </CardContent>
  </Card>
  )
};
