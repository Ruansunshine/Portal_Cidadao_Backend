import { Router } from 'express';
import controller from '../controllers/schedulingController';
import validation from '../middlewares/validateSchedulingData';

const router = Router();

// Rota para criar um novo agendamento
router.post('/criar', validation.validarCriarAgendamento, controller.criarAgendamento);

// Rota para buscar um agendamento por ID
router.get('/buscar/:id', validation.validarBuscarOuDeletarPorId, controller.buscarAgendamento);

// Rota para atualizar um agendamento
router.put('/atualizar/:id', validation.validarAtualizarAgendamento, controller.atualizarAgendamento);

// Rota para deletar um agendamento
router.delete('/deletar/:id', validation.validarBuscarOuDeletarPorId, controller.deletarAgendamento);

export default router;