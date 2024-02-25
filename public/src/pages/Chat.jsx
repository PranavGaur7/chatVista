import React, { useEffect, useRef, useState } from 'react'
import styled from "styled-components";
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { io } from "socket.io-client"
import { allUsersRoute, host, loginRoutes } from './utils/ApiRoutes';
import Contacts from './Contacts';
import Navbar from './Navbar';
import Welcome from './Welcome';
import ChatContainer from './ChatContainer';
const Chat = ({isLoggedIn,setIsloggedIn}) => {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([])
  const [currentuser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined)
  const [isLoaded, setIsLoaded] = useState(false)
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    // if(!isLoggedIn){
    //   navigate('/login')
    // }
    let user;
    const fetchUser = async () => {
      user = await axios.get(loginRoutes, {
        withCredentials: true
      })
      if (!user.data.logged) {
        navigate("/login")
      }
      else {
        setCurrentUser(user.data);
      }
      setIsLoaded(true)
    }
    fetchUser();

  }, [])
  useEffect(()=>{
    if(currentuser){
      socket.current = io(host)
      socket.current.emit("add-user",currentuser.user._id)
    }
  },[currentuser])
  useEffect(() => {
    let allUser;
    const fetchdata = async () => {
      setLoading(true)
      allUser = await axios.get(allUsersRoute, {
        withCredentials: true
      })
      setContacts(allUser.data);
      setLoading(false);
    }
    fetchdata();
  }, [currentuser])
  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsloggedIn={setIsloggedIn}/>
      <Container>

        {contacts && <Contacts contacts={contacts} loading={loading} setLoading={setLoading} currentuser={currentuser} changeChat={handleChatChange} />}
        {
          isLoaded && currentChat === undefined ? (<Welcome currentuser={currentuser} />) : (<ChatContainer currentChat={currentChat} currentuser={currentuser} socket={socket}/>)
        }
      </Container>
    </>
  )
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  /* flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem */
`
export default Chat