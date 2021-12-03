import React, { useEffect, useState} from 'react';
import './SearchPage.css';
import { useParams } from 'react-router-dom';
import SearchInput from '../../components/SearchInput/SearchInput';
import SearchedBook from '../../components/SearchedBook/SearchedBook';
import { v4 as uuidv4 } from 'uuid';
const axios = require('axios');

function SearchPage(props){

    const params = useParams();
    const [booksList, setBooksList] = useState([]);
    const [searchDisplay, setSearchDisplay] = useState(false);
    const [searchTerm, setSearchTerm] = useState();

    function convertText( text ){
      const converted = text
        .replace(/<[^>]+>|&nbsp/g, "")
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        return converted
    }; 

    async function handleApiCall(searchTerm){
      try {
          const result = await axios.get(`/api/search/${searchTerm}`)
          const resultsList = result.data.books;
          let checkedList = [];
          resultsList.map( book => checkedList.push( {
              bookID: book.id ? book.id : null,
              title: book.volumeInfo.title ? book.volumeInfo.title : "",
              subtitle: book.volumeInfo.subtitle ? book.volumeInfo.subtitle : "",
              authors: book.volumeInfo.authors ? book.volumeInfo.authors : [],
              textSnippet: book.searchInfo ? convertText( book.searchInfo.textSnippet ) : "",
              description: book.volumeInfo.description ? book.volumeInfo.description : "", 
              link: book.volumeInfo.infoLink ? book.volumeInfo.infoLink : "",
              image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "https://via.placeholder.com/150",
              isbn: book.volumeInfo.industryIdentifiers ? book.volumeInfo.industryIdentifiers : [0,0]
              }) 
          )
          setBooksList( checkedList );
          setSearchDisplay(true);
      } catch (err) {
          console.log("ERROR", err);
      };
    };

    useEffect(() => {
      if( params.searchterm ){
        handleApiCall( params.searchterm);
        setSearchTerm( params.searchterm.split('+').join(' ') )
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.searchterm])

    return ( 
      <div className="search-page">
        { !searchDisplay &&
          <div className="no-search">
           <h1>Search for your favourite book.</h1>
         </div>
        }
        <div className="search-header-container">
          <SearchInput apiCall={handleApiCall} />
        </div>
          { searchDisplay && 
            
            <div className="search-container">
              <h1>Search Results for 
                <span className="searchterm"> "{searchTerm}"</span>
              </h1>
              { booksList.map( book => 
                  <SearchedBook 
                    key={uuidv4()}
                    bookID={book.bookID} 
                    book={book}
                    title={book.title}
                    subtitle={book.subtitle}
                    authors={book.authors}
                    textSnippet={book.textSnippet}
                    description={book.description}
                    link={book.link}
                    image={book.image}
                    isbn={book.isbn}
                  />
              )}
            </div>
            }            
        </div>
    )
};

const memoSearchPage = React.memo( SearchPage, (prevProps, nextProps) => {
  if( prevProps.booksList !== nextProps.booksList){
    return false
  }
    return true
} );
export default memoSearchPage;
//export default SearchPage;