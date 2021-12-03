import React from 'react';
import './NoBooks.css';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion';

function NoBooks(){
  return (
    <div className="no-saved-books">
      <h3>No saved books</h3>
      <h4>Search for your favourite book.</h4>  
      <Link className="no-saved-books-link" to="/search">
        <motion.button
          whileHover={{ scale: 1.1 }}
        >Search</motion.button>   
      </Link>
    </div>
  )
}

export default NoBooks;