import React from 'react';
import './NyTimesBook.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function NyTimesBook( {book} ){

  const displayTitle = book.title.toLowerCase()
  .split(' ')
  .map( (word) =>  word.charAt(0).toUpperCase() + word.substring(1) )
  .join(' ');

  const isbn10 = book.primary_isbn10 || book.isbn[0].isbn10;
  const isbn13 = book.primary_isbn13 || book.isbn[0].isbn13;
  const title = book.title.replace(/\s/g, '+').toLowerCase();

  return (
    <Link className="nyt-book nyt-book-link" to={`book/${title}?isbn10=${isbn10}&isbn13=${isbn13}`}>
      <motion.div className="nyt-image" whileHover={{ scale: 1.08 }}>
        <img className="nyt-image" src={book.book_image} alt="book-cover"/>        
      </motion.div>
      <div className="nyt-book-info">
        <h5>{displayTitle}</h5>
        <p>{book.author}</p>
      </div>
    </Link>  
  )
};

export default NyTimesBook;