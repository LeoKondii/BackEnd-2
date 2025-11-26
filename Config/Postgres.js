const Sequelize = require('sequelize');
const sequelize = new Sequelize('BackEnd2', 'postgres', '123', {host: 'localhost',dialect: 'postgres'});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

/*
db.Cliente = require('../Models/Cliente.js')(sequelize, Sequelize);
db.Quarto = require('../Models/Quarto.js')(sequelize, Sequelize);
db.Reserva = require('../Models/Reserva.js')(sequelize, Sequelize);
*/


db.Quarto.belongsToOne(db.Tag, { through: db.ProjetoTag });
db.Tag.belongsToMany(db.Projeto, { through: db.ProjetoTag });
db.Projeto.belongsToMany(db.Usuario, { through: db.UsuarioProjeto });
db.Usuario.belongsToMany(db.Projeto, { through: db.UsuarioProjeto });
db.Conhecimento.belongsToMany(db.Usuario, { through: db.UsuarioConhecimento });
db.Usuario.belongsToMany(db.Conhecimento, { through: db.UsuarioConhecimento });

module.exports = db;

