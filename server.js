const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false,
  })
  .then(() => {
    console.log('Database Connection Succesfull ✨✨');
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at port ${port} 🔊`);
});
