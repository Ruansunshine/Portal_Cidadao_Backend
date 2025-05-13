
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
function  validarCadastroUsuario(req: Request, res: Response, next: NextFunction): void {
  try{
  const { name, email, password, cpf, dateNascimento, phone } = req.body;
  console.log('Dados recebidos no cadastro:', {
    name,
    email,
    password,
    cpf,
    dateNascimento,
    phone
  }); 
  if (!name || !email || !password || !cpf || !dateNascimento || !phone) {
    res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    return;
  }
  next();
} catch (error) {
  console.error('Erro no middleware de validação de cadastro:', error);
  res.status(500).json({ error: 'Erro interno na validação dos dados do usuário.' });
}
}
7

function validarLoginUsers(req: Request, res: Response, next: NextFunction): void {
 try {
  const {cpf , password } = req.body;

  if(!cpf || !password ){
    res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    return;
  }
  next();
 } catch (error) {
  console.error('Erro no middleware de validação de cadastro:', error);
  res.status(500).json({ error: 'Erro interno na validação dos dados do usuário.' });
}
}



function buscarUsers(req: Request, res: Response, next: NextFunction): void {
  try {
    const {id} = req.params;
    if(!id){
      res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      return;
    }
    next();
  } catch (error) {
    console.error('Erro no middleware de validação de cadastro:', error);
  res.status(500).json({ error: 'Erro interno na validação(mid) dos dados do usuário.' });
  }
}

function atualizarUsuario(req: Request, res: Response, next: NextFunction): void {
try {
  //o id deve ser pego
  const {id, name, email, password, cpf, dateNascimento, phone } = req.body;
  if ((!(id || name || email || password || cpf || dateNascimento || phone)) ) {
    res.status(400).json({ error: 'Pelos menos um campo é obrigatorio' });
    return;
  }
  next();
} catch (error) {
  console.error('Erro no middleware de atualizção de cadastro:', error);
  res.status(500).json({ error: 'Erro interno na validação(mid) dos dados do usuário.' });
}
  }


  function validarToken(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers['authorization']?.split(' ')[1]; // 'Bearer <token>'
  
    if (!token) {
      res.status(401).json({ error: 'Token não fornecido.' });
      return;
    }
   
    try {
      const decoded = jwt.verify(token, 'secreta'); // Verifica o token
  
      (req as any).user = decoded;
  
      next(); 
    } catch (error) {
      res.status(401).json({ error: 'Token inválido ou expirado.' });
    }
  }


  
function deleteUsers(req: Request, res: Response, next: NextFunction): void {
    try {
      const { id } = (req as any).user;
      if (!id ) {
        res.status(400).json({ error: 'campo obrigatorio' });
        return;
      }
  next();
  } catch (error) {
    console.error('Erro no middleware de deleão do usuario:', error);
  res.status(500).json({ error: 'Erro interno na validação(mid) dos dados do usuário.' });
  }

}
  
export default {validarCadastroUsuario, validarLoginUsers, buscarUsers, atualizarUsuario, validarToken, deleteUsers};