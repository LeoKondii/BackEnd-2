const db = require('../Config/Postgres');

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
        await db.Quarto.findByPk(req.params.idQuarto).then(
            quarto => res.render('quarto/atualizarQuarto', { quarto: quarto.dataValues })
        ).catch(function (err) { console.log(err); });
    },
    async postUpdate(req, res) {
        await db.Quarto.update(req.body, { where: { id: req.body.idQuarto } }).then(
            () => res.redirect('/listarQuarto')
        ).catch(function (err) { console.log(err); });
    },

    //Delete
    async getDelete(req, res) { //Verficar
        await db.Quarto.destroy({ where: { id: req.params.idQuarto } }).then(
            () => res.redirect('/listarQuarto')
        ).catch(err => { console.log(err); });
    }
}