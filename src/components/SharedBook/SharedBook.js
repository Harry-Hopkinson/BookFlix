import React from 'react';
import './SharedBook.css';
import {motion} from 'framer-motion';

function SharedBook(props){

  return (
    <motion.div className="shared-book-container">
      <a 
        className="shared-book-link" 
        href={props.link} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <motion.div 
          className="shared-book-image" 
          whileHover={{ scale: 1.05 }}
        >
          <img src={props.image} alt="book-cover"/>
        </motion.div>
        <div className="shared-book-info">
          <h2>{props.title}</h2>
          <h3>{props.authors}</h3>
        </div>
      </a>
    </motion.div>
  )
};

export default SharedBook;

