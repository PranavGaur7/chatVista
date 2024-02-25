import React from 'react'
import styled from 'styled-components'
import orange from '../assets/orange.gif'
const Welcome = ({currentuser}) => {
  return (
    currentuser && <Container>
        <div className="loader">
          <img src={orange} alt="" />
        </div>
        <h1>hello! <span>{currentuser.user.username}</span></h1>
        <h4>
          Start Messaging just by clicking any Chat
        </h4>
    </Container>
  )
}

const Container = styled.div`
width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .loader{
      margin-top: 30px;
      img{
        height: 350px;
      }
    }
    h1{
      margin:20px 0;
      font-weight: 700;
      text-transform: capitalize;
      span{
        color: orange;
      }
    h4{
      font-weight: 900;
    }
    }
`

export default Welcome