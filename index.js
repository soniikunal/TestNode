import express, { json } from 'express';
import dotenv from 'dotenv'
const app = express();
const port = process.env.PORT || 3000;

app.use(json())
dotenv.config();

import './DB/connection.js';

import { authRoutes } from './Routes/auth.js';
import { teamRoutes } from './Routes/Admin/Team.js';
import { articleRoutes } from './Routes/Admin/Question/ArticleRoutes.js';
import { questionRoutes } from './Routes/Admin/Question/QuestionRoutes.js';

app.use('/auth', authRoutes)
app.use('/admin', teamRoutes)
app.use('/admin', articleRoutes)
app.use('/admin', questionRoutes)



app.get('/', (req, res) => {
    res.send('Welcome to Express Server');
});

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});