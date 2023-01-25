import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography, Grid
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import { Download as DownloadIcon } from '../../icons/download';
import { AddDoctor } from '../doctor/add-doctor-modal';

export const NursesListToolbar = (props) => (
  <Box {...props} sx={{width: '100%'}}>
     <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        m: -1
      }}
    >
      <Typography
        sx={{ m: 1 }}
        variant="h4"
      >
        Nurses
      </Typography>
      <Box sx={{ m: 1 }}>
      </Box>
      <Box sx={{ m: 1 }}>
        {/* <Button
          startIcon={(<UploadIcon fontSize="small" />)}
          sx={{ mr: 1 }}
        >
          Import
        </Button>
        <Button
          startIcon={(<DownloadIcon fontSize="small" />)}
          sx={{ mr: 1 }}
        >
          Export
        </Button>
        <Button
          color="primary"
          variant="contained"
        >
          Add Users
        </Button> */}
      </Box>
    </Box>
    <Grid container item sx={{}} >
      <Typography
        sx={{ m: 1 }}
        variant="h4"
        fontSize='1.2rem'
        color='primary'
      >
        Keep Track of your Registered Users in your Hand
      </Typography>
    </Grid>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          {/* <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      color="action"
                      fontSize="small"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search customer"
              variant="outlined"
            />
          </Box> */}
        </CardContent>
      </Card>
    </Box>
  </Box>
);
