const db = require('./Postgres.js');

async function initDB() {
  try {
    await db.sequelize.authenticate();
    console.log('Connected to database.');

    await db.sequelize.sync();
    console.log('\nDatabase synchronized. Tables created/updated.');

    const Cliente = await db.Cliente.create({
      nomeCliente: 'Test',
      senhaCliente: '123',
      emailCliente: 'test@email.com',
      admin:true,
    });
    console.log('\nTest cliente created:', Cliente.toJSON());
  } finally {
    await db.sequelize.close();
  }
}

initDB();