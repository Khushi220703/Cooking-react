
import Header from "./components/header"
import LandingPage from './components/landingPage';
import Login from "./components/login"
import Signup from "./components/signup"
import HomePage from "./components/homePage"
import Feed from "./components/feed"
import Receipe from "./components/receipe"
import Receipes from './components/receipes';
import Dish from "./components/addDish"
import AddDish from './components/addDish';
import PrivateRoute from "./components/protected";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import Otp from "./components/otp";
import Loader from "./components/loader";

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  return (
    <GoogleOAuthProvider clientId='466272446066-o6mrjp9ntg66nhkdrbmh1ur29casdc47.apps.googleusercontent.com'>
   <div>
      <BrowserRouter>
        
          <Routes>
              <Route exact path="/" element={<LandingPage/>}></Route>
              <Route exact path="/signup" element={<Signup/>}></Route>
              <Route exact path="/otp" element={<Otp/>}></Route>
              <Route exact path="/login" element={<Login/>}></Route>
              <Route path="/homePage" element={<PrivateRoute element={<HomePage setShoppingList={setShoppingList} shoppingList={shoppingList}/>} />} />
              <Route exact path="/feed" element={<PrivateRoute element={<Feed/>}/>}></Route>
              <Route exact path="receipe/" element={<PrivateRoute element={<Receipe/>}/>}></Route>
              <Route path="/receipes/:id" element={<PrivateRoute element={<Receipes setShoppingList={setShoppingList} shoppingList={shoppingList}/>} />} />
              <Route exact path="/dish" element={<PrivateRoute element={<Dish/>}/>}></Route>
              <Route exact path="/addDish" element={<PrivateRoute element={<AddDish/>}/>}></Route>
              
              <Route exact path="/loader" element={<Loader/>}></Route>
             
          </Routes>
      </BrowserRouter>
     
     
   </div>
  </GoogleOAuthProvider>
  );
}

export default App;
