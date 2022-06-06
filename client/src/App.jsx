import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode'
import './App.css'

import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import ApplyLeave from './pages/ApplyLeave'
import CreateProfile from './pages/CreateProfile'
import PrivateRoute from './components/PrivateRoute'
import Hostel from './pages/Hostel'
import Department from './pages/Department'
import User from './pages/User'
import PendingUserRequest from './pages/PendingUserRequests'
import AllStudents from './pages/AllStudents'
import LeaveRequests from './pages/LeaveRequests'
import { signOutUser } from './redux/authSlice'

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  
  typography: {
    fontFamily: "Quicksand",
    h3: {
      fontFamily: "Syne"
    },
    h6: {
      fontFamily: "Syne"
    }
  },
  palette: {
    danger: createColor('#F40B27'),
    success: createColor('#5DBA40'),
  },
  
  
})

function App() {

  
const dispatch = useDispatch()
  
const {publicKey, jwt_token, isLoggedIn} = useSelector((state) => state.auth)
//check auth token
if(jwt_token){
  
  //decode token and get user info
  const decoded = jwt_decode(jwt_token)
  console.log({decoded})

  const currentTime = Date.now() / 1000
  //check for expiration
  if(decoded.exp < currentTime){
   console.log('expired')
   dispatch(signOutUser())
   if(window.location.pathname != '/'){
     console.log('not eqaul')
     window.location.href= '/'
    } else {
      console.log('equal')
   }
  } else {
    console.log('not expired')
  }

}

  return (
    <ThemeProvider theme={theme}>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route
              exact
              path="/create-profile"
              element={
                <PrivateRoute>
                  <CreateProfile />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/apply"
              element={
                <PrivateRoute>
                  <ApplyLeave />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/pending-profiles"
              element={
                <PrivateRoute>
                  <PendingUserRequest />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/leave-request"
              element={
                <PrivateRoute>
                  <LeaveRequests />
                </PrivateRoute>
              }
              />
            <Route
              exact
              path="/students"
              element={
                <PrivateRoute>
                  <AllStudents />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/hostel/:name/:id"
              element={
                <PrivateRoute>
                  <Hostel />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/department/:name/:id"
              element={
                <PrivateRoute>
                  <Department />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/user/:name/:id"
              element={
                <PrivateRoute>
                  <User />
                </PrivateRoute>
              }
              />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
