import * as React from 'react';
import { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import LogoutIcon from '@mui/icons-material/Logout';
import CoffeeIcon from '@mui/icons-material/Coffee';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from "../context/authContext.js";
import blackCoffee from '../assets/blackCoffee.png';
import coffeeMilk from '../assets/coffeeMilk.png';
import fruitJuice from '../assets/fruitJuice.png';
import sandwich from '../assets/sandwich.png';
import Image3 from '../assets/oliveBranch.png';
import SummaryCheckoutPage from './SummaryCheckoutPage.js';
import {getFoodProductsTransform} from './EndpointsAPI.js'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/saraigyg">
      Laboratoria - Burger Queen API
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [
  {
  id: "1",
  img: blackCoffee,
  descr:'Black Coffee', 
  price: '$5.00'
  }, 
  {
  id: "2",
  img: coffeeMilk, 
  descr:'Coffee with Milk',
  price: '$7.00'
  }, 
  {
  id: "3",
  img: fruitJuice, 
  descr:'Fruit Juice',
  price: '$7.00'
  }, 
  {
  id: "4", 
  img: sandwich, 
  descr:'Jam and cheese sandwich',
  price: '$10.00'
  }
];


const theme = createTheme();
const ariaLabel = { 'aria-label': 'description' };

export default function BreakfastPage() {

  const navigate = useNavigate();

    const handleLogOut = async () => {
       await logOut()
       navigate('/');
    }

    const {user, logOut} = useAuth();
    console.log(user);

   const [countArray, setCountArray] = useState({}); //empty object

    //usestate for cards
    //const [cards, setCards] = useState([]); //empty array

    /*getFoodProductsTransform().then((value2) => {
      console.log(value2, 'hola')});*/

     const setSumCards = (ind, num) => {
     
      let obj = countArray;
      console.log(Object.keys(obj), 'keys');

      // si las llaves de obj contienen el id, entonces, 
      //obj[ind] vale obj[ind] + num
      //si no, el obj[ind] vale 0+num  
      if (Object.keys(obj).includes(ind)) {
        obj[ind] = obj[ind] + num;
      }
      else {
        obj[ind] = 0+num;
      }
      //si el obj[ind] está debajo de 0, entonces, el obj[ind] vale cero. 
      if (obj[ind] < 0) {
        obj[ind] = 0;
      }
      return {...obj};
    };


    const [customer, setCustomer] = useState({
      customerName:'',
  })

  const handleChange = ({target: {name, value}}) => 
    setCustomer({...customer, [name]: value})

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative" sx={{ bgcolor: "#342D29"}} >
        <Toolbar sx={{display:'flex', justifyContent:'space-around'}}>
          <img src={Image3} sx={{ mr: 2 }} alt='oliveBranch' />
          <Typography variant="h3" color="inherit" sx={{ pr:20 }}>
            Burger Queen
          </Typography>
          <Typography variant="h5" mr={20} >
            Welcome {/* user.email */}
          </Typography>
          <Button variant="text" startIcon={<LogoutIcon/>} size="large"
          sx={{ ml:60, fontWeight:'bold', '&:hover': { color: "#EAFCFA" }}} 
          onClick={handleLogOut}>Log Out</Button>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
          <TextField
                margin="normal"
                required
                fullWidth
                id="customerName"
                label="Customer's name"
                name="customerName"
                autoComplete="customerName"
                autoFocus
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
              />
            <Stack
              sx={{ mt: 5, pt: 4 }}
              direction="row"
              spacing={4}
              justifyContent="center"
            >
            <Button variant="outlined" startIcon={<CoffeeIcon/>} size="large"
              sx={{  fontWeight:'bold', color:'black', '&:hover': { bgcolor: "#1976d2", color:"whitesmoke" },
              '&:active':{bgcolor: "#1976d2", color:"whitesmoke"}}}>
                Breakfast</Button>
            <Button component={Link} href="/lunchPage" variant="outlined" startIcon={<FastfoodIcon/>} size="large"
              sx={{  fontWeight:'bold', color:'black', '&:hover': { bgcolor: "#1976d2", color:"whitesmoke" },
              '&:active':{bgcolor: "#1976d2", color:"whitesmoke"}}}>
                Lunch & Dinner</Button>
            </Stack>
            <Typography variant="h5" align="left" color="text.secondary" paragraph  sx={{ pt: 4 }}>
              Choose the food choices to place the order and send it to the kitchen:
            </Typography>
          </Container>
        </Box>
        <Container  maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      bgcolor: "#342D29",
                      p: "2%",
                      height: 235,
                      width: '100%'
                    }}
                    image={card.img}
                    title="Image title"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" >
                      {card.descr}
                    </Typography>
                    <Typography >
                      {card.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                  <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="left">
                    <Button size="small" sx={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', 
                    bgcolor: 'primary.main', color: 'whitesmoke', '&:hover': {bgcolor: 'primary.main', 
                    color: 'whitesmoke' }}} onClick={() => setCountArray(setSumCards(card.id, -1))}>-</Button>
                    <Input inputProps={{ ariaLabel, style: { textAlign: 'center', fontWeight: 'bold', width: '30px' 
                    }}} placeholder="0" value={countArray[card.id]} />
                    <Button size="small" sx={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', 
                    bgcolor: 'primary.main', color: 'whitesmoke', '&:hover': {bgcolor: 'primary.main', 
                    color: 'whitesmoke' }}} onClick={() => setCountArray(setSumCards(card.id, 1))} >+</Button>
                  </Stack>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" size='large' sx={{ bgcolor:"#342D29"}}>Place Order</Button>
              <SummaryCheckoutPage />
            </Stack>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Let's eat this burger together!
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          For any questions or suggestions, please write to admin@test.com
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}