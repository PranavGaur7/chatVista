import React, { useState } from 'react'
import styled from 'styled-components'
import EmojiPicker from "emoji-picker-react"
const ChatInput = ({handleSendMsg}) => {
    const [showEmojiPicker,setShowEmojiPicker]=useState(false)
    const [msg,setMsg] = useState("")

    const handleEmojiPicker =()=>{
        setShowEmojiPicker(!showEmojiPicker)
    }

    const sendChat =(e)=>{
        e.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg('');
        }
    }
    return (
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <i className='bx bx-smile' onClick={handleEmojiPicker}></i>
                    {
                        showEmojiPicker && <EmojiPicker  className="position-absolute"  style={{top:"-470px"}} onEmojiClick={(emojiObject)=> setMsg((msg)=> msg + emojiObject.emoji)}/>
                    }
                </div>
            </div>
            <form className='input-container' onSubmit={(e)=> sendChat(e)}>
                <input type='text' placeholder='Type here...' value={msg} onChange={(e)=> setMsg(e.target.value)}/>
                <button><i className='bx bxs-send' ></i></button>
            </form>
        </Container>
    )
}
const Container = styled.div`
height: 80px;

    border-top: 2px solid #e3e3e3;
    display: flex;
    align-items: center;
    .emoji{
        position: relative ;
        i{
        font-size: 1.7rem;
        margin-left: 20px;
        color: #b2b2b2;
        cursor: pointer;
        }
        svg{
            font-size: 1.5rem;
            color: #ffff00c8;
            cursor: pointer;
        }
        /* .emoji-picker-react{
            position: absolute;
            top: -350px;
        } */
    }
    form{
        padding: 0 0 0 20px;
        width: 90%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        input{
            outline: none;
            border: none;
            border-bottom: 2px solid white;
            width: 95%;
            font-size: 1.1rem;
            transition: all 0.3s ease-in-out;
        }
        input:focus{
            border-bottom: 2px solid #b2b2b2;
        }
        button{
            background-color: transparent;
            border: none;
            outline: none;
            padding: 8px 8px;
            i{
                font-size: 1.6rem;
                color: orange;
                transform: rotate(315deg);
            }
        }
    }
`
export default ChatInput