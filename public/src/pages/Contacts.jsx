import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { toast } from "react-toastify";
import logo from "../assets/logo.png"
import Spin from './Spin'
import { getUserRoutes } from './utils/ApiRoutes';
import axios from 'axios';
const Contacts = (props) => {
    const ref = useRef(null);
    const { contacts, currentuser, changeChat, loading, setLoading } = props
    const [currentUserName, setCurrentUserName] = useState(undefined)
    const [currentUserImage, setCurrentUserImage] = useState(undefined)
    const [currentSelected, setCurrentSelected] = useState(undefined)
    const [search, setSearch] = useState(undefined);
    const toastContent = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'light'
    }
    useEffect(() => {
        if (currentuser) {
            setCurrentUserImage(currentuser.user.avatarImage);
            setCurrentUserName(currentuser.user.username);
        }
    }, [currentuser])
    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        let data = ref.current.value;
        if (data.trim().length !== 0) {
            if (data.length < 4) {
                toast.error("Username should be atleast 4 characters", toastContent)
                return false;
            }
            else {
                try {
                    const fetchUser = async () => {
                        try {
                            const user = await axios.post(getUserRoutes, {
                                username: data
                            }, {
                                withCredentials: true
                            })
                            if (user.status === 200) {
                                setSearch(user.data)
                            }
                        }
                        catch (err) {
                            if (err.response && err.response.status === 404) {
                                toast.error("Username not found", toastContent);
                            }
                            else {
                                console.log(err);
                            }
                        }
                    }
                    fetchUser();
                }
                catch (err) {
                    console.log(err);
                }

            }
        }
    }
    useEffect(() => {
        if (search && search.user) {
            const element = document.getElementById(`${search.user._id}`);
            if (element) {
                element.click();
                // element.scrollTop = element.scrollHeight;
                var offsetTop = element.getBoundingClientRect().top-700;

                window.scrollTo({
                    top: window.pageYOffset + offsetTop,
                    behavior: 'smooth'
                });
                // element.scrollIntoView({ behaviour: "smooth", block: "end", inline: "nearest" });
            } else {
                console.log(`Element with id ${search.user._id} not found.`);
            }
        }
    }, [search])
    return (
        <>
            {

                currentUserImage && currentUserName && (
                    <Container>
                        <div className="container">

                            <div className="search">
                                <form className="search-bar" onSubmit={submitHandler}>
                                    <button>
                                        <i className='bx bx-search'></i>
                                    </button>
                                    <input ref={ref} type="text" placeholder="Search" />
                                </form>
                                <div className='btns'>
                                    <button className='btn1'>ACC</button>
                                    <button className='btn2'>CHAT</button>
                                </div>
                            </div>
                            {loading && <Spin />}
                            {!loading && <div className="contacts">
                                {

                                    contacts.map((contact, index) => {
                                        return (
                                            <div key={index} id={contact._id} onClick={() => changeCurrentChat(index, contact)} className={`contact ${index === currentSelected ? "selected" : ""
                                                }`}>
                                                <div className="avatar">
                                                    <img src={contact.avatarImage} alt="" />
                                                </div>
                                                <div className="username">
                                                    <h3>{contact.username}</h3>
                                                    <h5>{contact.message}</h5>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>}

                        </div>
                    </Container>

                )
            }
        </>
    )
}
const Container = styled.div`
    
    width: 30%;
    height: 100vh;
    overflow-x: hidden;
    border-right: solid 2px #e8e8e8;
    padding-bottom: 60px;
    scroll-snap-type: y mandatory;
    &::-webkit-scrollbar{
        width: 0.12rem;
        &-thumb{
            background-color: #cccccc;
            width: 0.06rem;
            border-radius: 16px;
        }
    }
    /* background-color: gray; */
    .container{
        height: 100vh;
        width: 90%;
    }
    .search{
        position: relative;
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 70px;
        button{
            outline: none;
            border: none;
            background-color: transparent;
        }
        .btns{
            border-radius: 4px;
            background-color: #f0f0f0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            button{

                padding: 4px 8px;
                font-size: 0.7rem;
                border: none;
                outline: none;
                margin: 4px 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                border-radius: 4px;
            }
            .btn1{
                background-color: transparent;
                color: gray;
            }
            .btn2{
                background-color: #ffa42c;
                color: white;
            }
        }
    }
    .search-bar{
        display: flex;
        align-items: center;
    }
    i{
        font-size: 1.5rem;
        color: #acacac;
    }
    input{
        padding: 3px 10px;
        width: 100%;
        border: none;
        outline: none;
        font-size: 1.2rem;
    }
    input::placeholder{
        color: #acacac;
    }
    .contacts{
        margin-top: 8px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        /* align-items: center; */
        justify-content: center;

    }
    .contact{
        cursor: pointer;
        border-radius: 4px;
        margin: 8px 0;
        display: flex;
        align-items: center;
        padding: 10px 5px;
        height: 75px;
        .username{

            margin: auto 10px;
        }
        h3{
            margin-top: 7px;
            font-size: 1rem;
            font-weight: 400;
            text-transform: uppercase;
        }
        h5{
            font-size: 0.7rem;
            color: #b2b2b2;
        }
    }
    .avatar{
        display: flex;
    align-items: center;
    justify-content: center;
        margin: auto 10px;
        border-radius: 50%;
        background-color: white;
        height: 50px;
        width: 50px;
        overflow: hidden;
        img{
            height: 50px;
        }
        box-shadow: inset 0 0 10px #d4d4d4;
        box-shadow:  0 0 10px #d4d4d4;
    }
    .selected{
        background-color: #ffa42c;
        box-shadow:  0 0 10px #d4d4d4;
        /* WebKit */
        -webkit-transition: all 0.4s ease-in-out;
        
            .username{
                h3{
            color: white;
        
        }
        h5{
            color:white;
        }
        }
        .avatar{
        box-shadow: inset 0 0 10px #d4d4d4;
    }
    }
    img{
    }
`;
export default Contacts