require('dotenv').config();
const mongoose = require('mongoose');

async function migrate() {
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection.db;

  const pubResult = await db.collection('publications').updateMany(
    { tittle: { $exists: true } },
    [{ $set: { title: '$tittle' } }, { $unset: 'tittle' }]
  );
  console.log(`Publications migradas: ${pubResult.modifiedCount}`);

  const actResult = await db.collection('activities').updateMany(
    { tittle: { $exists: true } },
    [{ $set: { title: '$tittle' } }, { $unset: 'tittle' }]
  );
  console.log(`Activities migradas: ${actResult.modifiedCount}`);

  const mediaResult = await db.collection('multimedias').updateMany(
    { tittle: { $exists: true } },
    [{ $set: { title: '$tittle' } }, { $unset: 'tittle' }]
  );
  console.log(`Multimedia migrados: ${mediaResult.modifiedCount}`);

  const aboutResult = await db.collection('about_us').updateMany(
    { adress: { $exists: true } },
    [{ $set: { address: '$adress' } }, { $unset: 'adress' }]
  );
  console.log(`About_us migrados: ${aboutResult.modifiedCount}`);

  await mongoose.disconnect();
  console.log('Migração concluída.');
}

migrate().catch(console.error);
