import { RowDataPacket } from "mysql2";
import connection from "../db";
import Student from "../Models/StudentModel";

function mapRowToStudent(row: RowDataPacket): Student {
  return {
    id: row.id_aluno,
    nome: row.nome,
    dataNascimento: row.data_nascimento,
    cpf: row.cpf,
    email: row.email,
    telefone: row.telefone,
    endereco: row.endereco,
    dataCadastro: row.data_cadastro,
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

export async function getFilteredStudents({
  nome,
  dataNascimento,
  cpf,
  email,
  telefone,
}: {
  nome?: string;
  dataNascimento?: string;
  cpf?: string;
  email?: string;
  telefone?: string;
}) {
  let sql = "SELECT * FROM aluno WHERE 1=1";
  const params: string[] = [];
  if (nome) {
    sql += " AND nome LIKE ?";
    params.push(`%${nome}%`);
  }
  if (dataNascimento) {
    sql += " AND data_nascimento = ?";
    params.push(dataNascimento);
  }
  if (cpf) {
    sql += " AND cpf = ?";
    params.push(`%${cpf}%`);
  }
  if (email) {
    sql += " AND email = ?";
    params.push(`%${email}%`);
  }
  if (telefone) {
    sql += " AND telefone = ?";
    params.push(`%${telefone}%`);
  }

  try {
    const [rows] = await connection.query<RowDataPacket[]>(sql, [
      nome,
      dataNascimento,
      cpf,
      email,
      telefone,
    ]);
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
  getFilteredStudents,
};
