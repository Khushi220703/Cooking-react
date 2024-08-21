import React, { useEffect, useState } from 'react';
import "../style/homeProfile.css";
import food from "../images/thali.gif";
import dosa from "../images/dosa.jpg";
import cooking from "../images/cooking.mp4";
import Header from './header';
import { Link } from 'react-router-dom';
import Loader from './loader';


const HomePage = (props) => {

    const [receipe, setReceipe] = useState([]);
    const [suggestionData, setSuggestionData] = useState([]);
    const [loader, setLoader] = useState(false);
    const time = new Date().getHours();

    // Fetch shopping list from props
    const shoppingItem = props.shoppingList;
    const remove = (ingredient) => {
        console.log('Removing ingredient:', ingredient);
        
        props.setShoppingList(prevList => {
            // Filter out the ingredient to remove
            const updatedList = prevList.filter(item => item !== ingredient);
    
            // Update sessionStorage with the new list
            sessionStorage.setItem("list", JSON.stringify(updatedList));
            
            // Return the updated list
            return updatedList;
        });
    };
    
    // fetch all latest recipes post and gives suggestion to user what to cook on the basis of time.
    const FetchPost = async () =>{
        setLoader(true);
        try {

            const reponse = await fetch("https://cooking-api-0h0k.onrender.com/api/food/receipe");
            const data = await reponse.json();
            setReceipe(data);

            if (time > 4 && time < 11) {
                setSuggestionData(data.filter(d => Array.isArray(d.mealType) ? 
                d.mealType.some(type => type.toLowerCase().includes("breakfast".toLowerCase())) : 
                d.mealType.toLowerCase().includes("breakfast".toLowerCase())));
            }
            else if(time > 11 && time < 16){
                setSuggestionData(data.filter(d => Array.isArray(d.mealType) ? 
                d.mealType.some(type => type.toLowerCase().includes("lunch".toLowerCase())) : 
                d.mealType.toLowerCase().includes("lunch".toLowerCase())));
            }
            else if(time > 16 && time < 18){
                setSuggestionData(data.filter(d => Array.isArray(d.mealType) ? 
                d.mealType.some(type => type.toLowerCase().includes("Snacks".toLowerCase())) : 
                d.mealType.toLowerCase().includes("Snacks".toLowerCase())));
            }
            else{
                setSuggestionData(data.filter(d => Array.isArray(d.mealType) ? 
                d.mealType.some(type => type.toLowerCase().includes("Dinner".toLowerCase())) : 
                d.mealType.toLowerCase().includes("Dinner".toLowerCase())));
            }
            console.log(suggestionData);
            
            console.log(data);
            
        } catch (error) {
            console.log("There is an error from sever side while loading the post", error);
            
        }
        finally{
            setLoader(false);
        }
    }

    useEffect(()=>{
        FetchPost();
    },[])
    
    if(loader){
   return <Loader/>;
  }
    return (
        <div className='homePage'>
            <Header />
            <div className="home">
                {/* This is the box for shopping list it has two sub boxes: when the list is empty and when the list is not empty */}
                <div className='shoping-list'>
                    {/* This is the empty shopping list box */}
                    {shoppingItem.length === 0 ? (
                        <div className="empty">
                            <img src={food} alt="food" />
                            <h1>No item in shopping list</h1>
                            <Link to="/receipe" className='Link'><button className='create'>View recipes</button></Link>
                        </div>
                    ) : (
                        <div className="shoppingList">
                            <h1>Your shopping list</h1>
                            <ol>
                                {shoppingItem && shoppingItem.map((ingredient, index) => (
                                    <li key={index}>
                                        {ingredient}
                                        <button className='removeItem' onClick={() => remove(ingredient)}>Remove</button>
                                    </li>
                                ))}
                            </ol>
                            <p className='items'>
                                Total recipes: <span className="item" style={{ fontWeight: "600", color: "burlywood" }}>{shoppingItem.length}</span>
                            </p>
                            <Link to="/receipe" className='Link'><button className='create'>Add more</button></Link>
                        </div>
                    )}
                </div>

               

            {/*------------------------------ This box is for post ssection all the latest video and picture of dishes will be appear there.--------------------------------- */}
            <div className='post'>
               {receipe.slice(-5).map((i)=>(<div className='post1'>
                    <div className="post-head">
                      <div className='chefName'><span className="name">{i.name}</span></div>
                      <Link to={`/receipes/:${i._id}`} className='Link'><button>Check receipe</button></Link>
                    </div>
                    <div className='video' >
                       <img src={i.image} alt='food' height={300} width={400}/>
                    </div>
                    {/*<div className='like-Comment'>
                    <p><svg  id="like" xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                       <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                      </svg>Like</p>
                    <p><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-chat-left-text" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                        <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
</svg>Comment</p>
                    <p><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-save2" viewBox="0 0 16 16">
  <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v4.5h2a.5.5 0 0 1 .354.854l-2.5 2.5a.5.5 0 0 1-.708 0l-2.5-2.5A.5.5 0 0 1 5.5 6.5h2V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z"/>
</svg>Save</p>
                    </div>*/}
                </div>))}
            </div>

            {/*-------------------------------------------This box is for suggestion what to cook today based on user activity--------------------------------------------- */}
            <div className='suggestions'>
                <h1>Suggested dishes for you.</h1>

                {suggestionData.map((i)=>(<div className="dish">
                        <img src={i.image} alt="dish"  />
                        <div className="dishDetail">
                            <p>Name: <span className="dishName">{i.name}</span></p>
                            <p>Duration: <span className='dishTime'>{i.prepTime} mins</span></p>
                            <p>Category: <span className="dishCategory">{i.cuisine}</span></p>
                            <p className='clickHere'>Click button below to view</p>
                            <Link to={`/receipes/:${i._id}`} className='Link'><button>View</button></Link>
                        </div>
                </div>))}

                
            </div>
        </div>

    </div>
  )
}

export default HomePage
