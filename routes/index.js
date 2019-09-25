const router = require('express').Router()
const tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets, showForm: true } );

});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var list = tweetBank.find( { name: name } );
  res.render( 'index', { tweets: list, showForm: true, name: name } );
});

router.get('/tweets/:id', function(req, res) {
  var id = parseInt(req.params.id);
  var list = tweetBank.find( { id: id } );
  res.render( 'index', { tweets: list } );
});

router.post('/tweets', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  io.sockets.emit('newTweet', { name: name, text: text })
  res.redirect('/');
});

router.post('/users/:name', function(req, res) {
  var name = req.params.name
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
});

module.exports = function (io) {

  return router
};
