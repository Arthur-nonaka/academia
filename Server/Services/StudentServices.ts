import { RowDataPacket } from "mysql2";
import connection from "../db";
import Student from "../Models/StudentModel";

function mapRowToStudent(row: RowDataPacket): Student {
  return {
    id: row.id_aluno,
    nome: row.nome,
    dataNascimento: new Date(row.data_nascimento),
    cpf: row.cpf,
    email: row.email,
    telefone: row.telefone,
    endereco: row.endereco,
    dataCadastro: new Date(row.data_cadastro),
  } as Student;
}

export async function getStudents(): Promise<Student[]> {
  const sql = "SELECT * FROM aluno";
  try {
    const [rows] = await connection.query<RowDataPacket[]>(sql);
    return rows.map(mapRowToStudent);
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function getStudentById(id: string): Promise<Student[]> {
  const sql = "SELECT * FROM aluno WHERE id_aluno = ?";
  try {
    const [rows] = await connection.query<RowDataPacket[]>(sql, [id]);
    return rows.map(mapRowToStudent);
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function createStudent(student: Student) {
  const sql =
    "INSERT INTO aluno (nome, data_nascimento, cpf, email, telefone, endereco, data_cadastro) VALUES (?, ?, ?, ?, ?, ?, ?)";
  try {
    const {
      nome,
      dataNascimento,
      cpf,
      email,
      telefone,
      endereco,
      dataCadastro,
    } = student;
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
    throw new Error(err.message);
  }
}
export async function updateStudent(student: Student, id: string) {
  const sql =
    "UPDATE aluno SET nome = ?, data_nascimento = ?, cpf = ?, email = ?, telefone = ?, endereco = ?, data_cadastro = ? WHERE id_aluno = ?";
  try {
    const {
      nome,
      dataNascimento,
      cpf,
      email,
      telefone,
      endereco,
      dataCadastro,
    } = student;
    const res = await connection.query(sql, [
      nome,
      dataNascimento,
      cpf,
      email,
      telefone,
      endereco,
      dataCadastro,
      id,
    ]);
    return { res: res };
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function deleteStudent(id: string) {
  const sql = "DELETE FROM aluno WHERE id_aluno = ?";
  try {
    const res = await connection.query(sql, [id]);
    return { res: res };
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export default {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
