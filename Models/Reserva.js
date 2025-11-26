module.exports = (sequelize, Sequelize) => {
  const Reserva = sequelize.define('reserva', {
    idReserva: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    dataReserva: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    preçoReserva: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    idCliente: {
        type: Sequelize.INTEGER,
        references: {
            model: 'cliente',
            key: 'idCliente'
        }
    },
    idQuarto: {
        type: Sequelize.INTEGER,
        references: {
            model: 'quarto',
            key: 'idQuarto'
        }
    }
  });
  return Reserva;
}