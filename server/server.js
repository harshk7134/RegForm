const express = require('express');
const bodyParser = require('body-parser');
const dataRoutes = require('./routes/data');
const cors = require('cors');

const app = express();
const PORT = 3300;

const showDataRouter = require('./routes/showData');
app.use('/', showDataRouter);

app.use(express.json());
app.use(cors());
app.use('/api', dataRoutes);

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


