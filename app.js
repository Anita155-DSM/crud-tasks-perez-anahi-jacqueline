import express from 'express';
const app = express();

app.use(express.json());

// (Ruta base de prueba nomas)
app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});