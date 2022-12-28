import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link , useNavigate,useLocation} from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { signInUser } from './slice/accountsSlice';


export default function Login() {
    const history = useNavigate();
    const dispatch =useAppDispatch(); 
    const location = useLocation();
    const user = useAppSelector(state=>state.account.user)

  const {register,handleSubmit,setError,formState:{isSubmitting,errors,isValid}}=useForm({
    mode:'all'
  });

   const submitForm = async(data:FieldValues)=>{

    try {
      await dispatch(signInUser(data)).then(()=>{
      if(user!==null){
        console.log('user')
        history(location.state?.from?.pathname || '/catalog')
      }
      else{
        setError('userName',{message:'Please enter a valid username'})
        setError('password',{message:'please enter a valid password'})
      }});
    } catch (error) {
      console.log(error)
    }}

  return (
      <Container component={Paper} maxWidth="sm"sx={{display:'flex',flexDirection:'column',alignItems:'center',p:4}}>

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              {...register('userName',{required:'Enter E-mail address',
              pattern:{
                value:/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
                message:'Enter a valid Email Address'
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
              label="Password"
              type="password"
              {...register('password',{required:'Invalid password',
              pattern:{
                value:/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,
                message:'Invalid combination'
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
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item>
                <Link to="/register">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
      </Container>
  );
}