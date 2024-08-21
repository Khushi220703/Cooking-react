import React from 'react'

import '../App.css';
import { Link } from 'react-router-dom';
const LandingPage = () => {

    const navStyle = {
        backgroundColor:"black",
        opacity:"0.8",
        display: "flex",
        justifyContent:"space-between",


    }

    const logo = {
        color:"white",
        margin:"20px",
        fontFamily: " Cursive, System",
    }

    const buttonStyle = {
        margin: "20px",

    }

    const buttonStyle1 = {
            width: "100px",
            height: "30px",
            backgroundColor:"green",
            border:"none",
            fontSize: "large",
            color: "#FFFFFF",
            fontWeight:"600",
            borderRadius:"2px"
    }

    const buttonStyle2 = {
            width: "100px",
            height: "30px",
            backgroundColor:"blue",
            border:"none",
            fontSize: "large",
            color: "#FFFFFF",
            fontWeight:"600",
              borderRadius:"2px"
    }

    

    const buttonStyle3 = {
        marginTop:"10px",
        width:"100px",
        height: "40px",
        border:"none",
        fontSize: "large",
        color: "#FFFFFF",
        fontWeight:"600",
        borderRadius:"2px",
        backgroundColor:"blue"
    }
   
  return (
    /*This is a landing page have two parts a header and a body*/
    // header have a logo and tow buttons for signup and login (header tag)*/
    //body have backgrond image and text about the site(section tag)



    <div className='landingPage'>
   
        <header className="navStyle" style={navStyle} >
            <h3 style={logo} className='logo'>Cooking</h3>

            <div className='buttonStyle' style={buttonStyle}>
              <Link to="/login"><button style={buttonStyle1} className='buttonStyle1'>logIn</button></Link>
              <Link to="/signup"><button style={buttonStyle2} className='buttonStyle2'>SignUp</button></Link>
            </div>
        </header>


        <section className="contentStyle" >
            <h1 style={logo} className='logo'>Cooking</h1>
            <h1>The Easiest Way To Make Your Favorite Meal.</h1>
            <p>Discover 1000+ receipes in your hand with the best recipe. Help you to find the easiest way to cook.
             You can cook tasty and healthy food on your own. You can buy ingredients of receipe, get idea of what to cook today and many more.... </p>
             <Link to="/signup"><button style={buttonStyle3} className='buttonStyle3'>Signup</button></Link>
        </section>
   
    </div>
  )
}

export default LandingPage;
