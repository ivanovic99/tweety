const express = require( 'express' );
const app = express();
const nunjucks = require("nunjucks");
const tweetBank = require("./tweetBank.js");

app.set('view engine', 'html'); // hace que res.render funcione con archivos html
app.engine('html', nunjucks.render); // cuando le den archivos html a res.render, va a usar nunjucks
nunjucks.configure('views'); // apunta a nunjucks al directorio correcto para los templates

nunjucks.configure('views', {noCache: true});

function midW1(req, res, next) {
  console.log("middleware 1")
  next();
};
function midW2(req, res, next) {
  console.log("middleware 2")
  next();
};


app.use("/", midW1, midW2, function(req, res, next) {
  console.log(req.method + " " + req.url)
  next()
});

app.use("/special", function (req, res, next) {
  console.log("middlewareSpecial")
  next();

})

app.get("/", function(req, res) {

  var locals = {
    // title: 'An Example',
    people: [
      { name: 'Gandalf'},
      { name: 'Frodo' },
      { name: 'Hermione'}
    ]
  };
  nunjucks.render('index.html', {title: "personajes", people: locals.people}, function (err, output) {
    res.send(output);
  });
});

app.get("/special", function(req, res) {
  console.log("khb")
  res.send('hellsdaso world');

});



app.listen(3000, function() {
  console.log("jkn")

})
