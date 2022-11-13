import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { useStoreContext } from "../../context/StoreContext";
import { useAppSelector } from '../../store/store';

const CartSummary = () => {
    const {cart}=useAppSelector(state=>state.cart);
    const subtotal=cart?.cartItems.reduce((sum,item)=>sum+(item.quantity*item.product.price),0)?? 0;
    const deliveryFee:number = subtotal>1000?0:100;

  return (
   <>
   <TableContainer component={Paper} variant={'outlined'}>
    <Table>
        <TableBody>
            <TableRow>
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{subtotal}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell colSpan={2}>Delivery Fee</TableCell>
            <TableCell align="right">{deliveryFee}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{subtotal+deliveryFee}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>
                <span style={{fontStyle:'italic'}}>*Orders over $100 qualify for free delivery</span>
            </TableCell>
            </TableRow>
        </TableBody>
    </Table>
   </TableContainer>
   </>
  )
}

export default CartSummary