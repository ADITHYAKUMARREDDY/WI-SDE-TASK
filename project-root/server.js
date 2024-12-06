const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes');
dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', routes);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
