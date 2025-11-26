const db = require('../Config/Postgres');
const path = require('path');

module.exports = {
    // Create
    async getCreate(req, res) { res.render('quarto/criarQuarto'); },
    async postCreate(req, res) {
        db.Quarto.create(req.body).then(() => { 
            res.redirect('/home');
        }).catch((err) => { console.log(err); });
    },

    // List
    async getList(req, res) {
        db.Quarto.findAll().then(quarto => {
            res.render('quarto/listarQuarto', { quarto: quarto.map(QuartoPar => QuartoPar.toJSON()) });
        }).catch((err) => { console.log(err); });
    },

    //Update
    async getUpdate(req, res) {
        await db.Quarto.findByPk(req.params.id).then(
            quarto => res.render('quarto/atualizarQuarto', { quarto: quarto.dataValues })
        ).catch(function (err) { console.log(err); });
    },
    async postUpdate(req, res) {
        await db.Quarto.update(req.body, { where: { id: req.body.id } }).then(
            () => res.redirect('/listarQuarto')
        ).catch(function (err) { console.log(err); });
    },

    //Delete
    async getDelete(req, res) {
        await db.Quarto.destroy({ where: { id: req.params.id } }).then(
            () => res.redirect('/listarQuarto')
        ).catch(err => { console.log(err); });
    }
}