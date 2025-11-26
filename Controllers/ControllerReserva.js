const db = require('../Config/Db');
const path = require('path');;

module.exports = {
    //List
    async getList(req, res) {
        db.Reserva.findAll().then(reserva => {
            res.render('reserva/listarReserva', { reserva: reserva.map(res => res.toJSON()) });
        }).catch((err) => { console.log(err); });
    },
    //Delete
    async getDelete(req, res) {
        await db.Reserva.destroy({ where: { id: req.params.id } })
    }
}