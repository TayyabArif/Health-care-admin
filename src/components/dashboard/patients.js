import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';
import AccessibleIcon from '@mui/icons-material/Accessible';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


export const Patients = (props) => (
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
            sx={{pr: 10}}
          >
            Patients
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            4567
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56
            }}
          >
            <AccessibleIcon sx={{height: 40, width: 40}}/>
          </Avatar>
        </Grid>
      </Grid>
      <Box sx={{ pt: 3,
        alignItems: 'center',
        display: 'flex',
        pt: 2 }}
      >
        {/* <LinearProgress
          value={75.5}
          variant="determinate"
        /> */}
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
);
