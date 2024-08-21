import React, { useEffect, useState } from 'react'
import insta from "../images/insta.jpg"
import paneer from "../images/food1.gif"
import "../style/login.css"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import Loader from "./loader"

const Login = () => {
   // const [authToken, setAuthToken] = useState(localStorage.getItem('tokenCooking'));
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] =useState("");
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    

    useEffect(()=>{
        if(sessionStorage.getItem("error") !== null){
            setError(sessionStorage.getItem("error"));
        }
    },[])

    useEffect(()=>{
        sessionStorage.setItem("error", error);
    },[]);
    /*Function handling login data */
    const HandleLogin = async(e) =>{
        e.preventDefault();
        console.log(email,password);

        if(email !== "" && password !== ""){
            const formData = {email, password};
            console.log(formData);
            setLoader(true);
            
                try {
                    const response = await axios.post(`https://cooking-api-0h0k.onrender.com/api/user/login`, formData);
                    
                    
                    if(response.status === 200){
                        sessionStorage.setItem("userName",response.data.user.name);
                        sessionStorage.setItem("userId", response.data.user._id);
                        localStorage.setItem('tokenCooking', response.data.token);
                        navigate("/homePage");
                    }
                    
                } catch (error) {
                    setError("Please check your email or password!");
                }  
                finally{
                    setLoader(false);
                }

        }
        else{
            setError("Please enter credentials carefully!");
        }
        
    }

    /*const handleGoogleSuccess = (credentialResponse) => {
        console.log('Login Success:', credentialResponse);
        
        navigate("/homePage");
    };

    const handleGoogleFailure = (error) => {
        setError("An error has occurred please try again!");
    };*/

    /*Css for the project*/
    const topImage = {
        width:"200px",
        position:"absolute",
        left:"25%",
        top:"-70px",
        display: 'flex',
       alignItems: "center"

    }

    const errorStyle = {
        color:"red",
    }
    const headStyle = {
        textAlign: "center",
        marginLeft:"0px",
        marginBottom:"10px",
        color:"#42302e"
        
    }

    const labelStyle = {
        color: "#302321",
        fontWeight:"600",
        
    }

    const inputStyle = {
        width:"90%",
        marginBottom:"30px",
        border:"none",
        borderBottom:"4px solid #e09616",
        outline:"none"
    }

  const buttonStyle = {
        width:"90%",
        margin:"auto",
        marginBottom:"20px",
        height:"30px",
        border:"2px solid brown",
        backgroundColor:"#e09616",
        fontSize:"large",
        fontWeight:"600",
        color:"brown",
        borderRadius:"3px"
  }

  const googlebuttonStyle = {
       width:"90%",
        margin:"auto",
        marginBottom:"20px",
        height:"30px",
        border:"2px solid #e09616",
        backgroundColor:"white",
        fontSize:"large",
        fontWeight:"600",
        color:"#9dd3fa",
        marginTop:"10px",
        borderRadius:"3px"
  }

  const forgotStyle = {
     textDecoration:"none",
     margin:"20px",
     padding: "10px",
     color:"brown",
     paddingBottom: "10px",
  }

  if(loader){
   return <Loader/>;
  }
  return (
    /*this is login page having css in this page only.*/
   
    <div className='loginPage'>
       
        <form className='formstyle' onSubmit={HandleLogin}>
        <img src={paneer} alt="paneer" className='topImage' style={topImage}/>
            <h2 style={headStyle}>Login</h2>
            <div style={errorStyle}>{error}</div>
            <label htmlFor='name' style={labelStyle}>Email</label><br/>
            <input type="email" name="name" id="name" value={email} placeholder='Enter your username' style={inputStyle} onChange={(e)=>setEmail(e.target.value)}/><br/>

            <label htmlFor="passowrd" style={labelStyle}>Password</label><br/>
            <input type="password" name="passowrd" id="password" value={password} placeholder='Enter your password' style={inputStyle} onChange={(e)=>setPassword(e.target.value)}/><br/>

            <button style={buttonStyle} className='login-button'>Login</button>
            <hr  style={{marginRight:"25px"}}/>

            
           { /*<GoogleLogin  onSuccess={handleGoogleSuccess} onError={handleGoogleFailure}/>*/}
           
           
            <p>Don't have account?<span><Link to="/signup" style={forgotStyle}>Signup</Link></span></p>
        </form>
    </div>
   
  )
}

export default Login
