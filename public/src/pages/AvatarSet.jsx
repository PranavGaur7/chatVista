import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom"
import styled from "styled-components";
import loader from "../assets/loader.gif"
import axios from "axios"
import { Buffer } from 'buffer';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { setAvatarRoute } from './utils/ApiRoutes';
const AvatarSet = () => {
  const inputref = useRef(null);
  const [isAvatarImageSet, setIsAvatarImageSet] = useState(true);
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState("")
  const toastContent = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light'
  }

  const onProfile = (e) => {
    const file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
      console.log(reader.result);
      setAvatars(reader.result);
    }
    reader.onerror = (err) => {
      console.log("error: " + err);
    }
  }
  const setProfilePic = async () => {
    const binaryDataSize = Buffer.from(avatars, 'base64').length / 1024;
    if (binaryDataSize > 100) {
      toast.error("Image Size should be less than 100Kb", toastContent)
    }
    else {
      const res = await axios.post(setAvatarRoute, { base64: avatars }, {
        withCredentials: true
      })
      if (res.status === 200) {
        console.log(res);
        toast.success("profile uploaded", toastContent)
        navigate("/")
      }
    }
  }
  const handleCilck = () => {
    inputref.current.click();
  }

  return (
    <>
      <Container>
        <div className="container">
          <div className="head">

            <p className='h1'>To Upload Image</p>
            <p className='h2'>Click Profile</p>
          </div>
          <div className="img" onClick={handleCilck}>
            {avatars ?
              <img src={avatars} alt="" /> : <img src={loader} alt="" />

            }
          </div>
          <label className='label1'>
            <input type="file" id="img" name="img" accept="image/*" ref={inputref} onChange={onProfile} />
          </label>
          <button className='bttn' onClick={setProfilePic}>Upload</button>
        </div>

      </Container>
    </>
  )
}

const Container = styled.div`
  
    width: 100%;
    height: 100vh;
    position: absolute;
    background: linear-gradient(45deg, #ffd07a, #fbfb91);  
    .head{
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .h1{
      margin: 60px 0 20px;
      font-size: 2.5rem;
      margin-bottom: 20px;
      color: orange;
    }
    .h2{
      margin: 30px 0 50px;
      color: #ffbd44;
      font-size: 1.5rem;
    }
  .container{
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: space-evenly; */
    background-color: white;
    width: 30%;
    height: 600px;
    border-radius: 16px;
    margin-top: 60px;
  }
  .img img{
    height: 200px;
    z-index: -1;
  }
  .img{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    width: 200px;
    padding: 30px;
    overflow: hidden;
    z-index: 1000;
    border: 4px solid #ffd07a;
    border-radius:50%;
  }
  .label1{
    display: none;
  }
  .bttn{
    margin-top: 50px;
    font-size: 1.3rem;
    padding: 10px 40px;
    border-radius: 16px;
    border: none;
    outline: none;
    vertical-align: middle;
    color: white;
    background-color: orange;
  }
`;

export default AvatarSet