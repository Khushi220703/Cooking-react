import React from 'react'
import loaderImage from "../images/rabbit.gif"
const loader = () => {
    const loaderStyle = {
       margin: "auto",
       width: "40%",
       display: "flex",
       flexDirection: "column",
       alignItems: "center",
       marginTop: "100px"

    }
  return (
    <div style={loaderStyle}>
      <img src={loaderImage} alt='loading' style={loaderStyle}/>
      <p>Loading......</p>
    </div>
  )
}

export default loader

