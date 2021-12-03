import React, { useEffect, useState } from 'react';
import './SearchedBook.css';
import SaveBtn from '../SaveBtn/SaveBtn';
import Saved from '../Saved/Saved';
import { Link } from 'react-router-dom';
const axios = require('axios');

function SearchedBook( props ){

  const [saved, setSaved] = useState(false);
  const isbn13 = props.isbn.length > 0 && props.isbn[0].type === "ISBN_13" ? props.isbn[0].identifier : 0;
  const isbn10 = props.isbn.length > 1 && props.isbn[1].type === "ISBN_10" ? props.isbn[1].identifier : 0;
  const title = props.title.toLowerCase();

  function getUserID(){
    const localID = JSON.parse( localStorage.getItem("userID") );
    return localID 
  };
  
  const bookData = {
    bookID: props.bookID,
    title: props.title,
    subtitle: props.subtitle,
    authors: props.authors[0],
    textSnippet: props.textSnippet,
    description: props.description, 
    link: props.link,
    image: props.image,
    isbn: props.isbn, 
    isbn13: isbn13,
    isbn10: isbn10
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
      await axios.post(`/api/savebook/${userID}`, bookData);
    } catch (err) {
        console.log("POST ERROR", err);
    };
  };

  function handleSave(){
    saveBook();
    setSaved(true);
  };

  useEffect( () => {
    checkDB( props.title, bookData.authors );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="searched-book-container">
      <div className="searched-book-image">
        <img src={props.image} alt="book-cover"/>        
      </div>
      <div className="searched-book-info">
        <h2>{props.title}</h2>
        <h3>{props.authors[0]}</h3>
        <p>{props.textSnippet}</p>
        <div className="searched-book-link">
          <Link to={`/book/${title}?isbn10=${isbn10}&isbn13=${isbn13}`}>
            <button className="book-details-btn">Book Details</button>
          </Link>
          { !saved ? <SaveBtn handleSave={handleSave} /> : <Saved /> }
        </div>
      </div>
    </div>
  )
};

export default SearchedBook;

