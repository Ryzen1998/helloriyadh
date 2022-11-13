import { createTheme, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { Container } from "@mui/system";
import "./App.css";
import Catalog from "./components/catalog/Catalog";
import Header from "./components/layouts/Header";
import { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import ProductDetails from "./components/product/ProductDetails";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CartPage from './components/cart/CartPage';
import { getCookies } from './utils/utils';
import agent from './Api/agent';
import CheckoutPage from './components/checkout/CheckoutPage';
import { useAppDispatch } from "./store/store";
import { setCart } from "./components/cart/slice/cartSlice";

function App() {
  const dispatch = useAppDispatch();
  const [loading,setloading]=useState(true);

useEffect(()=>{
  const buyerid = getCookies('buyerId');
  if(buyerid){
    agent.Cart.get().then(cart=>dispatch(setCart(cart))).catch(error=>
      console.log(error)).finally(()=>setloading(false));
  }else{
    setloading(false);
  }

},[dispatch])

 const [darkMode,setDarkMode]=useState(false);
 const paletteType =darkMode?'dark':'light';
 const handleThemeChange=()=>{
  setDarkMode(!darkMode);
 }
  const theme =createTheme({
    palette:{
      mode:paletteType,
      background:{
        default:paletteType==='light'? '#eaeaea': '#121212'
      }
    }
  })
  if(loading){
    return(
      <Typography>
      Please wait
    </Typography>
    )
  }
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar />
    <CssBaseline>
      <Header handleThemeChange={handleThemeChange} darkMode={darkMode} />
      <Container>
        <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/catalog' element={<Catalog/>}/>
        <Route path='/catalog/:id' element={<ProductDetails/>}/>
       <Route path='/about' element={<About/>}/>
       <Route path='/Contact' element={<Contact/>}/>
       <Route path="/cart" element={<CartPage/>}/>
       <Route path="/checkout" element={<CheckoutPage/>}/>
       </Routes>
      </Container>
    </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
