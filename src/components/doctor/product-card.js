import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography, IconButton } from '@mui/material';
import { Clock as ClockIcon } from '../../icons/clock';
import { Download as DownloadIcon } from '../../icons/download';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';


export const ProductCard = ({ doctor, ...rest }) => {
  const [isClick, setIsClick] = useState(false)
  const [id, setId] = useState(0)
  const handleClick = (value) => {
    setIsClick(!isClick)
    setId(value)
  }
  return(
    <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    {...rest}
  >
    <CardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          pb: 3,
          position: 'relative'
        }}
      >
        <Avatar
          alt="Doctor"
          src={doctor.media}
          variant="square"
        />
         <IconButton
            edge="end"
            size="small"
            onClick={() => {handleClick(doctor._id)}}
          >
            <MoreVertIcon />
          </IconButton>
          {(isClick && id == doctor._id) &&
          <Grid item sx={{width: '90px', height:'50px', bgcolor:'#FAF9F6', position: 'absolute', top: '40px', left: '150px', p: '10px', borderRadius: '10px'}}>
              <Typography
                color = 'error.main'
                fontSize='1.1rem'
                fontWeight = 'bold'
                sx={{pr: '10px', py:'2px', pl: '5px'}}
              >
                Delete
              </Typography>
          </Grid>
          }
      </Box>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h5"
      >
        {doctor.title}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        variant="body1"
      >
        {doctor.description}
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          {/* <ClockIcon color="action" /> */}
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            Diabties
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          {/* <DownloadIcon color="action" /> */}
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            {doctor.totalDownloads}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Card>
  )
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};
