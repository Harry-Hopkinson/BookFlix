import React, { useState, useEffect } from 'react';
import '../../App.css';
import './NavBar.css';
import { NavLink } from 'react-router-dom';

function NavBar(){

  const [showFullNav, setShowFullNav] = useState();
  const homepage = window.location === "jcdev" ? "https://bookshelf.jcdev.ca" : "http://localhost:3000";

  useEffect(() => {
    if ( window.location.pathname.includes( "/shared/")) {
      setShowFullNav(false)
    } else setShowFullNav(true)
  }, [])

  return (
    <div className="navbar">
      <div className="navbar-container">
        <a href={homepage} className="link">
          <div className="logo-container">
            <span className="wordmark">bookshelf</span>
            <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" className="bi bi-bookmark-heart" fill="#ED696A" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
            <path fillRule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
            </svg>
          </div>
        </a>

        { showFullNav && 
          <div className="nav-links">
            <p href='./search'>
              <NavLink 
                to="/search" 
                className="link"
                activeClassName="active"  
              > 
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                  <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                  </svg>
                </span>
                
              </NavLink>
            </p>
            <p href='./search'>
              <NavLink 
                to="/savedbooks" 
                className="link"
                activeClassName="active"  
              >
                Saved Books
              </NavLink>
            </p>
          </div>
        }
        
      </div>
    </div>
  )
};

export default NavBar;