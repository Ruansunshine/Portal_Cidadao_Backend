import { Request, Response } from 'express';
import Users from '../models/users';
import jwt from 'jsonwebtoken';

 async function cadastrarUsuario(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, password, cpf, dateNascimento, phone } = req.body;

    const usuario = new Users(0, name, email, password, cpf, dateNascimento, phone);
    const usuarioCriado = await usuario.createUsers(name, email, password, cpf, dateNascimento, phone);

    res.status(201).json({
      message: 'Usuário criado com sucesso.',
      usuario: usuarioCriado,
    });

  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({
      error: 'Erro interno ao criar usuário.',
      detalhes: (error as Error).message
    });
  }
}

async function loginUsuario(req: Request, res: Response): Promise<void> {
    try {
        const {cpf, password} = req.body;

        const loginUsuario = await Users.login(cpf, password);
         if(loginUsuario.error){
           res.status(400).json({
          error:loginUsuario.error,  
          });
          return
         }
         //gerar o token: 
         const token = jwt.sign(
          { id: loginUsuario.id, name: loginUsuario.name, email: loginUsuario.email },
          'secreta',
          {
            expiresIn: '1h', 
          }
        );
        res.status(201).json({
            message: 'Usuário logado com sucesso', 
            Users: loginUsuario, 
            token,  
          });
    }  catch (error) {
        console.error('Usuario não existe:', error);
        res.status(500).json({
          error: 'Erro interno ao criar usuário.',
          detalhes: (error as Error).message
        });
      }
}

async function buscarUsuario(req: Request, res: Response): Promise<void> {
  try {
    const {id} = req.body;
   const buscar =  await Users.readUser(id);
   if(buscar.error){
    res.status(400).json({
      error:buscar.error,  
      });
      return
   }
   res.status(200).json({
    message: 'Usuário encontrado com sucesso', 
    Users: buscar,
  });
  } catch (error) {
    console.error('Usuario não existe:', error);
    res.status(500).json({
      error: 'Erro interno ao encontrar  usuário.(controller',
      detalhes: (error as Error).message
    });
  }
}

async function atualizarUsuario(req: Request, res: Response): Promise<void> {
  try {
    const { id } = (req as any).user;
    const { name, email, password, cpf, dateNascimento, phone } = req.body;
    const atualizar =  await Users.updateUser(id, name, email, cpf, dateNascimento, phone);
    if(atualizar.error){
      res.status(400).json({ error: atualizar.error });
    }else{
      res.status(200).json({ message: atualizar.message });
    }
      } catch (error) {
        console.error('Erro no controller de atualização:', error);
        res.status(500).json({ error: 'Erro interno ao atualizar o usuário.' });
  }
}

async function deletarUsuario(req: Request, res: Response): Promise<void> {
  try {
    const { id } = (req as any).user; // ID vindo do token decodificado

    const deletar = await Users.deleteUser(id);

    if (deletar.error) {
      res.status(404).json({ error: deletar.error });
    } else {
      res.status(200).json({ message: deletar.message });
    }
  } catch (error) {
    console.error('Erro no controller ao deletar usuário:', error);
    res.status(500).json({ error: 'Erro interno ao deletar o usuário.' });
  }
}


export default {cadastrarUsuario, loginUsuario, buscarUsuario,atualizarUsuario, deletarUsuario};