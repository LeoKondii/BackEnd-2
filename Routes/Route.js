const express = require('express');
const ControllerCliente = require('../Controllers/ControllerCliente');
const ControllerQuarto = require('../Controllers/ControllerQuarto');
const ControllerReserva = require('../Controllers/ControllerReserva');
const AuthController = require('../Controllers/AuthController');
const authenticateToken = require('../Middleware/authenticateToken');

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

//Login
route.post("/login", AuthController.login);
route.get("/logout", AuthController.logout);

//Cliente
route.get("/criarUsuario", authenticateToken, ControllerCliente.getCreate);
route.post("/criarUsuario", authenticateToken, ControllerCliente.postCreate);
route.get("/listarUsuario", authenticateToken, ControllerCliente.getList);
route.get("/atualizarUsuario/:id", authenticateToken, ControllerCliente.getUpdate);
route.post("/atualizarUsuario", authenticateToken, ControllerCliente.postUpdate);
route.get("/deletarUsuario/:id", authenticateToken, ControllerCliente.getDelete);

//Quarto
route.get("/criarQuarto", authenticateToken, ControllerQuarto.getCreate);
route.post("/criarQuarto", authenticateToken, ControllerQuarto.postCreate);
route.get("/listarQuarto", authenticateToken, ControllerQuarto.getList);
route.get("/atualizarQuarto/:id", authenticateToken, ControllerQuarto.getUpdate);
route.post("/atualizarQuarto", authenticateToken, ControllerQuarto.postUpdate);
route.get("/deletarQuarto/:id", authenticateToken, ControllerQuarto.getDelete);

//Reserva
route.get("/criarReserva", authenticateToken, ControllerReserva.getCreate);
route.post("/criarReserva", authenticateToken, ControllerReserva.postCreate);
route.get("/listarReserva", authenticateToken, ControllerReserva.getList);
route.get("/atualizarReserva/:id", authenticateToken, middlewares.checkUserProjectAccess, ControllerReserva.getUpdate);
route.post("/atualizarReserva", authenticateToken, middlewares.checkUserProjectAccess, ControllerReserva.postUpdate);
route.get("/deletarReserva/:id", authenticateToken, middlewares.checkUserProjectAccess, ControllerReserva.getDelete);

module.exports = route;