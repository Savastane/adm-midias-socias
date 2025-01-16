const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Importar rotas
const postsRouter = require('./api/posts');
const authRouter = require('./api/auth');

// Middleware to parse JSON
app.use(express.json());

// Configurar CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Rotas da API
app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);

// Basic route to test server
app.get('/', (req, res) => {
  res.send('Social Media Manager API');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
