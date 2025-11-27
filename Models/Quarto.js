module.exports = (sequelize, Sequelize) => {
  const Quarto = sequelize.define('quarto', {
    idQuarto: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    numeroQuarto: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tipoQuarto: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    precoQuarto: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    vaga: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
  });
  return Quarto;
}