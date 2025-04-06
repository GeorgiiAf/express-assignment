import express from 'express';
import cors from 'cors';
import api from './api/index.js';
import errorHandler from './middlewares/error-handler.js';
import notFoundHandler from './middlewares/error-handler.js';



const app = express();


const corsOptions = {
  origin: ['http://127.0.0.1:5500', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(notFoundHandler);
app.use(errorHandler);


app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to my REST API');
});

app.use('/api/v1', api);
app.use(errorHandler);

export default app;