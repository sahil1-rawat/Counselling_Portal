const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config({ path: './.env' });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

require('./db/conn');

const corsOptions = {
  origin: 'http://localhost:3000',
  method: 'GET,POST,PUT,DELETE,PATCH,HEAD',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(require('./router/route'));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(
    `🚀🧑‍💻 ~ file: app.js:22 ~ app.listen ~ app: app is running at ${port} port`
  );
});
