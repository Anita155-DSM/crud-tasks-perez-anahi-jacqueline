import express from 'express';
import { sequelize } from './src/config/database.js';
import { User } from './src/models/user.models.js';
import { Task } from './src/models/task.models.js';
import userRoutes from './src/routes/user.router.js';
import taskRoutes from './src/routes/task.router.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ruta base
app.get('/', (req, res) => {
  res.send('API funcionando correctamente, con éxito!!');
});

// Usamos las rutas de usuarios y tareas
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Intentamos conectar a la base de datos, lo cual funciona correctamente
// y sincronizamos los modelos para crear las tablas si no existen
try {
  await sequelize.authenticate();
  console.log('Conexión a la base de datos establecida correctamente');

  // crea las tablas si no existen
  await sequelize.sync({ alter: true });
  console.log('Tablas sincronizadas correctamente');
} catch (error) {
  console.error('Error al conectar con la base de datos:', error);
}

// levantamos servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});