import React, { useState, useEffect } from 'react';
import './BookDetails.css';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import SaveBtn from '../SaveBtn/SaveBtn';
import Saved from '../Saved/Saved';
import {motion} from 'framer-motion';
const axios = require('axios');

function BookDetails(props){

  const params = useParams();
  let isbnQuery = useQuery();
  const title = params.book;

  const [bookDisplay, setBookDisplay] = useState(false);
  const [noBookDisplay, setNoBookDisplay] = useState(false);
  const [book, setBook] = useState({});
  const [saved, setSaved] = useState(false);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  };
  
  function getUserID(){
    const localID = JSON.parse( localStorage.getItem("userID") );
    return localID 
  };

  async function getBookData(){
    try {
      const result = await axios.get(`/api/book/${title}?${isbnQuery}`);
      const foundBook = result.data.book.searchResult;
      const apiBook = result.data.book.book;
      if ( foundBook ){
        checkDB( apiBook.volumeInfo.title, apiBook.volumeInfo.authors[0]);
        setBook({
          bookID: apiBook.id ? apiBook.id : null,
          title: apiBook.volumeInfo.title ? apiBook.volumeInfo.title : "",
          subtitle: apiBook.volumeInfo.subtitle ? apiBook.volumeInfo.subtitle : "",
          authors: apiBook.volumeInfo.authors ? apiBook.volumeInfo.authors[0] : "",
          textSnippet: apiBook.searchInfo ? apiBook.searchInfo.textSnippet : "",
          description: apiBook.volumeInfo.description ? apiBook.volumeInfo.description : "", 
          link: apiBook.volumeInfo.infoLink ? apiBook.volumeInfo.infoLink : "",
          image: apiBook.volumeInfo.imageLinks ? apiBook.volumeInfo.imageLinks.thumbnail : "https://via.placeholder.com/150",
          isbn: apiBook.volumeInfo.industryIdentifiers ? apiBook.volumeInfo.industryIdentifiers : false,
          isbn13: apiBook.volumeInfo.industryIdentifiers ? apiBook.volumeInfo.industryIdentifiers[0].identifier : 0,
          isbn10: apiBook.volumeInfo.industryIdentifiers ? apiBook.volumeInfo.industryIdentifiers[1].identifier : 0
          });
          setBookDisplay(true);
      } else {
          setNoBookDisplay(true);
      }
    } catch (err) {
      console.log("ERROR", err)
    };
  };

  async function checkDB( title, author ){
    try {
      const userID = await getUserID();
      const result = await axios.get(`/api/checkdb/${title}?userID=${userID}&author=${author}`);
      if ( result.data.bookSaved ){
        setSaved(true);
      }
    } catch (err) {
      console.log("ERROR", err)
    }
  };

  async function saveBook(){
    try {
      const userID = await getUserID();
      await axios.post(`/api/savebook/${userID}`, book);
    } catch (err) {
        console.log("POST ERROR", err)
    };
  };

  function handleSave(){
    saveBook();
    setSaved(true);
  };

  let history = useHistory();
  function handleBack(){
    history.goBack();
  };
  
  useEffect( () => {
    getBookData();
    //checkDB( title, book.authors[0] )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div>
      { bookDisplay && 
        <div className="book-details-page">
          <button className="backBtn" onClick={handleBack}>Back</button>
          <div className="book-details-container">
            <div className="book-details-image">
              <img src={book.image} alt="book-cover"/>        
            </div>
            <div className="book-details">
              <h2>{book.title}</h2>
              <h3>{book.subtitle}</h3>
              <h4>{book.authors}</h4>
              <p>{book.description}</p> 
              <div className="book-links">
                { !saved ? 
                  <SaveBtn handleSave={handleSave} />
                  :
                  <Saved />
                }
                <a href={book.link} target="_blank" rel="noopener noreferrer">Preview</a>
              </div>    
            </div>
          </div>
        </div>
      }
      { noBookDisplay &&
        <div className="book-details-page">
          <div className="nobook-container">
            <h1>Book Details Not Available</h1>
            <motion.button 
              onClick={handleBack}
              whileHover={{ scale: 1.25, color: '#FFF', backgroundColor: '#ED696A'  }}
            >
              Back
            </motion.button>
          </div>
        </div>
      }
    </div>
  )
};

export default BookDetails;