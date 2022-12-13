import { debounce, TextField } from "@mui/material"
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setProductParams } from "./slice/catalogSlice";
import { useState } from 'react';


const ProductSearch = () => {
    const {productParams}=useAppSelector(state=>state.catalog);
    const dispatch = useAppDispatch();
    const [searchTerm,setSearchTerm]=useState(productParams.searchTerm);

    const deBouncedSearch=debounce((e:any)=>{
        dispatch(setProductParams({searchTerm:e.target.value}))
    },1000)
  return (
    <TextField label='Search Products'
     variant='outlined' fullWidth
     value={searchTerm||''}
     onChange={(e:any)=>{
        setSearchTerm(e.target.value);
        deBouncedSearch(e);
     }}
     />
   
  )
}

export default ProductSearch