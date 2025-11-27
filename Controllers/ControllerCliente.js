const db = require('../Config/Postgres');
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10; 
const logUsuario = require('../Models/NoSql/LogUsuario');

module.exports = {

    // Login
    async getLogin(req, res) {
        res.render('cliente/login', { layout: '' });
    },
    async getLogout(req, res) {
        req.session.destroy();
        res.redirect('');
    },

    async postLogin(req, res) {
        try {
            console.log('Tentativa de Login:', req.body);

            if (!req.body.email || !req.body.senha) {
                return res.render('usuario/login', {
                    error: 'Por favor, preencha todos os campos',
                    layout: 'NoMenu'
                });
            }

            const user = await db.Cliente.findOne({ where: { email: req.body.email } });
            console.log('Achou Usuario:', user ? 'Yes' : 'No');

            if (!user) {
                return res.render('cliente/login', {
                    error: 'Usuário não encontrado',
                    layout: 'NoMenu'
                });
            }

            const passwordMatch = await bcrypt.compare(req.body.senha, user.senha);
            console.log('Password match:', passwordMatch ? 'Yes' : 'No');

            if (!passwordMatch) {
                return res.render('usuario/login', {
                    error: 'Senha incorreta',
                    layout: 'NoMenu'
                });
            }

            req.session.email = user.email;
            req.session.userId = user.id;
            req.session.nome = user.nome;
            res.locals.email = user.email;
            res.locals.nome = user.nome;

            console.log('Login successful, session:', req.session);
            return res.redirect('/home');
        } catch (err) {
            console.error('Login error:', err);
            return res.render('cliente/login', {
                error: 'Erro ao fazer login. Tente novamente.',
                layout: 'NoMenu'
            });
        }
    },

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

            req.session.email = user.email;
            req.session.userId = user.id;
            res.locals.email = user.email;
            

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
            
            // hash de senha
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