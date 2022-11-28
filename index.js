const express = require('express');
const app = express();

const port = process.env.PORT || 3002;
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on Port ' + port);
});

let bodyParser = require('body-parser');

app.use(express.json({ limit: '1 mb' }));
const cors = require('cors');
app.use(
  cors({
    origin: '*',
  })
);

app.use(bodyParser.urlencoded({ extended: false })); //"mounting" the middleware at the top of the file
app.use('/public', express.static(__dirname + '/public'));
//express.static is the name of a middleware which makes static assets available globally for the application to use from the listed path. like stylesheets etc. It is being mounted here to make it work.
//express.static() doesn't need to be referenced down below, because the index.html file already references to the css which is inside the public folder

app.use(function (req, res, next) {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip + ' ' + Date()); //creating a middleware logger which implements on every method and therfore every page(GET,POST,DELETE, etc..)
  next(); //mounting it at the top of the file
});

app.get('/home', (req, res) => {
  res.send('Hello and Welcome');
});

app
  .get('/vend', function (req, res) {
    res.send('WELCOME');
  })
  .post('/vend', function (req, res) {
    console.log('Recieved');
    console.log(req.body);
    res.json({
      transaction: req.body,
    });
  });
