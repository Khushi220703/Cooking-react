import React, { useState } from 'react'
import "../style/otp.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Otp = (props) => {
  const [number, setNumber] = useState("");
  const navigate = useNavigate()
  const CheckOtp = async () =>{
    

    try {
        if(number !== ""){
          
                    
                const formData = JSON.parse(sessionStorage.getItem("formData"));
                
                const response = await axios.post("https://cooking-api-0h0k.onrender.com/api/user/signup",formData);
                
              console.log(response);
              
                console.log(response.data.name,response.data._id);
                sessionStorage.setItem("userName",response.data.name);
                sessionStorage.setItem("userId", response.data._id);
               console.log(sessionStorage.getItem("userName"));
               
                if(response.status === 200){
                    navigate("/homePage");
                   console.log("Success");
                  
                  }

                if(response.status === 400){
                    console.log("Verification failed! Wrong otp.");
                      
                   }
            }
            
        
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div>
        <div className='otps'>
        <div className="otp">
            <p>Enter the otp</p>
            <p>We have sent an otp to your email</p>
            <div className="number number1">
                <input type="number1" className="type" placeholder='Enter the otp' value={number} onChange={(e)=>setNumber(e.target.value)}/>
            </div><br />
            <div className="button">
            <button onClick={CheckOtp}>Check</button>
        </div>
            
        </div>
        
        </div>
    </div>
  )
}

export default Otp

