import { createTheme, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { Container } from "@mui/system";
import "./App.css";
import Catalog from "./components/catalog/Catalog";
import Header from "./components/layouts/Header";
import { useState, useEffect, useCallback } from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import ProductDetails from "./components/product/ProductDetails";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CartPage from './components/cart/CartPage';
import CheckoutPage from './components/checkout/CheckoutPage';
import { useAppDispatch } from "./store/store";
import { fetchCartAsync} from "./components/cart/slice/cartSlice";
import Login from './components/account/Login';
import Register from './components/account/Register';
import { fetchCurrentUser } from "./components/account/slice/accountsSlice";
import PrivateRoute from './components/layouts/PrivateRoute';

function App() {
  const dispatch = useAppDispatch();
  const [loading,setloading]=useState(true);
  
  const initApp= useCallback(async ()=>{
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchCartAsync());
      
    } catch (error) {
      console.log(error);
    }
  },[dispatch]);

useEffect(()=>{
 initApp().then(()=>setloading(false));
},[initApp])

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
       <Route path="/login" element={<Login/>}/>
       <Route path="/register" element={<Register/>}/>
       <Route path='/catalog' element={<Catalog/>}/>
        <Route path='/catalog/:id' element={<ProductDetails/>}/>
       <Route path='/about' element={<About/>}/>
       <Route path='/Contact' element={<Contact/>}/>
       <Route path="/cart" element={<CartPage/>}/>
       <Route path="/checkout" element={
        <PrivateRoute>
       <CheckoutPage/>
       </PrivateRoute>
       }/>
       </Routes>
      </Container>
    </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
