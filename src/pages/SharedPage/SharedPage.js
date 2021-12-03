import React, { useEffect, useState } from 'react';
import { useParams,   } from 'react-router-dom';
import './SharedPage.css';
import SharedBook from '../../components/SharedBook/SharedBook';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
const axios = require('axios');

function SharedPage() {

  const { sharedFromID, bookshelfName } = useParams();
  const displayName = bookshelfName.split('+').join(" ");
  const homepage = window.location === "jcdev" ? "https://bookshelf.jcdev.ca" : "http://localhost:3000";
  const [booksList, setBooksList] = useState([]);

  async function getSharedBooks(){
    try {
      const result = await axios.get(`/api/savedbooks/${sharedFromID}`);
      const savedBooks = result.data.savedBooks;
      setBooksList([...savedBooks]);
    } catch (err) {
      console.log("ERROR", err);
    };
  };

  useEffect( () => {
    getSharedBooks();
  }, [])

  return (
    <div className="sharedpage">
      <h1>{displayName}</h1>
      <h2>has been shared with you</h2>
      <div className="flex-container__shared">
        { booksList.map( book => 
          <SharedBook 
            key={uuidv4()}
            title={book.title}
            authors={book.authors} 
            image={book.image}
            link={book.link}
          />
        )}
      </div>
      <a className="exploreBtn" href={homepage}>
        <motion.button whileHover={{ scale: 1.06 }}>Discover more books</motion.button>
      </a>
      
    </div>
  );
};

export default SharedPage;