const db = require('../Config/Db');

async function initDB() {
  try {
    await db.sequelize.authenticate();
    console.log('Connected to database.');

    await db.sequelize.sync();
    console.log('\nDatabase synchronized. Tables created/updated.');


    //const hashedPassword = await bcrypt.hash('123', saltRounds);

    const Usuario = await db.Usuario.create({
      nome: 'Test',
      senha: '123',
      email: 'test@email.com',
      tipoCliente: true
    });
    console.log('\nTest user created:', Usuario.toJSON());
    } finally {
    await db.sequelize.close();
    }
}
initDB();