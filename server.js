const express = require('express');
require('dotenv').config();
require('./config/mongoose');
const cors = require('cors')
const userRoutes = require('./routes/userRoutes');
const issueRoutes = require('./routes/issueRoutes');
const projectRoutes = require('./routes/projectRoutes');


const app = express();

const PORT = process.env.PORT || 5000;


app.use(cors())
app.use(express.json());
app.use('/api',userRoutes);
app.use('/api',issueRoutes);
app.use('/api', projectRoutes);

app.get('/', (req, res) => {
    res.send('Issue tracker api');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });