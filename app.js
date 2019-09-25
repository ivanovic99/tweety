var bodyParser = require('body-parser');
const express = require( 'express' );
const app = express();
const nunjucks = require("nunjucks");
const tweetBank = require("./tweetBank.js");
const routes = require('./routes');
const socketio = require('socket.io');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'html'); // hace que res.render funcione con archivos html
app.engine('html', nunjucks.render); // cuando le den archivos html a res.render, va a usar nunjucks
nunjucks.configure('views'); // apunta a nunjucks al directorio correcto para los templates

nunjucks.configure('views', {noCache: true});


function midW1(req, res, next) {
  next();
};

app.use(express.static('public'));

app.use('/', routes(io));

app.use("/", midW1, function(req, res, next) {
  next()
});




// app.get("/", function(req, res) {
//
//   nunjucks.render('index.html', function (err, output) {
//     res.send(output);
//   });
// });




// app.listen(3000, function() {
// });


var server = app.listen(3000);
var io = socketio.listen(server);
