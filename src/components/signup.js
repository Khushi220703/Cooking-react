import React, { useEffect, useState } from 'react'
import thali from "../images/cooking.gif"
import "../style/signup.css"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import Loader from './loader'
import Otp from './otp'




const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [ gender, setGender] = useState("");
    const [city, setCity] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate =useNavigate();

   useEffect(()=>{
      if(sessionStorage.getItem("error") !== null){
        setError(sessionStorage.getItem("error"));
      }
   },[])

   useEffect(() => {
    sessionStorage.setItem("error", error);
    }, [error]);
    const handleSignup =async (event) =>{
       
        event.preventDefault();

        if(name !== "" && email !== "" && password !== "" && age !== "" && gender !== "" && city !== ""){
            setLoading(true);

                try {
                    
                    
                    const response = await axios.post("https://cooking-api-0h0k.onrender.com/api/user/sendotp", {email});
                        console.log(response);

                       
                    if(response.status === 200){
                        
                        sessionStorage.setItem("formData", JSON.stringify({name, email, password, age, gender, city}))
                        navigate("/otp");
                        
                    }else if (response.status === 400) {
                        // Handle the case where the email already exists
                        setError(response.data.message || "The email id already exists!");
                    }
                   
                } catch (error) {
                    setError('There is an error.Please try again later or please try with other email may be email id already exits!')
                    console.log(error);
                    
                }
                finally{
                    setLoading(false);
                }
        }
        else{
            setError("Please fill the details carefully");
        }
     }
     

   /* const handleGoogleSuccess =  (response) => {
        console.log(response);
        navigate("/homePage");
        
    };
    

    const handleGoogleFailure = (error) => {
        setError("An error occured try again!");
        console.error('Google Login Failed:', error);
    };*/

   
    const headStyle = {
       
        marginLeft:"0px",
        marginBottom:"10px",
        color:"#42302e"
        
    }

    const labelStyle = {
        color: "#302321",
        fontWeight:"600",
        
    }

    const errorStyle = {
        color:"red",
    }

    const passwordCity ={
        display: "flex",
        justifyContent: "space-between",
    }
    const inputStyle = {
        width:"90%",
        marginBottom:"30px",
        border:"none",
        borderBottom:"4px solid #e09616",
        outline:"none"
    }

    const passwords = {
        width:"60%"
    }

    const buttonStyle = {
        width:"100%",
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
    width:"100%",
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

 if(loading){
    return <Loader />
 }
  return (
    /* This is signup page and all of its css is included into this file only. */
    <div>
          
        <form  className='formStyle' onSubmit={handleSignup} method='post'>
        <img src={thali} alt="paneer"   className='topImage'/>

            <h1 style={headStyle}>Signup</h1>
            <div style={errorStyle}>{error}</div>
            <label htmlFor="name" style={labelStyle}>Name</label><br />
            <input type="text" name="name" id="name" placeholder='Enter your name' value={name} style={inputStyle} onChange={(e)=>setName(e.target.value)}/><br />

            <label htmlFor="email" style={labelStyle}>Email</label><br />
            <input type="text" name="email" id="email" placeholder='Enter your email' value={email} style={inputStyle} onChange={(e)=>setEmail(e.target.value)}/><br />
            
            <div className='password-city' style={passwordCity} >
                <div className='password' style={passwords}>
                  <label htmlFor="password" style={labelStyle}>Password</label><br />
                  <input type="password" name="password" id="password" placeholder='Enter your password' value={password} style={inputStyle} onChange={(e)=>setPassword(e.target.value)}/>
                </div>

                <div className='city'>
                  <label htmlFor="city" style={labelStyle}>Enter your family city</label><br />
                  <input type="text" name="city" id="city" placeholder='Enter city here' value={city} style={inputStyle} onChange={(e)=>setCity(e.target.value)}/>
                </div>
            </div>

            <div className="age-gender" style={passwordCity}>
                <div className="age">
                    <label htmlFor="age" style={labelStyle}>Enter your age</label><br />
                    <input type="number" name="age" id="age" placeholder='Enter your age here' value={age} style={inputStyle} onChange={(e)=>setAge(e.target.value)}/><br />
                </div>

                <div className="gender">
                    <label htmlFor="gender" style={labelStyle}>Gender</label><br />
                    <input type="radio" name="gender" id="male" value="male" checked={gender === "male"} onChange={(e)=>setGender(e.target.value)}/>Male
                    <input type="radio" name="gender" id="female" value="female" checked={gender === "female"} onChange={(e)=>setGender(e.target.value)}/>Female
                    <input type="radio" name="gender" id="other" value="other" checked={gender === "other"} onChange={(e)=>setGender(e.target.value)}/>Other
                </div>
                
            </div>
                <button style={buttonStyle} className='login-button'>Signup</button>
                <hr />

              { /*<GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />*/}
                

                <p>Already have account?<span><Link to="/login" style={forgotStyle}>Login</Link></span></p>
        </form>
    </div>
  )
}

export default Signup
