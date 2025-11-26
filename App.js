const routes = require('./Router/Route');
const express = require('express');
const middlewares = require('./Middleware/Middleware');
//var cookieParser = require('cookie-parser');
var session = require('express-session');
const app = express();

// Setup do Express 
const path = require('path');
//app.use(express.static(path.join(__dirname, 'public'))); // arquivos acessáveis pelo navegador
app.use(session({secret:'segredo', cookie:{maxAge: 60000},resave: true, saveUninitialized: true}));
//app.use(cookieParser());


//const handlebars = require('express-handlebars');
/*
app.engine('handlebars', handlebars.engine({defaultLayout: 'NoMenu'}));
app.set('view engine', 'handlebars');
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(middlewares.logRegister, middlewares.sessionControl)
app.use(routes);

app.listen(8081, function () {
  console.log("Servidor no http://localhost:8081");
});