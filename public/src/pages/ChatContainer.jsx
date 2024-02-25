import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ChatInput from './ChatInput'
import axios from 'axios';
import { v4 as uuidv4 } from "uuid"
import { addMessageApi, getMessageApi } from './utils/ApiRoutes';
import Spin from './Spin';
const ChatContainer = ({ currentChat, currentuser, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [loading,setLoading] = useState(false)
  const scrollRef = useRef();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.post(getMessageApi, {
          from: currentuser.user._id,
          to: currentChat._id
        });
        setMessages(response.data)
        setLoading(false)
      } catch (error) {
      }
    };
    if (currentChat) {
      fetchData();
    }
  }, [currentChat])

  const handleSendMsg = async (msg) => {
    await axios.post(addMessageApi, {
      from: currentuser.user._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentuser.user._id,
      message: msg,
    })

    const msgs = [...messages];
    let date = new Date();
    msgs.push({ fromSelf: true, message: msg, time: date.toLocaleTimeString().replace(/:\d+\s/, ' ') });
    setMessages(msgs)
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg })
      })
    }
  }, [])

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth", block: "end", inline: "nearest" });
  }, [messages])
  return (
    <>
      { currentChat && (<Container>
        <div className="chat">
          <div className="chat-messages">
            
              
                {loading && <Spin/> }
                {!loading && messages.map((message) => {
                return (
                  <div ref={scrollRef} key={uuidv4()}>
                    {message.fromSelf ?
                      <div className="send">
                        <div className="message sended">
                          <div className="content">
                            {message.message}

                          </div>
                          <div className="img">

                            <img src={currentuser.user.avatarImage} alt="" />
                          </div>
                        </div>
                        <p>{message.time}</p>
                      </div>
                      :
                      <div className="receive">

                      <div className="message recieved">
                        <div className="img">

                          <img src={currentChat.avatarImage} alt="" />
                        </div>
                        <div className="content">
                          {message.message}

                        </div>
                        
                      </div>
                        <p>{message.time}</p>
                      </div>}

                  </div>
                )
              })}
            
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </div>
        <div className="details">
          <div className="avatar">
            <div className="image">
              <img src={currentChat.avatarImage} alt="" />
            </div>
            <h3>{currentChat.username}</h3>
            <h5><i className='bx bxs-circle'></i> Active Now</h5>
          </div>
          <div className="otherDetails">
            <h6>EMAIL</h6>
            <div>{currentChat.email}</div>
          </div>
        </div>
      </Container>)}
    </>
  )
}
const Container = styled.div`
overflow: hidden;
.chat-messages{
  scroll-snap-type: y mandatory;
  &::-webkit-scrollbar{
      width: 0.12rem;
      &-thumb{
          background-color: #ffd078;
          width: 0.06rem;
          border-radius: 16px;
      }
  }
  height: 80%;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow: auto;
  .message{
    display: flex;
    align-items: center;
    .img{
      display: flex;
      border: 2px solid #e3e3e3;
      align-items: center;
      justify-content: center;
      margin: 0 8px;
      border-radius: 50%;
      overflow: hidden;
      height: 50px;
      width: 50px;
    }
    img{
      width: 50px;
      box-shadow: inset 0 0 10px #d4d4d4;
        box-shadow:  0 0 10px #d4d4d4;
    }
    .content{
      display: flex;
      align-items: center;
      padding: 0.8rem 0.9rem;
      max-width: 40%;
      overflow-wrap: break-word;
      min-height: 40px;
      font-size: 0.9rem;
      font-weight: 500;
      border-radius: 2rem;
    }
  }
  .sended{
    justify-content: flex-end;
    .content{
      background-color: #18d39e;
      color: white;
    }
  }
  .send{
    p{
      float: right;
      font-size: 0.8rem;
      margin: 8px 67px 0 0;
      color: #8f8f8f;
    }
  }
  .recieved{
    justify-content:flex-start;
    .content{
      background-color: #f7f7f7;
      color: #8f8f8f;
    }
  }
  .receive{
    p{
      float: left;
      font-size: 0.8rem;
      margin: 8px 0 0 67px;
      color: #8f8f8f;
    }
  }
}
width: 70%;
  display: flex;
  .chat{
    width: 75%;
    height: 100vh;
  }
  .details{
    border-left: 2px solid #e8e8e8;
    padding: 0 14px;
    width: 25%;
    display: flex;
    flex-direction: column;
    img{
      height: 170px;
    }
    .image{
      box-shadow: inset 0 0 10px #d4d4d4;
        box-shadow:  0 0 10px #d4d4d4;
      margin-top: 50px;
        height: 170px;
        width: 170px;
        border-radius: 50%;
        overflow: hidden;
        img{
          height: 170px;
          z-index: -100;
        }
      }
      .avatar{
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      h3{
        font-size: 1.7rem;
        font-weight: 500;
        margin-top: 30px;
        text-transform: uppercase;
      }
      h5{
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 1rem;
        color: #b2b2b2;
        i{
          color: #00d800;
          font-size: 0.7rem;
          padding: 0 4px 0 0;
        }
        margin-bottom: 30px;
      }
      .otherDetails{
        margin-top: 15px;
        display: flex;
        flex-direction: column;
        line-height: 4px;
        h6{
          color: #b2b2b2;
        }
      } 
  }
  
  @media screen and (max-width:1084px){
    .details {

    .image{
        height: 120px;
        width: 120px;
        img{
          height: 120px;
        }
      }
      .otherDetails{
        h6{
          font-size: 0.8rem;
        }
      } 
      }
  }
`
export default ChatContainer