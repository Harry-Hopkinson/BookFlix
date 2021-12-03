const express = require('express');
const router = express.Router();

const { assignUserID } = require('../controllers/handleLocalstorage.js');

router 
  .route('/setID')
  .get( assignUserID )

module.exports = router;