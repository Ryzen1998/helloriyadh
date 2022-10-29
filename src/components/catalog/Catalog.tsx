import ProductList from "../product/ProductList";
import { Product } from "../../models/product/Product";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";



const Catalog = () => {
  
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:21466/api/products/getproducts")
      .then((response) => response.json())
      .then((data) => setProducts(data.data));
  }, []);

  return (
    <>
      <ProductList products={products}></ProductList>
      <Button variant="contained" >Add Product</Button>
    </>
  );
};

export default Catalog;
