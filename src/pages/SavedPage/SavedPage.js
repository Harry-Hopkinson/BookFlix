import React, { useEffect, useState, useRef } from 'react';
import './SavedPage.css';
import SavedBook from '../../components/SavedBook/SavedBook';
import NoBooks from '../../components/NoBooks/NoBooks';
import DeleteToast from '../../components/DeleteToast/DeleteToast';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
const axios = require('axios');

function SavedPage (props){
  const [booksList, setBooksList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastShow, setToastShow] = useState(false);
  const [userID, setUserID] = useState("");
  const [bookshelfName, setBookshelfName] = useState("");
  const [shareLink, setShareLink] = useState("");
  const shareInputRef = useRef(null);

  function getUserID(){
    return JSON.parse( localStorage.getItem("userID") );
  };

  function getBookshelfName(){
    return JSON.parse( localStorage.getItem("bookshelfName"));
  };

  function setLocalName(){
    localStorage.setItem("bookshelfName", JSON.stringify( bookshelfName ))
  };

  async function getSavedBooks(){
    try {
      const localID = await getUserID();
      setUserID( localID );
      const result = await axios.get(`/api/savedbooks/${localID}`);
      const savedBooks = result.data.savedBooks;
      setBooksList([...savedBooks]);
      const localName = await getBookshelfName();
      setBookshelfName( localName );

      setTimeout( () => setLoading(false), 1000);
    } catch (err) {
      console.log("ERROR", err);
    };
  };
  
  function handleInputChange(ev){
    setBookshelfName( ev.target.value);
    if ( shareLink.length > 0 ) setShareLink("")
  };

  function handleShareLink( direction ){
    const urlName = bookshelfName.length !== 0 ? (bookshelfName.replace(/\s/g, '+') ) : "a+bookshelf";
    switch ( direction ) {
      case "share":
        setShareLink( `localhost:3000/shared/${userID}/${urlName}`);
        break 
      case "close":
        setShareLink("")
        break 
      default: 
    }
  };

  function copyText(){
    shareInputRef.current.select();
    document.execCommand('copy');
  };

  useEffect( () => {
    getSavedBooks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <div className="loading-view">
        <h1>loading your bookshelf...</h1>
      </div>
    );
  };

  return (
    <div className="savedpage">
      { booksList.length > 0 ? 
        <div>
          <DeleteToast show={toastShow} setShow={setToastShow}/>
          <div className="saved-header">
            <input 
              type="text"
              placeholder="Add bookshelf name" 
              value={bookshelfName} 
              onChange={handleInputChange}
              onBlur={setLocalName}
            >
            </input>
            { shareLink.length === 0 ?
              <motion.button whileHover={{scale: 1.02}} value="share" onClick={ (ev) => { handleShareLink( ev.target.value) }}>share</motion.button>
              : 
              <motion.button whileHover={{scale: 1.02}} value="close" onClick={ (ev) => { handleShareLink( ev.target.value )}}>X</motion.button>
            }
            
          </div>
          { shareLink.length > 0 &&
            <div className="share-link">
              <input 
                type="text"
                ref={shareInputRef}
                value={shareLink}
                readOnly 
              >
              </input>
              <button onClick={copyText}>copy</button>
            </div>
          }
          <div className="flex-container">
            { booksList.map( book => 
              <SavedBook 
                key={uuidv4()}
                dbID={book._id}
                bookID={book.bookID} 
                title={book.title}
                authors={book.authors} 
                image={book.image}
                isbn10={book.isbn10}
                isbn13={book.isbn13}
                setBooksList={setBooksList}
                booksList={booksList}
                setShow={setToastShow}
              />
              )
            }
          </div>

        </div>
        : 
        <NoBooks />
      }
    </div>
  ); 
};

export default SavedPage;
