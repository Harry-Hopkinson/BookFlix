const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  bookID: {
    type: String, 
    trim: true,
    required: true
  },
  title: {
    type: String, 
    trim: true, 
    required: true
  },
  subtitle: {
    type: String, 
    trim: true
  },
  authors: {
    type: String, 
    trim: true, 
    required: true
  },
  textSnippet: {
    type: String, 
    trim: true, 
  },
  description: {
    type: String, 
    trim: true, 
    required: true
  },
  link: {
    type: String, 
    trim: true, 
    required: true
  },
  image: {
    type: String, 
    trim: true, 
    required: true
  },
  isbn: {
    type: Array
  },
  isbn13: {
    type: String
  },
  isbn10: {
    type: String
  },
  savedBy: {
    type: String,
    trim: true, 
    required: true
  },
  createdAt: {
    type: Date, 
    default: Date.now
  } 
}); 

module.exports = mongoose.model('SavedBooks', BookSchema )