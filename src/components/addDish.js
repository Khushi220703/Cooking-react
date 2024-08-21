import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../style/addDish.css";
import food from "../images/food3.gif";
import Loader from "./loader"

const AddDish = () => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [video , setVideo] = useState(null);
  const [addIngredients, setAddIngredients] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [addInstruction, setAddInstruction] = useState("");
  const [instructions, setInstruction] = useState([]);
  const [mealType, setMealType] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [error , setError] = useState("");
  const [loader, setLoader] = useState(false);
  

  // This handles the display of error while uploading the video.
  useEffect(()=>{
    if(sessionStorage.getItem("error") !== null){
      setError(sessionStorage.getItem("error"));
    }
  },[])

  useEffect(() => {
    sessionStorage.setItem("error", error);
  }, [error]);


  // this send requets for storing recipe in db.
  const handleDish = async (e) =>{
    e.preventDefault();
    setUserName(sessionStorage.getItem("userName"));
    setUserId(sessionStorage.getItem("userId"));
    setType("tasty");
    
    if(userName && userId && name && image && video && ingredients && instructions && mealType && cuisine && category && type && prepTime){
      setLoader(true);
      try {
        // Create a form data object to send files and other data

        const formData = new FormData();
        formData.append("userName", userName);
        formData.append("userId", userId);
        formData.append("name", name);
        formData.append("image", image);
        formData.append("video", video);
        formData.append("ingredients", ingredients);
        formData.append("instructions", instructions);
        formData.append("mealType", mealType);
        formData.append("cuisine", cuisine);
        formData.append("category", category);
        formData.append("type", type);
        formData.append("prepTime", prepTime);
       
        
        console.log(formData);
        
        const response = await axios.post("https://cooking-api-uwid.onrender.com/api/food/recipes", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log(response.data);
      } catch (error) {
        setError("Error from server side");
        console.log(error);
      }
      finally{
        setLoader(false);
      }
    } else {
      
      
      setError("Fill details carefully!");
    }
  }
  //handle addIngredients input for array of ingredients.
  const addIngre = (addIngredients) =>{

    setIngredients(prevState => {
      const updatedIngre = [...prevState, addIngredients];
      return updatedIngre;
       }

    );
    console.log(ingredients);
    
  }

  //handle addInstructions input for array of Instructions
  const addIns = (addInstruction) =>{
    setInstruction(prevState =>{
      const updatedIns = [...prevState, addInstruction];
      return updatedIns;
    })
    console.log(instructions);
    
  }

  if(loader){
    return <Loader/>
  }
  return (
    <div>
      <form onSubmit={handleDish}>
        <img src={food} alt="japanese lunch" className='heart-image'/>
        <h1>Add Dish</h1>
        <div style={{color:"red"}}>{error}</div>
        
        <label htmlFor="dishName">Dish Name</label><br />
        <input type="text" name="dishName" id="dishName" placeholder='Enter the dish name i.e, Burger' value={name} onChange={(e)=>setName(e.target.value)}/><br /><br />

        <label htmlFor="dishImage">Dish Image</label><br />
        <input type="file" name="dishImage" id="dishImage" onChange={(e)=>setImage(e.target.files[0])}/><br /><br />

        <label htmlFor="dishVideo">Dish Video</label><br />
        <input type="file" name="dishVideo" id="dishVideo" onChange={(e)=>setVideo(e.target.files[0])}/><br /><br />

        <label htmlFor="dishIngredients">Ingredients</label><br />
        <input type='text' name="ingredients" id="ingredients"  value={addIngredients} onChange={(e) =>setAddIngredients(e.target.value)}/>
        <button onClick={()=>addIngre(addIngredients)} style={{width:"100px"}}>Add More</button><br /><br />

        <label htmlFor="dishSteps">Steps</label><br />
        <input type='text' name="dishSteps" id="dishSteps"  value={addInstruction} onChange={(e) =>setAddInstruction(e.target.value)}/>
        <button onClick={()=>addIns(addInstruction)} style={{width:"100px"}}>Add More</button><br /><br />

       
        <label htmlFor="time">Dish time</label><br/>
        <input type="text" name="time" id="time" placeholder='Enter total time for making dish i.e, 30 mins' value={prepTime} onChange={(e) =>setPrepTime(e.target.value)}/><br /><br />

        <label htmlFor="dishCategory">Dish Category</label><br />
        <input type="radio" name="category" id="veg" value="Vegetarian" checked={category === "Vegetarian"} onChange={(e)=>setCategory(e.target.value)}/>Vegetarian 
        <input type="radio" name="category" id="nonVeg"  value="Non-vegetarian" checked={category === "Non-vegetarian"} onChange={(e)=>setCategory(e.target.value)}/>Non-vegetarian <br/><br />

        <label htmlFor="dishCuisine">Cuisine</label><br />
        <input type="radio" name="cuisine" id="mexican" value="mexican" checked={cuisine === "italian"} onChange={(e)=>setCuisine(e.target.value)}/>Italian
        <input type="radio" name="cuisine" id="chinese" value="chinese" checked={cuisine === "chinese"} onChange={(e)=>setCuisine(e.target.value)}/>Chinese
        <input type="radio" name="cuisine" id="greek" value="greek" checked={cuisine === "greek"} onChange={(e)=>setCuisine(e.target.value)}/>Greek
        <input type="radio" name="cuisine" id="mexican" value="mexican" checked={cuisine === "mexican"}  onChange={(e)=>setCuisine(e.target.value)}/>Mexican
        <input type="radio" name="cuisine" id="japanese" value="japanese" checked={cuisine === "japanese"} onChange={(e)=>setCuisine(e.target.value)}/>Japanese  
        <input type="radio" name="cuisine" id="thai" value="thai" checked={cuisine === "thai"} onChange={(e)=>setCuisine(e.target.value)}/>Thai
        <input type="radio" name="cuisine" id="french" value="french" checked={cuisine === "french"} onChange={(e)=>setCuisine(e.target.value)}/>French 
        <input type="radio" name="cuisine" id="mediterranean" value="mediterranean" checked={cuisine === "mediterranean"} onChange={(e)=>setCuisine(e.target.value)}/>Mediterranean
        <input type="radio" name="cuisine" id="spanish" value="spanish" checked={cuisine === "spanish"} onChange={(e)=>setCuisine(e.target.value)}/>Spanish
        <input type="radio" name="cuisine" id="american" value="american" checked={cuisine === "american"} onChange={(e)=>setCuisine(e.target.value)}/>American
        <input type="radio" name="cuisine" id="korean" value="korean" checked={cuisine === "korean"}  onChange={(e)=>setCuisine(e.target.value)}/>Korean
        <input type="radio" name="cuisine" id="japanese" value="japanese" checked={cuisine === "japanese"} onChange={(e)=>setCuisine(e.target.value)}/>Japanese  
        <input type="radio" name="cuisine" id="vietnamese" value="vietnamese" checked={cuisine === "vietnamese"} onChange={(e)=>setCuisine(e.target.value)}/>Vietnamese
        <input type="radio" name="cuisine" id="middle Eastern" value="middle Eastern" checked={cuisine === "middle Eastern"} onChange={(e)=>setCuisine(e.target.value)}/>Middle Eastern
        <input type="radio" name="cuisine" id="ethiopia" value="ethiopia" checked={cuisine === "ethiopia"} onChange={(e)=>setCuisine(e.target.value)}/>Ethiopia 
        <input type="radio" name="cuisine" id="indian" value="indian" checked={cuisine === "indian"} onChange={(e)=>setCuisine(e.target.value)}/>Indian
        <input type="radio" name="cuisine" id="pakistani" value="pakistani" checked={cuisine === "pakistani"} onChange={(e)=>setCuisine(e.target.value)}/>Pakistani 
        <input type="radio" name="cuisine" id="asian" value="asian" checked={cuisine === "asian"} onChange={(e)=>setCuisine(e.target.value)}/>Asian 
        <input type="radio" name="cuisine" id="brazillian" value="brazillian" checked={cuisine === "brazillian"} onChange={(e)=>setCuisine(e.target.value)}/>Brazillian<br/><br/>

        <label htmlFor="dishtime">Time</label><br />
        <input type="radio" name="mealType" id="breakfast"  value="breakfast" checked={mealType === "breakfast"} onChange={(e)=>setMealType(e.target.value)}/>Breakfast 
        <input type="radio" name="mealType" id="lunch" value="lunch" checked={mealType === "lunch"} onChange={(e)=>setMealType(e.target.value)}/>Lunch 
        <input type="radio" name="mealType" id="supper" value="supper" checked={mealType === "supper"} onChange={(e)=>setMealType(e.target.value)}/>Supper 
        <input type="radio" name="mealType" id="dinner" value="dinner" checked={mealType === "dinner"} onChange={(e)=>setMealType(e.target.value)}/>Dinner <br />

        <button>Add dish</button>
      </form>
    </div>
  )
}

export default AddDish;
