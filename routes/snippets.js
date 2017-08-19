const express = require('express');
const routes = express.Router();
const User = require('../models/user');
const Snippet = require('../models/snippet');
const mongoose = require('mongoose');

const requireLogin = (req, res, next) => {
  console.log('req.user', req.user);
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

routes.use(requireLogin);

routes.get('/snippetsList', (req, res) => {
  Snippet.find({ userID: req.user.id })
    // then show my clubs
    .then(snippet => res.render('snippetsList', { snippet: snippet }))
    // handle errors
    .catch(err => res.send('there was an error :('));
});


routes.get('/snippets/add', (req, res) => {
    if (req.query.id) {
      Snippet.findById(req.query.id)
        // render form with this item
        .then(snippet => res.render('add', { snippet: snippet }));
    } else {
      res.render('add');
    }
});

routes.post('/snippets', (req, res) => {
  //edit snippet
  //set a random number as the ID
  //need to split array values into individual strings
  if (!req.body.id){
    req.body.id = new mongoose.mongo.ObjectID();
  }
  req.body.userID = req.user.id;
  Snippet.findByIdAndUpdate(req.body.id, req.body, { upsert: true })
    .then(() => res.redirect('/'))
    // catch validation errors
    .catch(err => {
      console.log(err);
      res.render('add', {
        errors: err.errors,
        snippet: req.body
      });
    });
});

routes.get('/delete', (req, res) => {
  Snippet.findById(req.query.id)
    .remove()
    // then redirect to the homepage
    .then(() => res.redirect('/snippetsList'));
});



module.exports = routes;
