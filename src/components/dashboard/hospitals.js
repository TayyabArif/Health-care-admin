import { Avatar, Card, CardContent, Grid, Typography, Box } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useEffect, useState } from 'react';

export const Hospitals = (props) => {
  const [totalHospitals, setTotalHospitals] =useState()
  useEffect(() => {
    async function getData() {
      try{
        const res = await fetch('https://health-care-server-sooty.vercel.app/Hospitals')
        const data = await res.json()
        setTotalHospitals(data.length)
      }
      catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])
  return (
  <Card {...props}>
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
            Hospitals
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {totalHospitals}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <LocalHospitalIcon sx={{height: 40, width: 40}}/>
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
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
