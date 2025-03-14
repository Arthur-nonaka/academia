import connection from "../db";

export async function getStudents() {
  try {
    const [rows] = await connection.query("SELECT * FROM aluno");
    return rows;
  } catch (err) {
    return false;
  }
}

export async function getStudentByID() {}

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
