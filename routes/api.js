/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;
//var MongoClient = require('mongodb').MongoClient;
//var ObjectId = require('mongodb').ObjectId;
//const MONGODB_CONNECTION_STRING = process.env.DB;
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});

const shortid = require("shortid");

let books = [];
module.exports = function (app) {
  app
    .route("/api/books")
    .get(function (req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]

      res.json(
        books.map((book) => ({
          _id: book._id,
          title: book.title,
          commentcount: book.comments.length,
        }))
      );
    })

    .post(function (req, res) {
      var title = req.body.title;
      //response will contain new book object including atleast _id and title

      const newBook = {
        _id: shortid.generate(),
        title,
        comments: ["c1", "c2", "c3"],
      };

      books.push(newBook);

      return res.json(newBook);
    })

    .delete(function (req, res) {
      //if successful response will be 'complete delete successful'
      console.log("Delete all books");
      books = [];
      //return res.json({ success: "complete delete successful" });
      return res.json(books);
    });

  app
    .route("/api/books/:id")
    .get(function (req, res) {
      var bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      const tmp = books.filter((book) => book._id === bookid);
      res.json(tmp);
    })

    .post(function (req, res) {
      var bookid = req.params.id;
      var comment = req.body.comment;
      //json res format same as .get
      books = books.map((book) => {
        if (book._id === bookid) {
          book.comments.push(comment);
        }
        return book;
      });
      return res.json(books);
    })

    .delete(function (req, res) {
      var bookid = req.params.id;
      //if successful response will be 'delete successful'
      //console.log(bookid);
      books = books.filter((book) => book._id !== bookid);
      //console.log(books);
      return res.json(books);
    });
};
