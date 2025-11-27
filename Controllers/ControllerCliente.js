const db = require('../Config/Postgres');
const bcrypt = require('bcryptjs');
const saltRounds = 10; 

module.exports = {

    // Create
    async getCreate(req, res) {
        res.render('cliente/criarCliente', {
            layout: 'NoMenu'
        });
    },

    async postCreate(req, res) {
        try {
            if (!req.body.nome || !req.body.email || !req.body.senha) {
                return res.render('cliente/criarCliente', {
                    error: 'Por favor, preencha todos os campos',
                    layout: 'NoMenu'
                });
            }

            const existingUser = await db.Cliente.findOne({ 
                where: { email: req.body.email } 
            });
            
            if (existingUser) {
                return res.render('cliente/criarCliente', {
                    error: 'Este email já está cadastrado',
                    layout: 'NoMenu'
                });
            }

            const hashedPassword = await bcrypt.hash(req.body.senha, saltRounds);
            const user = await db.Cliente.create({
                nome: req.body.nome,
                email: req.body.email,
                senha: hashedPassword
            });

            return res.redirect('/home');
        } catch (err) {
            console.error('Erro ao criar usuário:', err);
            return res.render('cliente/criarCliente', {
                error: 'Erro ao criar usuário. Por favor, tente novamente.',
                layout: 'NoMenu.handlebars'
            });
        }
    },

    // List
    async getList(req, res) {
        db.Cliente.findAll().then(cliente => {
            res.render('cliente/listarCliente', { cliente: cliente.map(user => user.toJSON()) });
        }).catch((err) => { console.log(err); });
    },

    //Update
    async getUpdate(req, res) {
        await db.Cliente.findByPk(req.params.id).then(
            cliente => res.render('cliente/atualizarCliente', { cliente: cliente.dataValues })
        ).catch(function (err) { console.log(err); });
    },
    async postUpdate(req, res) {
        try {
            const updateData = { ...req.body };
            delete updateData.id; 
            
            if (updateData.senha) {
                updateData.senha = await bcrypt.hash(updateData.senha, saltRounds);
            } else {
                delete updateData.senha; 
            }
            const [updated] = await db.Cliente.update(updateData, { 
                where: { id: req.body.id }
            });

        } catch (err) {
            console.error('Update error:', err);
            return res.render('usuario/atualizarUsuario', {
                error: 'Erro ao atualizar usuário',
                usuario: req.body
            });
        }
    },

    //Delete
    async getDelete(req, res) {
        db.Cliente.findOne({ where: { id: req.params.id } })
        await db.Cliente.destroy({ where: { id: req.params.id } }).then(
            () => res.redirect('/listarCliente')
        ).catch(err => { console.log(err); });
    }
}