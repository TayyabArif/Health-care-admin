import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function LoginForm() {
  const form = useRef();
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [formError, setFormError]=useState("");
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const handleEmailChange = event => {
    !isValidEmail(event.target.value) ?
    setErrors('Email is invalid') : setErrors(null)
    setEmail(event.target.value)
  };
  const handleSubmit = (event) => {
    setIsLoading(true)
    console.log('entered')
    console.log('email', email)
    event.preventDefault();
    axios.get(`https://health-care-server-sooty.vercel.app/users?email=${email}&password=${password}`, {headers: { 'Content-Type': 'application/json' }})
    .then(response => {
        setIsLoading(false)
        console.log()
        if (response.data[0].type === 'admin'){
          toast.success("You're login successfully");
          localStorage.setItem('type', response.data[0].type)
          localStorage.setItem('email', response.data[0].email)
          localStorage.setItem('name', response.data[0].name)
          router.push('/dashboard');
        }
        else
        toast.success("Email or password is wrong");
    })
    .catch(error => {
        setIsLoading(false)
       toast.error("Email or password is wrong");
    });
    form.current.reset();
  };


  return (
    <>
    {isLoading ?
    <Box sx={{ display: 'flex', height: '100vh', width: '100%', }} justifyContent='center' alignItems="center">
    <CircularProgress />
    </Box> :
      <Container component="main" maxWidth="sm" >
        <CssBaseline />
        <Box
            sx={{
              marginTop: 8,
              boxShadow: 5,
              padding: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: "rgba(255,255,255, 0.8)",
              borderRadius: "50px",
              border: "3px solid",
              borderColor: "primary.light"
            }}
          >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Log in
              </Typography>
              <Box component="form" ref={form} onSubmit={handleSubmit}  sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name={email}
                    autoComplete="email"
                    type="email"
                    error = {errors == null? false : true}
                    helperText={errors == null ? ' ' : 'Email is not valid' }
                    autoFocus
                    onChange={(e) => {
                      handleEmailChange(e)
                    }
                    }
                  >
                  </TextField>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name={password}
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Log In
                  </Button>
                  <ToastContainer />
                  <Grid container>
                    <Grid item xs>
                    </Grid>

                  </Grid>
              </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    }
    </>
  );
}
