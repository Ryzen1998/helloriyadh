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
import { Product } from "../../models/product/Product";
import agent from '../../Api/agent';
import { LoadingButton } from "@mui/lab";
import { useAppSelector } from '../../store/store';
import { useDispatch } from 'react-redux';
import { removeItem, setCart } from "../cart/slice/cartSlice";

const ProductDetails = () => {
  const{cart}=useAppSelector(state=>state.cart);
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity,setQuantity]=useState(0);
  const [submitting,setSubmitting]=useState(false);
  const item = cart?.cartItems.find(x=>x.productId===product?.id);

  const handleQuantityChange=(event:any)=>{
    if(event.target.value >= 0)
    setQuantity(parseInt(event.target.value))
  }
  const handleCartUpdate=()=>{
    setSubmitting(true);
    if(!item||quantity>item.quantity){
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      agent.Cart.addItem(product?.id!,updatedQuantity).then(cart=>
        dispatch(setCart(cart))).catch(error=>console.log(error))
        .finally(()=>setSubmitting(false)); 
    }
    else{
      const updatedQuantity =item?.quantity - quantity;
      agent.Cart.removeItem(product?.id!,updatedQuantity).then(
        ()=>dispatch(removeItem({productId:product?.id!,quantity:updatedQuantity}))
      ).catch(error=>console.log(error)).finally(()=>setSubmitting(false));
    }
  }

  useEffect(() => {
    if(item){
      setQuantity(item.quantity);
    }
   agent.Catalog.details(Number(id)).then(response=>setProduct(response))
   .catch(error=>console.log(error)).finally(()=>setLoading(false))
  }, [id,item]);

  if (loading) return <h1>Loading....</h1>;

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
            loading={submitting}
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
