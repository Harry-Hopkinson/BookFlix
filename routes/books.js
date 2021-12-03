const express = require('express');
const router = express.Router();

const { getSearchResults, getBookDetails, checkIfSaved, saveBook, deleteBook, getSavedBooks, bookCount } = require('../controllers/handleBooks');

router
  .route('/search/:searchterm')
  .get( getSearchResults )

router 
  .route('/book/:title')
  .get( getBookDetails )

router
  .route('/checkdb/:title')
  .get( checkIfSaved )

router 
  .route('/savebook/:userID')
  .post( saveBook )

router 
  .route('/delete/:deleteID')
  .delete( deleteBook )

router
  .route('/savedbooks/:userID')
  .get( getSavedBooks )

router 
  .route('/bookcount/:userID')
  .get( bookCount )
  

  module.exports = router;