const db = require('../Config/Postgres');
const path = require('path');;

module.exports = {
    // Create
        async getCreate(req, res) { res.render('reserva/criarReserva'); },
        async postCreate(req, res) {
            db.Reserva.create(req.body).then(() => { 
                res.redirect('/home');
            }).catch((err) => { console.log(err); });
        },
    //List
    async getList(req, res) {
        db.Reserva.findAll().then(reserva => {
            res.render('reserva/listarReserva', { reserva: reserva.map(res => res.toJSON()) });
        }).catch((err) => { console.log(err); });
    },
    //Update
    async getUpdate(req, res) {
        await db.Reserva.findByPk(req.params.id).then(
            reserva => res.render('reserva/atualizarReserva', { reserva: reserva.dataValues })
        ).catch(function (err) { console.log(err); });
    },
    async postUpdate(req, res) {
        await db.Reserva.update(req.body, { where: { id: req.body.id } }).then(
            () => res.redirect('/listarReserva')
        ).catch(function (err) { console.log(err); });
    },
    //Delete
    async getDelete(req, res) {
        await db.Reserva.destroy({ where: { id: req.params.id } })
    }
}