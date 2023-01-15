import { formatDistanceToNow, subHours } from 'date-fns';
import { v4 as uuid } from 'uuid';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';

const products = [
  {
    id: uuid(),
    name: `Dr.Essa's Laboratory & Diagnostic center`,
    imageUrl: 'https://pbs.twimg.com/profile_images/1054276848635523072/8hphsHvv_400x400.jpg',
    city: 'peshawar',
    timings: '9:00AM-10:00PM'
  },
  {
    id: uuid(),
    name: `chugtai lab`,
    imageUrl: 'https://static.marham.pk/assets/labs/2/chugtai-medical-25.png',
    city: 'Lahore',
    timings: '9:00AM-6:00PM'
  },
  {
    id: uuid(),
    name: 'Citilab and Research Centre',
    imageUrl: 'https://static.marham.pk/assets/labs/7/bd25b02dd90cf6a35218cf32ba2e3f21.png',
    city: 'Lahore',
    timings: '8:00AM-11:00PM'
  },
  {
    id: uuid(),
    name: 'CLINLAB',
    imageUrl: 'https://static.marham.pk/assets/labs/16/b4b5ac145d89531429feaccaf4af71b6.png',
    city: 'Islamabad',
    timings: '9:00AM-11:00PM'
  },
  {
    id: uuid(),
    name: 'Mughal Labs Diagnostics and Research',
    imageUrl: 'https://static.marham.pk/assets/labs/19/89790232_233431751390742_2819482709397602304_n.jpg',
    city: 'Lahore',
    timings: '24 hours'
  }
];

export const LatestProducts = (props) => {
  const [isClick, setIsClick] = useState(false)
  const [id, setId] = useState(0)
  const handleClick = (value) => {
    setIsClick(!isClick)
    setId(value)
  }
  return(
    <Card {...props}>
    <CardHeader
      subtitle={`${products.length} in total`}
      title="Top Labs"
    />
    <Divider />
    <List>
      {products.map((product, i) => (
        <ListItem
          divider={i < products.length - 1}
          key={product.id}
        >
          <ListItemAvatar>
            <img
              alt={product.name}
              src={product.imageUrl}
              style={{
                height: 48,
                width: 48
              }}
            />
          </ListItemAvatar>
          <Grid container item direction='column' sx={{width: '100%'}}>
            <ListItemText
              primary={product.name}
              secondary={product.city}
            />
            <ListItemText
              secondary={product.timings}
            />
          </Grid>
          <IconButton
            edge="end"
            size="small"
            onClick={() => {handleClick(product.id)}}
          >
            <MoreVertIcon />
          </IconButton>
          {(isClick && id == product.id) &&
          <Grid item sx={{width: '90px', height:'50px', bgcolor:'#FAF9F6', position: 'absolute', top: '75px', left: '180px', p: '10px', borderRadius: '10px'}}>
              <Typography
                color = 'error.main'
                fontSize='1.1rem'
                fontWeight = 'bold'
                sx={{pr: '10px', py:'2px', pl: '5px'}}
              >
                Delete
              </Typography>
          </Grid>}
        </ListItem>
        ))}
    </List>
    <Divider />
    {/* <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box> */}
  </Card>
  )
};
