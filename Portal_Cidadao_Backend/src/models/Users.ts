import conexao from "../config/database";
class Users{
  private id:number;
  private name: string; 
  private email: string;
  private password: string;
  private cpf: string;
  private dateNascimento: string ; 
  private phone: string;

constructor(id:number, name: string, email:string, password:string, cpf: string, dateNascimento:string, phone:string){
  this.id= id;
  this.name = name;
  this.email = email;
  this.password = password;
  this.cpf = cpf;
  this.dateNascimento = dateNascimento;
  this.phone = phone;
}
//create: Insert into NOME DA TABELA values ();
public  async createUsers(name: string,  email:string, password:string, cpf:string, dateNascimento: string, phone: string):Promise<Users>{
try {
const sql = `INSERT INTO users (name, email, password, cpf, date, phone) VALUES (?, ?, ?, ?, ?, ?)`;
const valores  = [name, email, password, cpf, dateNascimento, phone];
const [resultado]: any = await conexao.execute(sql, valores); // <- aqui está corrigido
const insertId = resultado.insertId;;
if (insertId) {
  return new Users(insertId, name, email, password, cpf, dateNascimento, phone);
} else {
  throw new Error('Não foi possível obter o ID do usuário inserido.');
}
} catch (error) {
console.error('Erro ao inserir usuário:', error);
throw error;
}
}

// Fazer login: Verificar se o email e a senha estão corretos
public static async login(cpf: string, password: string): Promise<any> {
  try {
    console.log(cpf, password);
    const sql = `SELECT * FROM users WHERE cpf = ? AND password = ?`;

    const [rows]: any = await conexao.execute(sql, [cpf, password]);
    if (rows.length > 0) {
      const user = rows[0];
      // Retorna os dados do usuário se o login for bem-sucedido
      return {
        id: user.users_id,
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        dateNascimento: user.date,
        phone: user.phone
      };
    } else {
   
      return { error: 'Usuário ou senha incorretos.' };
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
  
    return { error: 'Erro interno ao processar o login.' };
  }
}
//buscar usuario por id
public static async readUser(id: number): Promise<any> {
  try {
    const sql = `SELECT * FROM users WHERE users_id = ?`;
    const [rows]: any = await conexao.execute(sql, [id]);
    if (rows.length > 0) {
      return rows[0];
    } else {
      return { error: 'Usuário não encontrado.' };
    }
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return { error: 'Erro interno ao buscar o usuário.' };
  }
}

// Atualizar usuário
public static async updateUser(
  id: number,
  name?: string,
  email?: string,
  cpf?: string,
  dateNascimento?: string,
  phone?: string
): Promise<any> {
  try {
    
    const fieldsToUpdate: string[] = []; //campos para atualiza
    const values: any[] = []; // valores
    if (name) {
      fieldsToUpdate.push('name = ?');
      values.push(name);
    }
    if (email) {
      fieldsToUpdate.push('email = ?');
      values.push(email);
    }
    if (cpf) {
      fieldsToUpdate.push('cpf = ?');
      values.push(cpf);
    }
    if (dateNascimento) {
      fieldsToUpdate.push('date = ?');
      values.push(dateNascimento);
    }
    if (phone) {
      fieldsToUpdate.push('phone = ?');
      values.push(phone);
    }
    if (fieldsToUpdate.length === 0) {
      return { error: 'Nenhum campo fornecido para atualização.' };
    }
    
    values.push(id);
    const sql = `UPDATE users SET ${fieldsToUpdate.join(', ')} WHERE users_id = ?`;
    const [resultado]: any = await conexao.execute(sql, values);
    if (resultado.affectedRows > 0) {
      return { message: 'Usuário atualizado com sucesso.' };
    } else {
      return { error: 'Usuário não encontrado.' };
    }
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return { error: 'Erro interno ao atualizar o usuário.' };
  }
}


// Deletar usuário
public static async deleteUser(id: number): Promise<any> {
  try {
    const sql = `DELETE FROM users WHERE users_id = ?`;
    const [resultado]: any = await conexao.execute(sql, [id]);
    if (resultado.affectedRows > 0) {
      return { message: 'Usuário excluído com sucesso.' };
    } else {
      return { error: 'Usuário não encontrado.' };
    }
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    return { error: 'Erro interno ao deletar o usuário.' };
  }
}
}

export default Users;