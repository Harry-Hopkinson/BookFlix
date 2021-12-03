const express = require('express');
const app = express();
const path = require('path');
const dbConnection = require('./db/config/db');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const PORT = process.env.NODE_ENV === 'production' ? 5015 : 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('dotenv').config();

//connects mongoDB
dbConnection();

const bookSearch = require('./routes/books');
const localstorageSet = require('./routes/localstorage');
const nytAPI = require('./routes/nytbookdata') 

app.use('/api/', bookSearch);
app.use('/api/user', localstorageSet);
app.use('/api/nyt', nytAPI );

if ( process.env.NODE_ENV === 'staging' ){
  app.get('/', ( req,res ) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
  });
  app.use(express.static(path.join(__dirname, 'public')));
  app.get('*', ( req,res ) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
  });
} else if ( process.env.NODE_ENV === 'production' ){
  app.get('/', ( req,res ) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  });
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', ( req,res ) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  });
};

console.log("ENV".green, process.env.NODE_ENV);

app.listen(PORT, () => {
  console.log(`App running on PORT:${PORT}`.bold.cyan)
});