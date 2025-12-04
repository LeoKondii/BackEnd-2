module.exports = (sequelize, Sequelize) => {
  const Cliente = sequelize.define('cliente', {
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
    tipoCliente: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
  });
  return Cliente;
}