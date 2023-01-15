import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useEffect, useState } from 'react';

export const Nurses = (props) => {
  const [totalNurses, setTotalNurses] =useState()
  useEffect(() => {
    async function getData() {
      try{
        const res = await fetch('https://health-care-server-sooty.vercel.app/nurses')
        const data = await res.json()
        setTotalNurses(data.length)
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
            sx={{pr:10}}
          >
            Nurses
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {totalNurses}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <PersonAddIcon sx={{height: 40, width: 40}} />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 2
        }}
      >
        <ArrowUpwardIcon color="success" />
        <Typography
          variant="body2"
          sx={{
            mr: 1
          }}
        >
          16%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Since last month
        </Typography>
      </Box>
    </CardContent>
  </Card>
  )
};
