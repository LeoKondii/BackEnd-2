const db = require('../Config/Postgres');
const path = require('path');
const bcrypt = require('bcryptjs');
const saltRounds = 10; 
const secretKey = 'your_secret_key';

module.exports = {

    // Login
    async getLogin(req, res) {
        res.render('cliente/login', { layout: '' });
    },
    async logout(req, res) {
        req.session.destroy();
        res.redirect('');
    },

    async login(req, res) {
        try {
            const { login, senha } = req.body;
            const user = await db.Usuario.findOne({ where: { login:req.body.login } });

            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            if (senha != user.senha) {
                return res.status(401).json({ error: 'Senha incorreta' });
            }

            const token = generateToken(user);
            res.status(200).json({ token });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao fazer login' });
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


function generateToken(user) {
    const payload = {
        id: user.id,
        email: user.email
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
}