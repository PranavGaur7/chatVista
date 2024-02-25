import React, { useEffect, useState } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import SignUp from './pages/SignUp'
import Chat from './pages/Chat'
import Login from './pages/Login'
import AvatarSet from './pages/AvatarSet'
import { ToastContainer } from 'react-toastify'
import { loginRoutes } from './pages/utils/ApiRoutes'
import axios from 'axios'
const App = () => {
  const [isLoggedIn,setIsloggedIn] = useState(undefined)
  const [user,setUser] = useState(undefined)
  useEffect(() => {
    let user;
    const fetchUser = async () => {
      user = await axios.get(loginRoutes, {
        withCredentials: true
      })
      if (user.data.logged) {
        setIsloggedIn(true);
        setUser(user.data)
      }
      else{
        setIsloggedIn(false)
      }
    }
    fetchUser();
  }, [])
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignUp isLoggedIn={isLoggedIn}  setIsloggedIn={setIsloggedIn}/>}/>
      <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsloggedIn={setIsloggedIn}/>}/>
      <Route path="/avatar" element={<AvatarSet user={user}/>}/>
      <Route path="/" element={<Chat isLoggedIn={isLoggedIn} setIsloggedIn={setIsloggedIn}/>}/>
      
    </Routes>
    </BrowserRouter>
    <ToastContainer />
    </>
  )
}

export default App