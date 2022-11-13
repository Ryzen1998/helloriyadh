import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Add, Delete, Remove } from '@mui/icons-material';
import { useState } from 'react';
import agent from '../../Api/agent';
import { LoadingButton } from '@mui/lab';
import CartSummary from './CartSummary';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { removeItem, setCart } from './slice/cartSlice';

const CartPage = () => {
   const {cart}=useAppSelector(state=>state.cart);
   const dispatch = useAppDispatch();
   const[loadingStatus,setLoadingStatus]=useState({
    loading:false,
    name:''
   });

   const handbleAddItem=(productId:number,name:string)=>{
   setLoadingStatus({loading:true,name})
    agent.Cart.addItem(productId).then(cart=>dispatch(setCart(cart))).catch(error=>console.log(error))
    .finally(()=>setLoadingStatus({loading:false,name:''}))

   }

   const handleRemoveItem=(productId:number,quantity=1,name:string)=>{
    setLoadingStatus({loading:true,name})
    agent.Cart.removeItem(productId,quantity)
    .then(()=>dispatch(removeItem({productId,quantity}))).catch(error=>console.log(error))
    .finally(()=>setLoadingStatus({loading:false,name:''}))

   }


    if (!cart) return<Typography>your cart is empty</Typography>
  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right">Modify</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart?.cartItems.map((items,index) => (
            items.quantity>0&&
            <TableRow
              key={items.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <Box display={'flex'} alignItems='center'>
                  <img src={items.product.pictureUrl} alt={items.product.name} style={{height:50,marginRight:20}}/>
                   <span>{items.product.name}</span>
                </Box>
              </TableCell>
              <TableCell align="right">${items.product.price}</TableCell>
              <TableCell align="center">
                <LoadingButton loading={loadingStatus && loadingStatus.name==='add'+items.productId
                } onClick={()=>handbleAddItem(items.productId,'add'+items.productId)} color='secondary'>
                  <Add/>
                </LoadingButton>
                {items.quantity}
                <LoadingButton loading={loadingStatus && loadingStatus.name==='rmv'+items.productId
                  
                } onClick={()=>handleRemoveItem(items.productId,1,'rmv'+items.productId)} color='error'>
                  <Remove/>
                </LoadingButton>
              </TableCell>
              <TableCell align="right">${(items.product.price*items.quantity)}</TableCell>
              <TableCell align="right">
                <LoadingButton loading={loadingStatus && loadingStatus.name==='del'+items.productId

                }  onClick={()=>handleRemoveItem(items.productId,items.quantity,'del'+items.productId)} color='error'>
                  <Delete/>
                </LoadingButton>
              </TableCell>
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Grid container>
      <Grid item xs={6}/>
      <Grid item xs={6}>
        <CartSummary/>
        <Button 
        component={Link}
         to='/checkout'
         variant='contained'
         size='large'
         fullWidth
         >
          Checkout
          </Button>
      </Grid>
    </Grid>
    </>
  )
}

export default CartPage