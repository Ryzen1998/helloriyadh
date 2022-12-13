import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, IconButton, List, ListItem, Switch, Toolbar,Typography,Box} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from '../../store/store';
import SignedInMenu from "./SignedInMenu";

interface Props{
  darkMode:boolean,
  handleThemeChange:()=>void;
}

const navLinksL=[
  {title:'catalog',path:'/catalog'},
  {title:'contact',path:'/contact'},
  {title:'about',path:'/about'},
 
  
]

const navLinksR=[
  {title:'login',path:'/login'},
  {title:'register',path:'/register'},
  
]

const navStyles = {color:'inherit',
typography:'h6',
":hover":{
  color:'grey.500'
},
"&.active":{
  color:'text.secondary'
}
}

const Header = ({darkMode,handleThemeChange}:Props) => {

const {cart}=useAppSelector(state=>state.cart);
const {user}=useAppSelector(state=>state.account)
const itemscount=cart?.cartItems.reduce((sum,item)=>sum+item.quantity,0)

  return <AppBar position="static" sx={{mb:4}}>
    <Toolbar sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <Box display='flex' alignItems='center'>
        <Typography variant="h6">
            Hello-Riyadh
        </Typography>
        <Switch checked={darkMode} onChange={handleThemeChange}/>
        </Box>

         <Box>
        <List sx={{display:'flex'}}>
          {navLinksL.map((link,index)=>(
            <ListItem component={NavLink} 
            to={link.path}  key={link.path}
            sx={navStyles}>
             {link.title}
            </ListItem>
          ))}
        </List>
        </Box>

        <Box display='flex' alignItems='center'>
        <IconButton component={Link} to='/cart' size="large" sx={{color:'inherit'}}>
          <Badge badgeContent={itemscount} color='secondary'>
          <ShoppingCart/>
          </Badge>
        </IconButton>
        {user?(
          <SignedInMenu/>
        ):(
          <List sx={{display:'flex'}}>
          {navLinksR.map((link,index)=>(
            <ListItem component={NavLink} 
            to={link.path}  key={link.path}
            sx={navStyles}
            >
             {link.title}
            </ListItem>
          ))}
        </List>
        )}
    
        </Box>
        </Toolbar>
  </AppBar>;
};

export default Header;
