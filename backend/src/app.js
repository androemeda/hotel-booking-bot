const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');
const sequelize = require('./config/database');

const app = express();
require('dotenv').config();
app.use(cors());
app.use(express.json());

app.use('/api', chatRoutes);

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await sequelize.sync();
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();