import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { signout } from '../account/slice/accountsSlice';
import { useNavigate } from 'react-router-dom';
import { removeCart } from '../cart/slice/cartSlice';

export default function SignedInMenu() {
    const dispatch=useAppDispatch();
    const navigate = useNavigate();
    const signoff=()=>{
        dispatch(signout());
        dispatch(removeCart());

        navigate('/login');
    }
    const {user}=useAppSelector(state=>state.account)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button color={'inherit'} sx={{typography:'h6'}} onClick={handleClick} >
        {user?.email}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My orders</MenuItem>
        <MenuItem onClick={()=>signoff()}>Logout</MenuItem>
      </Menu>
    </>
  );
}