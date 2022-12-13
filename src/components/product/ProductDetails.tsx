import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from '../../store/store';
import { addBasketItemAsync, removeBasketItemAsync} from "../cart/slice/cartSlice";
import { fetchProductAsync, productSelectors } from "../catalog/slice/catalogSlice";

const ProductDetails = () => {
  const{cart,status}=useAppSelector(state=>state.cart);
  const{status:productStatus}=useAppSelector(state=>state.catalog);
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector(state=>productSelectors.selectById(state,id!))
  const dispatch = useAppDispatch();
  const [quantity,setQuantity]=useState(0);
  const item = cart?.cartItems.find(x=>x.productId===product?.id);

  const handleQuantityChange=(event:any)=>{
    if(event.target.value >= 0)
    setQuantity(parseInt(event.target.value))
  }
  const handleCartUpdate=()=>{
    if(!item||quantity>item.quantity){
      const updatedQuantity = item ? quantity - item.quantity : quantity;
         dispatch(addBasketItemAsync({productId:product?.id!,quantity:updatedQuantity}))
    }
    else{
      const updatedQuantity =item?.quantity - quantity;
      dispatch(removeBasketItemAsync({productId:product?.id!,quantity:updatedQuantity}))
     
    }
  }

  useEffect(() => {
    if(item){
      setQuantity(item.quantity);
    }
    if(product===undefined)
     dispatch(fetchProductAsync(parseInt(id!)))
  }, [id,item,dispatch,product]);

  if(productStatus==='pendingFetchProduct')  <h1>Loading....</h1>
  if(!product)   <h1>Product not found</h1>

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product?.pictureUrl}
          alt={product?.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product?.name}</Typography>
        <Divider sx={{ mb: "2" }} />
        <Typography variant="h4" color="secondary">
          $
          {product?.price != null
            ? product?.price
            : "Price unavailable"}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product?.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product?.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product?.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product?.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in Stock</TableCell>
                <TableCell>{product?.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField onChange={handleQuantityChange}
            variant='outlined'
            type='number'
            label='Quantity in cart'
            fullWidth
            value={quantity}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton 
            disabled={item?.quantity===quantity ||(!item && quantity===0)}
            onClick={handleCartUpdate}
            loading={status.includes('pendingRemoveItem'+item?.productId)}
             sx={{height:'55px'}}
             color='primary'
             size='large'
             variant='contained'
             fullWidth
            >
              {item?.quantity?'Update quantity':'Add to cart'}
            </LoadingButton>
          </Grid>

        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
