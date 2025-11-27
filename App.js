const express = require('express');
const app = express();
const routes = require('./Router/Route');
//const bodyParser = require('body-parser');

//var cookieParser = require('cookie-parser');
var session = require('express-session');

// Setup do Express 
//const path = require('path');
//app.use(express.static(path.join(__dirname, 'public'))); // arquivos acessáveis pelo navegador

app.use(session({secret:'segredo', cookie:{maxAge: 60000},resave: true, saveUninitialized: true}));
//app.use(cookieParser());

app.use(express.json());
app.use('/api', routes);
app.use(express.urlencoded({ extended: true }));


app.listen(8081, function () {
  console.log("Servidor no http://localhost:8081");
});