import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import registersRouter from './routes/registersRouter.js';
import authRouter from './routes/authRouter.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(authRouter);
app.use(registersRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));