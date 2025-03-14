import connection from "../db";

export async function getStudents() {
  const sql = "SELECT * FROM aluno";
  try {
    const [rows] = await connection.query(sql);
    return rows;
  } catch (err) {
    return {error : err.message};
  }
}

export async function getStudentByID(id: string) {
  const sql = "SELECT * FROM alundo WHERE id = ?";
  try {
    const [rows] = await connection.query(sql, [id]);
    return rows;
  }   
  catch(err) {
    return {error : err.message};
  }
}

export async function createStudent(
  nome: string,
  dataNascimento: Date,
  cpf: string,
  email: string,
  telefone: string,
  endereco: string,
  dataCadastro: Date
) {
  const sql =
    "INSERT INTO aluno (nome, data_nascimento, cpf, email, telefone, endereco, data_cadastro) VALUES (?, ?, ?, ?, ?, ?, ?)";
  try {
    const [rows] = await connection.query(sql, [
      nome,
      dataNascimento,
      cpf,
      email,
      telefone,
      endereco,
      dataCadastro,
    ]);
    return { rows: rows };
  } catch (err: any) {
    return {error : err.message};
  }
}
export async function updateStudent() {}
export async function deleteStudent() {}

export default {
  getStudents,
  getStudentByID,
  createStudent,
  updateStudent,
  deleteStudent,
};
