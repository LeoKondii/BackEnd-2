module.exports = (sequelize, Sequelize) => {
  const Cliente = sequelize.define('clientes', {
    idCliente: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nomeCliente: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    senhaCliente: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    emailCliente: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
  });
  return Cliente;
}