const express = require('express');
const router = express.Router();

const { getNYTBookData } = require('../controllers/handleNYTBookData.js');

router 
  .route('/nytbookdata')
  .get( getNYTBookData )

module.exports = router;