import React from 'react'
import axios from 'axios'
import { logoutRoutes } from './utils/ApiRoutes'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import styled from 'styled-components'
const Logout = ({isLoggedIn,setIsloggedIn}) => {
    const navigate = useNavigate();
    const toastContent = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'light'
      }
    const handleLogout = async () => {
        const log = await axios.get(logoutRoutes, {
            withCredentials: true
        })
        toast.success("Logged out",toastContent)
        navigate('/login')
        setIsloggedIn(false)
    }
    return (
        <>
        <Container>
            <button onClick={handleLogout}><i className='bx bx-power-off'></i></button>
        </Container>
        </>
    )
}
const Container = styled.div`
margin-left: 20px;
    button{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px 8px;
        border-radius: 50%;
        outline: none;
        background-color: orange;
        color: white;
        border: 2px solid white;
        font-size: 1.6rem;
    }
    button:hover{
        color: orange;
        background: white;
        border: 2px solid orange;
    }
`
export default Logout