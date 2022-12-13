import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Add, Delete, Remove } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import CartSummary from './CartSummary';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { removeBasketItemAsync, setCart, addBasketItemAsync } from './slice/cartSlice';

const CartPage = () => {
   const {cart,status}=useAppSelector(state=>state.cart);
   const dispatch = useAppDispatch();

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
                <LoadingButton loading={status==='pendingAddItem'+items.productId} 
                  onClick={()=>dispatch(addBasketItemAsync({productId:items.productId}))} color='secondary'>
                  <Add/>
                </LoadingButton>
                {items.quantity}
                <LoadingButton loading={status==='pendingRemoveItem'+items.productId+'rmv'} 
                onClick={()=>dispatch(removeBasketItemAsync({productId:items.productId,quantity:1,name:'rmv'}))} color='error'>
                  <Remove/>
                </LoadingButton>
              </TableCell>
              <TableCell align="right">${(items.product.price*items.quantity)}</TableCell>
              <TableCell align="right">
                <LoadingButton loading={status==='pendingRemoveItem'+items.productId+'del'} 
                 onClick={()=>dispatch(removeBasketItemAsync({productId:items.productId,quantity:items.quantity,name:'del'}))} color='error'>
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