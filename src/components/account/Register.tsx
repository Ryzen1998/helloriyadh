import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link , useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import agent from '../../Api/agent';
import { toast } from 'react-toastify';



export default function Register() {
    const history = useNavigate();
    const {register,handleSubmit,setError,formState:{isSubmitting,errors,isValid}}=useForm({
             mode:'all'
    });

  const handleApiResponse=(response:any)=>{
    if(agent.responseObject.success===true && 
      agent.responseObject.message==='Registered')
    {
      toast.success('Registered, You can now login');
      history('/login');
      return;
    }

    Object.entries(response).map((error,index)=>{
      if(error[0].toLowerCase().includes('username')){
          setError('userName',{message: String(error[1])})
      } 
      else if(error[0].toLowerCase().includes('email')){
        setError('email',{message: String(error[1])})
      }
      else if(error[0].toLowerCase().includes('password')){
        setError('password',{message: String(error[1])})
      }
    });

  };
 
  return (
      <Container component={Paper} maxWidth="sm"sx={{display:'flex',flexDirection:'column',alignItems:'center',p:4}}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit(
            (data)=>agent.Account.register(data).then(res=>handleApiResponse(res)))} 
            noValidate sx={{ mt: 1 }}>

          <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              {...register('userName',{
                required:'Enter new username',
                pattern:{
                  value:/^(?=.*[a-zA-Z]{1,})(?=.*[\d]{0,})[a-zA-Z0-9]{3,15}$/,
                  message:'Username is invalid'
                }
              })}
              autoFocus
              error={!!errors.userName}
              helperText={errors?.userName?.message?.toString()}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              {...register('email',{
                required:'Enter E-mail address',
                pattern:{
                  value:/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
                  message:'Enter a valid Email Address'
                }
              })}
              error={!!errors.email}
              helperText={errors?.email?.message?.toString()}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              {...register('password',{
                required:'Invalid password',
                pattern:{
                  value:/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,
                  message:'Your password must be at least 7 characters long, contain at least one number and have a mixture of symbols,uppercase and lowercase letters'
                }
              })}
              onPaste={(e)=>e.preventDefault()}
              error={!!errors.password}
              helperText={errors?.password?.message?.toString()}
            />
            <LoadingButton
              type="submit"
              loading={isSubmitting}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isValid}
            >
              Register
            </LoadingButton>
            <Grid container>
              <Grid item>
                <Link to="/login">
                  {"Already have an accoun? login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
      </Container>
  );
}