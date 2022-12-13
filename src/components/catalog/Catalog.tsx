import ProductList from "../product/ProductList";
import {
  Grid,
  Paper,
} from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  fetchProductsAsync,
  productSelectors,
  fetchFilters,
  setProductParams,
  setPageNumber,
} from "./slice/catalogSlice";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../sharedComponents/RadioButtonGroup";
import CheckBoxGroup from "../sharedComponents/CheckBoxGroup";
import AppPagination from "../sharedComponents/AppPagination";

const sortOptions = [
  { value: "", label: "Alphabetical" },
  { value: "priceDesc", label: "Price-High to Low" },
  { value: "price", label: "Price-Low to High" },
];

const Catalog = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const dispatch = useAppDispatch();
  const { productsLoaded, status, filtersLoaded, brands, types,productParams,metaData } =
    useAppSelector((state) => state.catalog);

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [filtersLoaded, dispatch]);

  if (status.includes("pendingFetchProducts")||!metaData) return <h1>Loading....</h1>;

  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
        <RadioButtonGroup 
        onChange={(e)=>dispatch(setProductParams({orderBy:e.target.value}))}
        options={sortOptions}
        selectedValue={productParams.orderBy}/>
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckBoxGroup  items={brands} label={'Brand'}
          checked={productParams.brands}
          onChange={(items:string[])=>dispatch(setProductParams({brands:items}))}/>
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
        <CheckBoxGroup items={types} label={'Type'}
          checked={productParams.types}
          onChange={(items:string[])=>dispatch(setProductParams({types:items}))}/>
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products}></ProductList>
      </Grid>
      <Grid item xs={3}></Grid>
      <Grid item xs={9} sx={{mb:2}}>
       <AppPagination
        metaData={metaData}
        onPageChange={(page:number)=>dispatch(setPageNumber({pageNumber:page}))}
         />
      </Grid>
    </Grid>
  );
};

export default Catalog;
