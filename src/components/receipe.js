import React, { useEffect, useState } from 'react';
import "../style/receipe.css";
import burger from "../images/burger.jpg";
import { Link, useParams } from 'react-router-dom';
import Loader from './loader';
const Receipe = () => {
  const [receipe, setReceipe] = useState([]);
  const [dishType, setDishType] = useState("all");
  const [dishCuisine, setDishCuisine] = useState([]);
  const [dishTime, setDishTime] = useState([]);
  const [search, setSearch] = useState("");
  const [prevRecipe, setPrevRecipe] = useState([]);
  const [loader, setLoader] = useState(false);
  const id = useParams();

  const getReceipe = async () => {
    setLoader(true);
    try {
      const response = await fetch("https://cooking-api-uwid.onrender.com/api/food/receipe");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setReceipe(data);
      setPrevRecipe(data);
    } catch (error) {
      console.error("There is an error from server side", error);
    }
    finally{
      setLoader(false);
    }
  };

  useEffect(() => {
    getReceipe();
  }, []);

  const handleCuisineChange = (e) => {
    const value = e.target.value;
  
    setDishCuisine(prevState =>
      prevState.includes(value)
        ? prevState.filter(cuisine => cuisine !== value)
        : [...prevState, value]
    );
   
  };

  const handleDishTimeChange = (e) => {
    const value = e.target.value;
    
    setDishTime(prevState =>
      prevState.includes(value)
        ? prevState.filter(i => i !== value)
        : [...prevState, value]
        
    );
   
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    if(value === ""){
    
      
      setReceipe(prevRecipe);
    }
    setSearch(value);
    setReceipe(prevState => prevState.filter(i => i.name.toLowerCase().includes(value)));
  };

  const filteredReceipes = receipe.filter(r => {
    const dishTimeMatch = dishTime.length === 0 || dishTime.some(time => r.mealType.includes(time));
    const cuisineMatch = dishCuisine.length === 0 || dishCuisine.includes(r.cuisine);
    const searchMatch = search === "" || r.name.toLowerCase().includes(search.toLowerCase());
    return dishTimeMatch && cuisineMatch && searchMatch;
  });

  if(loader){
   return <Loader/>;
  }

  return (
    <div>
      <div className="top-image">
        <img src={burger} alt="Top"  className='image' style={{width:"100%"}}/>
        <div className="image-cover"></div>
        <div className='image-text'>
          <Link to="/homePage"><h1>Cooking</h1></Link>
          <h3>Burger is healthy and tasty too if you cook it the right way.</h3>
          <h2>Explore Now</h2>
          <input type="text" name="search" id="search" placeholder='Enter the dish name' value={search} onChange={handleSearch} />
        </div>
      </div>
      <div className="receipes">
        <div className="filter">
          <div className="allFilter">
            <p>All filters</p>
           
          </div>
          <div className="dishCategory">
            <p>Dish type</p>
            <input type="radio" name="type" id="veg" value="veg" checked={dishType === "veg"} onChange={(e) => setDishType(e.target.value)} />Vegetarian <br />
            <input type="radio" name="type" id="nonVeg" value="non-veg" checked={dishType === "non-veg"} onChange={(e) => setDishType(e.target.value)} />Non-vegetarian <br />
          </div><hr />
          <div className="dishCuisine">
            <p>Cuisine</p>
           
            <input type="checkbox" name="italian" id="italian" value="Italian" checked={dishCuisine.includes("Italian")} onChange={handleCuisineChange}/>Italian<br />
            <input type="checkbox" name="chinese" id="chinese" value="Chinese" checked={dishCuisine.includes("Chinese")} onChange={handleCuisineChange}/>Chinese<br />
            <input type="checkbox" name="greek" id="greek" value="Greek" checked={dishCuisine.includes("Greek")} onChange={handleCuisineChange}/>Greek<br />
            <input type="checkbox" name="mexican" id="mexican" value="Mexican" checked={dishCuisine.includes("Mexican")} onChange={handleCuisineChange}/>Mexican<br />
            <input type="checkbox" name="japanese" id="japanese" value="Japanese" checked={dishCuisine.includes("Japanese")} onChange={handleCuisineChange}/>Japanese<br />  
            <input type="checkbox" name="thai" id="thai" value="Thai" checked={dishCuisine.includes("Thai")} onChange={handleCuisineChange}/>Thai<br />
            <input type="checkbox" name="french" id="french" value="French" checked={dishCuisine.includes("French")} onChange={handleCuisineChange}/>French<br /> 
            <input type="checkbox" name="mediterranean" id="mediterranean" value="Mediterranean" checked={dishCuisine.includes("Mediterranean")} onChange={handleCuisineChange}/>Mediterranean<br />
            <input type="checkbox" name="spanish" id="spanish" value="Spanish" checked={dishCuisine.includes("Spanish")} onChange={handleCuisineChange}/>Spanish<br />
            <input type="checkbox" name="american" id="american" value="American" checked={dishCuisine.includes("American")} onChange={handleCuisineChange}/>American<br />
            <input type="checkbox" name="korean" id="korean" value="Korean" checked={dishCuisine.includes("Korean")} onChange={handleCuisineChange}/>Korean<br />
            <input type="checkbox" name="vietnamese" id="vietnamese" value="Vietnamese" checked={dishCuisine.includes("Vietnamese")} onChange={handleCuisineChange}/>Vietnamese<br />
            <input type="checkbox" name="middle-eastern" id="middle-eastern" value="Middle Eastern" checked={dishCuisine.includes("Middle Eastern")} onChange={handleCuisineChange}/>Middle Eastern<br />
            <input type="checkbox" name="ethiopian" id="ethiopian" value="Ethiopian" checked={dishCuisine.includes("Ethiopian")} onChange={handleCuisineChange}/>Ethiopian<br /> 
            <input type="checkbox" name="indian" id="indian" value="Indian" checked={dishCuisine.includes("Indian")} onChange={handleCuisineChange}/>Indian<br />
            <input type="checkbox" name="pakistani" id="pakistani" value="Pakistani" checked={dishCuisine.includes("Pakistani")} onChange={handleCuisineChange}/>Pakistani<br />
            <input type="checkbox" name="asian" id="asian" value="Asian" checked={dishCuisine.includes("Asian")} onChange={handleCuisineChange}/>Asian<br />
            <input type="checkbox" name="brazilian" id="brazilian" value="Brazilian" checked={dishCuisine.includes("Brazilian")} onChange={handleCuisineChange}/>Brazilian<br/><br/>


          </div><hr />
          <div className="lunch">
            <p>Dish time</p>
            <input type="checkbox" name="breakfast" id="breakfast" value="Breakfast" checked={dishTime.includes("Breakfast")} onChange={handleDishTimeChange} />Breakfast <br />
            <input type="checkbox" name="lunch" id="lunch" value="Lunch" checked={dishTime.includes("Lunch")} onChange={handleDishTimeChange} />Lunch <br />
            <input type="checkbox" name="supper" id="supper" value="Snacks" checked={dishTime.includes("Snacks")} onChange={handleDishTimeChange} />Snacks <br />
            <input type="checkbox" name="dinner" id="dinner" value="Dinner" checked={dishTime.includes("Dinner")} onChange={handleDishTimeChange} />Dinner <br />
          </div><hr />
        </div>
        <div className="receipeList">
          <p className="receipeName">Receipes</p>
          <div className="checkReceipes">
            <div className="receipes-box">
              <div className="box">
                {filteredReceipes.length === 0 ? <p>No recipes found</p> : (
                  filteredReceipes.map(i => (
                    <Link to={`/receipes/:${i._id}`}><div className="receipe-box" key={i.id}>
                      <img src={i.image} alt={i.name} className="burger" />
                      <div className="details">
                        <p>{i.name}</p>
                      </div>
                    </div></Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Receipe;
