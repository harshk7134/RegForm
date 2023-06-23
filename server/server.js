const express = require('express');
const bodyParser = require('body-parser');
const dataRoutes = require('./routes/data');
const cors = require('cors');

const app = express();
const PORT = 3300;

app.use(bodyParser.json());
app.use(cors());
app.use('/api', dataRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


