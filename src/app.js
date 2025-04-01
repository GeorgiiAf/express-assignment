import express from 'express';
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is working!');
});



import catRoutes from './api/routes/catRoutes.js';
import userRoutes from './api/routes/userRoutes.js';

app.use('/api/v1/cat', catRoutes);
app.use('/api/v1/user', userRoutes);

export default app