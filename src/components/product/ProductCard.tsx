import { ListItem, ListItemAvatar, Avatar, ListItemText, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader, colors } from "@mui/material"
import { Product } from '../../models/product/Product';

interface Props{
product:Product;
}

const ProductCard = ({product}:Props) => {
  return (
<Card>
  <CardHeader avatar={
    <Avatar sx={{bgcolor:'secondary.main'}}>
      {product.name.charAt(0).toUpperCase()}
    </Avatar>
  } title={product.name} titleTypographyProps={{sx:{fontWeight:'bold',color:'primary.main'}}}>
    
  </CardHeader>
<CardMedia
  component="img"
  sx={{height:140,backgroundSize:'contain',bgcolor:'primary.light'}}
  image={product.pictureUrl}
  alt={product.name}
/>
<CardContent>
  <Typography gutterBottom color='secondary' variant="h5">
   ${(product.price/100).toFixed(2)}
  </Typography>
  <Typography variant="body2" color="text.secondary">
  {product.brand} - {product.type}
  </Typography>
</CardContent>
<CardActions>
  <Button size="small">Add to cart</Button>
  <Button size="small">View</Button>
</CardActions>
</Card>
  )
}

export default ProductCard