import React from 'react'
import load from '../assets/load.gif'
import styled from "styled-components"
const Spin = () => {
  return (
    <Container>
      <img src={load} alt="" />
    </Container>
  )
}


const Container = styled.div`
  width: 100%;
  height: 80%;
  margin: auto 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

export default Spin