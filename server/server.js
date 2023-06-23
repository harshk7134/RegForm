// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();
// const routes = require('./routes');

// app.use(express.json());


// const dbConnectionString = process.env.DB_CONNECTION_STRING;
// mongoose.connect(dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('MongoDB connection succeeded.');
//     app.listen(3300, () => console.log('Server started at port: 3300'));
//   })
//   .catch((err) => {
//     console.log('Error in DB connection:', err);
//   });
const express = require('express');
const bodyParser = require('body-parser');
const dataRoutes = require('./routes/data');

const app = express();
const PORT = 3300;

app.use(bodyParser.json());

app.use('/api', dataRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
