import React from 'react';
import './SavedBook.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const axios = require('axios');

function SavedBook(props){

  const bookData = { deleteID: props.dbID };
  const isbn10 = props.isbn10;
  const isbn13 = props.isbn13;
  const title = props.title.toLowerCase();
  const urlTitle = title.replace(/\s/g, '+');

  async function deleteBook(){
    try {
      await axios.delete(`/api/delete/${bookData.deleteID}`);
    } catch (err) {
      console.log("ERROR", err);
    };
  };

  function handleDelete(){
    deleteBook();
    props.setBooksList( props.booksList.filter( book => book._id !== props.dbID ));
  };

  return (
      <motion.div className="saved-book-container">
        <motion.div className="remove-button" whileHover={{ y: -8 }}>
          <button onClick={ () => {handleDelete(); props.setShow(true)} }>
            <svg xmlns="http://www.w3.org/2000/svg" width="20"  height="20" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
        </motion.div>
        <Link to={`/book/${urlTitle}?isbn10=${isbn10}&isbn13=${isbn13}`} className="saved-book-link">
          <motion.div className="saved-book-image" whileHover={{ scale: 1.05 }}>
            <img src={props.image} alt="book-cover"/>
          </motion.div>
          <div className="saved-book-info">
            <h2>{props.title}</h2>
            <h3>{props.authors}</h3>
          </div>
        </Link>
      </motion.div>
    
  )
};

export default SavedBook;

