import ProductList from "../product/ProductList";
import { Product } from "../../models/product/Product";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import agent from '../../Api/agent';



const Catalog = () => {
  
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
   agent.Catalog.list().then(products=>setProducts(products));
  }, []);

  return (
    <>
      <ProductList products={products}></ProductList>
      <Button variant="contained" >Add Product</Button>
    </>
  );
};

export default Catalog;
