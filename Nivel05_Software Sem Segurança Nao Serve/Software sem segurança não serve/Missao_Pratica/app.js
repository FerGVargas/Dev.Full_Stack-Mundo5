const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Importando as rotas
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const contractRoutes = require('./routes/contractRoutes');

// Configuração do bodyParser para trabalhar com JSON
app.use(bodyParser.json());

// Usando as rotas importadas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contracts', contractRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
