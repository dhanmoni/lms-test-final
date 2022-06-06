import React, {useEffect} from 'react';
import {ethers} from 'ethers'
import {AppBar, Box, Toolbar, Typography, Container, MenuItem, Grid, Button} from '@mui/material/';
import {AddOutlined} from '@mui/icons-material'
import blockchain from '../assets/blockchain.png'
import '../App.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import  {setJwtToken, setUserProfile, setUserPublicKey} from '../redux/authSlice';
import {getDepartment, getHostel} from '../redux/dataSlice'
const {ethereum} = window
import {provider, signer} from '../utils/blockchain'

export default function Landing() {

  const {isLoading, isError, user, isLoggedIn, publicKey} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let userProfile;
  let userPublicKey;

  useEffect(() => {
    dispatch(getHostel())
    dispatch(getDepartment())
  }, []);

  const handleAuthenticate = async ({publicKey,signature}) =>{
		const res = await fetch(`http://localhost:5000/api/auth/`, {
			body: JSON.stringify({ publicKey, signature }),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		})

    return res.json()
  }

  const handleSignup = async (publicKey) =>{
		const res = await fetch(`http://localhost:5000/api/auth/register`, {
			body: JSON.stringify({ publicKey }),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		})
    return res.json();
}
  
  const handleSignMessage = async ({publicKey,nonce}) => {
		try {
			const signature = await signer.signMessage(`I am signing my one-time nonce: ${nonce}`);
      console.log({publicKey, nonce, signature})
			return { publicKey, signature };
		} catch (err) {
			throw new Error(
				'You need to sign the message to be able to log in.'
			);
		}
	};

  const redirectUser = ()=> {
    if(isLoggedIn) {
      navigate('/dashboard')
    } else {
      navigate('/create-profile')
    }
  }

  const saveAndRedirect = (data)=> {
   
    dispatch(setUserPublicKey(userPublicKey))
    dispatch(setJwtToken(data.token))
    if(userProfile && userProfile.email){
      dispatch(setUserProfile(userProfile))
      console.log('profile exists', userProfile)
      userProfile = null;
      navigate('/dashboard')
    } else {
      console.log('user profile doesnot exists')
      navigate('/create-profile')
    }
  }


  const connectWallet = async ()=> {
      if(!ethereum) return alert('Please install metamask!');
      
      // MetaMask requires requesting permission to connect users accounts
      const accounts = await provider.send("eth_requestAccounts", []);

      console.log({accounts})
      if(!accounts.length){
        return alert('No account found!')
      } 
      
      userPublicKey = accounts[0]

      fetch(`http://localhost:5000/api/auth/get-user/${accounts[0]}`)
        .then((response) => response.json())
        // If yes, retrieve it. If no, create it.
        .then((user) => {
          if(user){
            userProfile = user;
          }
          return (user ? user : handleSignup(accounts[0]))
        }
        )
        // Popup MetaMask confirmation modal to sign message
        .then(handleSignMessage)
        // // Send signature to backend on the /auth route
        .then(handleAuthenticate)
        // // Pass accessToken back to parent component (to save it in localStorage)
        .then(saveAndRedirect)
        .catch((err) => {
          console.log({err})
        });

     
   
  }


  

  return (
    <Box className='landing' sx={{ flexGrow: 1, height: '100vh', width: '100vw' }}>
      <AppBar position="static" color="transparent" elevation={0} >
        <Toolbar sx={{width: '80%', margin: '0 auto'}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1,fontWeight: 600 }}>
            Leave Management System
          </Typography>
          
          <MenuItem>
            <Typography variant="h6" textAlign="center" sx={{ fontWeight: 600 }}>Help</Typography>
          </MenuItem>
          <MenuItem>
            <Typography variant="h6" textAlign="center" sx={{ fontWeight: 600 }}>About Us</Typography>
          </MenuItem>
            
        </Toolbar>
      </AppBar>
      
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5%',
      }}>
      <Grid container sx={{
         display: 'flex',
         alignItems: 'center',
         justifyContent:'center'
      }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" sx={{fontWeight: 800}}>
            Unleash the power of <br/> Blockchain
          </Typography>
          <Typography variant="subtitle1">
            Connect Metamask wallet to continue...
          </Typography>
          {publicKey ? (
            <Button
            variant="outlined"
            color="primary"
            sx={{mt:2, fontWeight: 'bold'}}
            onClick={redirectUser}
          >
            Go to Dashboard
          </Button>
          ) : (
            <Button
            variant="contained"
            color="primary"
            sx={{mt:2, fontWeight: 'bold'}}
            endIcon={<AddOutlined />}
            onClick={connectWallet}
          >
            Connect Wallet
          </Button>
          )} 
        </Grid>
        <img item src={blockchain} alt="Blockchain" style={{
            width: '100%',
            maxWidth: '500px',
            height: 'auto'
          }} />
      </Grid>
    </Box>
      
    </Box>
  );
}