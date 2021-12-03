import React from 'react';
import { Link } from 'react-router-dom';
import './TopBook.css';
import {motion} from 'framer-motion';

function TopBook( {book} ){

  const isbn10 = book.isbn10;
  const isbn13 = book.isbn13;
  const title = book.title.replace(/\s/g, '+').toLowerCase();

  return (
      <Link className="topbook topbook-link" to={`book/${title}?isbn10=${isbn10}&isbn13=${isbn13}`}>
        <motion.div className="topbook-image" whileHover={{ scale: 1.04 }}>
          <img className="topbook-image" src={book.thumbnail} alt="book-cover"/>        
        </motion.div>
        <div className="topbook-info">
          <h5>{book.title}</h5>
          <h6>{book.author}</h6>
          <p>{book.textSnippet}</p>
        </div>
      </Link>  
  )
};

export default TopBook;