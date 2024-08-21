import React from 'react'
import "../style/headerFooter.css"
import { Link } from 'react-router-dom'
const Header = () => {
   
   
  return (
    /*This is header page of the site having a logo and a nav bar to move to other pages.*/
    <div className='header'>
          <Link to="/homePage"><h3 className='logo'>Cooking</h3></Link>

          <div className="nav">
            <ul  className="lists">
                <Link to="/feed"><li className="list" >Feed</li></Link>
                <Link to="/receipe"><li className="list" >Receipes</li></Link>
                <Link to="/addDish"><li className="list" >Add your Receipe</li></Link>
               
            </ul>
          </div>
    </div>
  )
}

export default Header
