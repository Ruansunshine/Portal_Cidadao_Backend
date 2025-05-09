import express from 'express';
import cors from 'cors';
import './config/database';
import router from './routes/users.routes';
import localizacao from './routes/unidades-proximas'
const app = express();
const PORT = 3000;

app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:5500', 'http://127.0.0.1:5500']  // Permitir requisições de http://localhost:3001
}));

app.use(express.json());

app.use('/router', router);
app.use('/router', router);
app.use('/router', router);
app.use('/router', router);
app.use('/api/unidades', localizacao);
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
