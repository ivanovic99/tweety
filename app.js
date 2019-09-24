const express = require( 'express' );
const app = express();

app.use(function (req, res, next) {
  console.log("no")
  next();
});

app.use("/special", function (req, res, next) {
  console.log("especial")
  next();

})

app.get("/", function(req, res) {
  console.log("khb")
  res.send('hello world');
})

app.get("/special", function(req, res) {
  console.log("khb")
  res.send('hellsdaso world');
})



app.listen(3000, function() {
  console.log("jkn")

})
