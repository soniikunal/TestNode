import express, { json } from 'express';
import dotenv from 'dotenv'
const app = express();
const port = process.env.PORT || 3000;

app.use(json())
dotenv.config();

import { authRoutes } from './Routes/auth.js';
import { teamRoutes } from './Routes/Admin/Team.js';

import './DB/connection.js';

app.use('/auth', authRoutes)
app.use('/admin', teamRoutes)



app.get('/', (req, res) => {
    res.send('Welcome to Express Server');
});

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});