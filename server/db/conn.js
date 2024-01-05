const mongoose = require('mongoose');
const mongoURL = process.env.DATABASE;
mongoose
  .connect(mongoURL)
  .then(() => {
    console.log(
      `🚀🧑‍💻 ~ file: app.js:8 ~ mongoose.connect ~ ;:`,
      'Connected to Database'
    );
  })
  .catch((e) => {
    console.log('Database not connected');
  });
