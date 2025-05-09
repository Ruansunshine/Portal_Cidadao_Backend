import { Router } from 'express';
import controller from '../controllers/usersController';
import validation from '../middlewares/validateUsersData';
const router = Router();

// Rota para cadastrar um novo usuário
router.post('/cadastro', validation.validarCadastroUsuario, controller.cadastrarUsuario);
router.post('/login', validation.validarLoginUsers, controller.loginUsuario);
router.get('/buscar', validation.buscarUsers, controller.buscarUsuario);
router.put('/atualizar', validation.validarToken, validation.atualizarUsuario, controller.atualizarUsuario);
router.delete('/deletar', validation.validarToken, validation.deleteUsers , controller.deletarUsuario);

export default router;