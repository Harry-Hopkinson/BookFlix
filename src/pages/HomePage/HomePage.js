
import React, { useEffect, useState} from 'react';
import './HomePage.css';
import HomeInput from '../../components/HomeInput/HomeInput';
import { v4 as uuidv4 } from 'uuid';
import FeaturedBook from '../../components/FeaturedBook/FeaturedBook';
import TopBook from '../../components/TopBook/TopBook';
import NyTimesBook from '../../components/NyTimesBook/NyTimesBook';
const axios = require('axios');

function HomePage(props){
  
    const [bookData, setBookData] = useState({});
    const [allBooksDisplay, setAllBooksDisplay] = useState(false);

    async function getAllBookData(){
      try {
        const result = await axios.get('/api/nyt/nytbookdata');
        if ( result.data.success === true ){
          setBookData( result.data.books );
          setAllBooksDisplay(true);
        }
      } catch (err) {
          console.log("ERROR", err);
      };
    };

    useEffect(() => {
      getAllBookData();
    }, [])

    return ( 
      <div className="home-page">
        <div className="hero-container">
          <div className="headline">
              Find your next great book.
          </div>
          <HomeInput />
        </div>
        { allBooksDisplay &&
          <div className="main-content-container">
            <div className="highlighted-books">
              <div className="featured-container">
                <div className="featured-header">
                  <h2>Featured Books</h2>
                </div>
                <div className="featured-flex">
                  { bookData.featured.map( book => 
                    <FeaturedBook 
                      key={uuidv4()}
                      book={book}
                    />
                  )}
                </div>
              </div>
              <div className="topbooks-container">
                <h2>Top Books</h2>
                { bookData.topBooks.map( book => 
                  <TopBook
                    key={uuidv4()}
                    book={book}
                  />
                )}
              </div>
            </div>
               <div className="nyt-container-first">
               <h2>NY Times Best Sellers - Fiction</h2>
               <div className="nyt-results top5">
                 { bookData.fiction.map( nytbook => 
                   <NyTimesBook 
                     key={uuidv4()}
                     book={nytbook}
                   />
                 )}
               </div>
              </div>
            <div className="nyt-container-second">
              <h2>NY Times Best Sellers - Non-Fiction</h2>
              <div className="nyt-results top5">
                { bookData.nonfiction.map( nytbook => 
                  <NyTimesBook 
                    key={uuidv4()}
                    book={nytbook}
                  />
                )}
              </div>
            </div> 
          </div> 
        }     
      </div>
    )
};

export default HomePage;