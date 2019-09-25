const express = require( 'express' );
const app = express();
const nunjucks = require("nunjucks");
const tweetBank = require("./tweetBank.js");
const routes = require('./routes');

app.use('/', routes);

app.set('view engine', 'html'); // hace que res.render funcione con archivos html
app.engine('html', nunjucks.render); // cuando le den archivos html a res.render, va a usar nunjucks
nunjucks.configure('views'); // apunta a nunjucks al directorio correcto para los templates

nunjucks.configure('views', {noCache: true});

function midW1(req, res, next) {
  console.log("middleware 1")
  next();
};

app.use(express.static('public'));

app.use("/", midW1, function(req, res, next) {
  console.log(req.method + " " + req.url)
  next()
});



// app.get("/", function(req, res) {
//
//   nunjucks.render('index.html', function (err, output) {
//     res.send(output);
//   });
// });




app.listen(3000, function() {
  console.log("jkn")

})
