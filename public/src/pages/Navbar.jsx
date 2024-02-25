import React, { useEffect, useState } from 'react'
import logo from "../assets/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Logout from './Logout'
import axios from 'axios'
import { loginRoutes } from './utils/ApiRoutes'
const Navbar = ({ isLoggedIn, setIsloggedIn }) => {
    const [currentuser, setCurrentUser] = useState(undefined);
    const navigate = useNavigate(null);
    useEffect(() => {
        let user;
        const fetchUser = async () => {
            user = await axios.get(loginRoutes, {
                withCredentials: true
            })
            if (user.data) {
                setCurrentUser(user.data.user);
            }
        }
        fetchUser();
    }, [])
    return (
        <>
            <Container>
                <nav >
                    <div className="logo">
                        <img src={logo} alt="" />
                        <p>ChatVista</p>
                    </div>
                    <div className='class'>
                        <Link className="help">
                            PROFILE
                        </Link>
                        <form>
                            <div className='profileSectio'>

                                <div className="profile" >
                                    <img src={currentuser && currentuser.avatarImage} alt="" />
                                </div>
                            </div>
                            <div className="name">
                                <p><i class='bx bx-user'></i></p>
                                <input type="text" value={currentuser && currentuser.username} onChange={() => { }} />
                            </div>
                            <div className="email">
                                <p><i class='bx bx-envelope' ></i></p>
                                <input type="Email" value={currentuser && currentuser.email} onChange={() => { }} />
                            </div>
                        </form>
                        <Logout isLoggedIn={isLoggedIn} setIsloggedIn={setIsloggedIn} />
                    </div>

                </nav>
            </Container>
        </>
    )
}
const Container = styled.div`
position: sticky;
    img{
        height: 60px;
    }
    .class{
        display: flex;
        align-items: center;
        justify-content: space-around;
        form{
            border: 4px solid white;
            display: none;
            .profileSectio{
                border-bottom: 4px solid white;
            }
            .profile{
                height: 100px;
                width: 100px;
                background-color: white;
                border-radius: 50%;
                box-shadow: inset 0 0 10px #d4d4d4;
                cursor: pointer;
                display: block;
                margin: auto;
                margin-top: 10px;
                margin-bottom: 10px;
                z-index: 100;
                overflow: hidden;
                img{
                    height: 100px;
                    display: block;
                    margin: auto;
                    z-index: -1;
                }
            }
            margin-top: 350px;
            margin-right: 270px;
            position: absolute;
            border-radius: 8px;
            box-shadow:  0 0 15px #d4d4d4;
            background-color: #ffc04a;
            height: 300px;
            /* width: 350px; */
            .name{
                width: 100%;
                display: flex;
                padding: 0 0 0 10px;
                p{
                    margin: 0 15px 0 8px;
                    font-size: 1.6rem;
                    padding: 0 15px;
                    height: 50px;
                    width: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    background-color: white;
                    color: orange;
                }
                input{
                    outline: none;
                    border: none;
                    text-transform: uppercase;
                    background-color: transparent;
                    color: white;
                    font-size: 1.4rem;
                    font-weight: 500;
                }
                margin: 15px 0 15px 0;
                padding-bottom: 15px;
                border-bottom: 4px solid white;
            }
            .email{
                width: 100%;
                display: flex;
                padding: 0 0 0 10px;
                p{
                    margin: 0 15px 0 8px;
                    font-size: 1.6rem;
                    padding: 0 15px;
                    height: 50px;
                    width: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    background-color: white;
                    color: orange;
                }
                input{
                    width: 100%;
                    outline: none;
                    border: none;
                    background-color: transparent;
                    color: white;
                    font-size: 1.4rem;
                    font-weight: 500;
                }
                margin-bottom: 20px;
                
            }
            .mode{
                width: 90%;
                /* background-color: #ffd27e; */
                height: 40px;
                margin: 15px auto;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                color: white;
                font-weight: 800;
            }
        }
    }
    .class:hover{
        form{
            display: block;

        }
    }
    .logo{
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        color: orange;
        vertical-align: middle;
        img{
            height: 35px;
        }
    }
    p{
        margin: auto 5px;
    }
    nav{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 40px;
        border-bottom: solid 2px #e3e3e3;
    }
    .help{
        border: dotted 2px #adadad;
        padding: 5px 8px;
        text-decoration: none;
        font-weight: 800;
        color: #adadad;
        
    }
`
export default Navbar