require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  const User = mongoose.model('users', new mongoose.Schema({
    username: String, password: String, name: String
  }));

  const users = await User.find({});
  console.log('Utilizadores encontrados:', users.map(u => u.username));

  for (const user of users) {
    if (!user.password.startsWith('$2b$')) { // já tem hash?
      const hashed = await bcrypt.hash(user.password, 10);
      await User.updateOne({ _id: user._id }, { password: hashed });
      console.log(`Hash feito para: ${user.username}`);
    } else {
      console.log(`Já tem hash (ignorado): ${user.username}`);
    }
  }

  await mongoose.disconnect();
  console.log('Concluído.');
}

main().catch(console.error);
