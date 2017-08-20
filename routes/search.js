const express = require('express');
const routes = express.Router();
const Snippet = require('../models/snippet');
const bodyParser = require('body-parser');

const requireLogin = (req, res, next) => {
  console.log('req.user', req.user);
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

routes.use(requireLogin)

routes.get('/search', requireLogin, (req, res) => {

  let srch = req.query.snippets;

  Snippet.find({
   author: req.user.username,

    $or: [{'languege': search},

    {tags: search}]})

.then(snippets => res.render('search',{snippets: snippets}))

.catch(err => res.send('snippet not found'))

});

module.exports = routes;
