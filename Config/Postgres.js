const Sequelize = require('sequelize');
const sequelize = new Sequelize('prova', 'postgres', '123', {host: 'localhost',dialect: 'postgres'});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.Cliente = require('../Models/Cliente.js')(sequelize, Sequelize);
db.Quarto = require('../Models/Quarto.js')(sequelize, Sequelize);
db.Reserva = require('../Models/Reserva.js')(sequelize, Sequelize);

db.Cliente.belongsToMany(db.Quarto, { through: db.Reserva });
db.Quarto.belongsToMany(db.Cliente, { through: db.Reserva });

module.exports = db;

