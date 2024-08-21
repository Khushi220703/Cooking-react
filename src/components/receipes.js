import React, { useEffect, useState } from 'react';
import "../style/receipes.css"
import burger from "../images/burger.jpg"
import food from "../images/shorts.mp4"
import { useParams } from 'react-router-dom';
import Loader from './loader';
const Receipes = (props) => {
    const { id } = useParams(); // Extract id from URL parameters
    const [receipe, setRecipe] = useState(null); // State to store recipe data
    const [loader, setLoader] = useState(false);

    const getData = async () => {
        setLoader(true);
        try {
            const response = await fetch(`https://cooking-api-0h0k.onrender.com/api/food/search/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setRecipe(data); // Set the recipe data
        } catch (error) {
            console.error("There is an error from server side", error);
        }
        finally{
            setLoader(false);
        }
    };

    useEffect(() => {
        if (id) { // Ensure id is available before fetching data
            getData();
        }
    }, [id]); // Fetch data when id changes

    const AddShopping = (list) =>{

       
            // Update the shopping list
            props.setShoppingList(prevList => {
              const updatedList = [...prevList, list];
              sessionStorage.setItem("list", JSON.stringify(updatedList));
              return updatedList;
            });
        
        
   
        
    }

    if(loader){
   return <Loader/>;
  }

    return (
        
        <div className='hi'>
            {receipe ? ( // Conditional rendering to handle null or undefined receipe
                <>
                    <p className='ingre'>{receipe.name}</p>
                    <p>By {receipe.cookName || 'Unknown'}</p>
                    <div className="ingredients-image">
                        <div className='ingredients'>
                            <p>Ingredients</p>
                            <p>Time: {receipe.prepTime || 'N/A'}</p>

                            <div className="list">
                                <ul>
                                    {receipe.ingredients && receipe.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>
                            </div>
                            <button onClick={()=>AddShopping(receipe.ingredients)}>Add to shopping list</button>
                        </div>
                        <div className="image">
                            <img src={receipe.image || burger} alt="recipe" />
                        </div>
                    </div>

                    <div className="video-steps">
                        <div className="video">
                            <ol>
                                {receipe.instructions && receipe.instructions.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ol>
                        </div>
                        <div className="steps">
                            <video controls autoPlay className='video'>
                                <source src={receipe.video} type='video/mp4'/>
                            </video>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading recipe...</p> // Loading message while data is being fetched
            )}
        </div>
    )
}

export default Receipes;
