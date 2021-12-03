import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion"
import './FeaturedBook.css';

function FeaturedBook( {book} ){

  const isbn10 = book.primary_isbn10 || book.isbn[0].isbn10;
  const isbn13 = book.primary_isbn13 || book.isbn[0].isbn13;
  const title = book.title.replace(/\s/g, '+').toLowerCase();

  return (
    <motion.div className="featured-book" whileHover={{ scale: 1.08 }}>
      <Link className="featured-link" to={`book/${title}?isbn10=${isbn10}&isbn13=${isbn13}`}>
        <div className="featured-image">
          <img className="featured-image" src={book.book_image} alt="book-cover"/>        
        </div>
     </Link>  
    </motion.div>
  )
};

export default FeaturedBook;