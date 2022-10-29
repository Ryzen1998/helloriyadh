import { createTheme, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { Container } from "@mui/system";
import "./App.css";
import Catalog from "./components/catalog/Catalog";
import Header from "./components/layouts/Header";
import { useState } from 'react';

function App() {
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
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline>
      <Header handleThemeChange={handleThemeChange} darkMode={darkMode} />
      <Container>
      <Catalog />
      </Container>
    </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
