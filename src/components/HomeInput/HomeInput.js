import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './HomeInput.css';
import {motion} from 'framer-motion';

function HomeInput(props){

  const [inputText, setInputText] = useState("");

  function handleSearch(ev){
    ev.preventDefault();
  };

  function handleInputChange(ev){
    const searchText = ev.target.value.replace(/\s/g, '+');
    setInputText(searchText);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSearch}>
        <input onChange={handleInputChange} type="text"/>
        <Link className="main-btn" to={`/search/${inputText}`}>
          <motion.button whileHover={{ scale: 1.1 }}>Search</motion.button>
        </Link>
      </form>
      <div className="mobile-btn">
        <Link to={`/search/${inputText}`}>
          <motion.button whileHover={{ scale: 1.1 }}>Search</motion.button>
        </Link>
      </div>
      
    </div>
  )
};

export default HomeInput;