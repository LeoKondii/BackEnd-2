module.exports = (sequelize, Sequelize) => {
  const Reserva = sequelize.define('reservas', {
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
    precoReserva: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    idCliente: {
        type: Sequelize.INTEGER,
        references: {
            model: 'clientes',
            key: 'idCliente'
        }
    },
    idQuarto: {
        type: Sequelize.INTEGER,
        references: {
            model: 'quartos',
            key: 'idQuarto'
        }
    }
  });
  return Reserva;
}