const express = require('express');
const db = require('../Config/Postgres');

const ControllerCliente = require('../Controllers/ControllerCliente');
const ControllerQuarto = require('../Controllers/ControllerQuarto');
const ControllerReserva = require('../Controllers/ControllerReserva');
const middlewares = require('../Middleware/Middleware');

const route = express.Router();

// Rodar 1x 
/*db.sequelize.sync({force: true}).then(() => {
    console.log('{ force: true }');
});
*/
//db.Cliente.create({nome:'bob', senha:'1234', email:'test@gmail.com'});

//Home
route.get("/home", function (req, res) { 
    console.log('Home route - Session:', req.session);
    if (req.session.email) { 
        res.render('home', {
            layout: 'main',
            email: req.session.email,
            nome: req.session.nome
        });
    } else {
        res.redirect('/');
    }
});

//Cliente
route.get('/', ControllerCliente.getLogin);
route.post("/login", ControllerCliente.login);
route.get("/logout", ControllerCliente.logout);
route.get("/criarUsuario", ControllerCliente.getCreate);
route.post("/criarUsuario", ControllerCliente.postCreate);
route.get("/listarUsuario", ControllerCliente.getList);
route.get("/atualizarUsuario/:id", ControllerCliente.getUpdate);
route.post("/atualizarUsuario", ControllerCliente.postUpdate);
route.get("/deletarUsuario/:id", ControllerCliente.getDelete);

//Quarto
route.get("/criarQuarto", ControllerQuarto.getCreate);
route.post("/criarQuarto", ControllerQuarto.postCreate);
route.get("/listarQuarto", ControllerQuarto.getList);
route.get("/atualizarQuarto/:id", ControllerQuarto.getUpdate);
route.post("/atualizarQuarto", ControllerQuarto.postUpdate);
route.get("/deletarQuarto/:id", ControllerQuarto.getDelete);

//Reserva
route.get("/criarReserva", ControllerReserva.getCreate);
route.post("/criarReserva", ControllerReserva.postCreate);
route.get("/listarReserva", ControllerReserva.getList);
route.get("/atualizarReserva/:id", middlewares.checkUserProjectAccess, ControllerReserva.getUpdate);
route.post("/atualizarReserva", middlewares.checkUserProjectAccess, ControllerReserva.postUpdate);
route.get("/deletarReserva/:id", middlewares.checkUserProjectAccess, ControllerReserva.getDelete);

module.exports = route;