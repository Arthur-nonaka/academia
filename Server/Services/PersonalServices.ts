import { RowDataPacket } from "mysql2";
import connection from "../db";
import Personal from "../Models/PersonalModel";

function mapRowToPersonal(row: RowDataPacket): Personal {
  return {
    id: row.id_professor,
    nome: row.nome,
    dataNascimento: new Date(row.data_nascimento),
    cpf: row.cpf,
    email: row.email,
    telefone: row.telefone,
    dataAdmissao: new Date(row.data_admissao),
  } as Personal;
}

export async function getPersonals(): Promise<Personal[]> {
  const sql = "SELECT * FROM professor";
  try {
    const [rows] = await connection.query<RowDataPacket[]>(sql);
    return rows.map(mapRowToPersonal);
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function getPersonalById(id: string): Promise<Personal[]> {
  const sql = "SELECT * FROM professor WHERE id_professor = ?";
  try {
    const [rows] = await connection.query<RowDataPacket[]>(sql, [id]);
    return rows.map(mapRowToPersonal);
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function createPersonal(Personal: Personal) {
  const sql =
    "INSERT INTO professor (nome, data_nascimento, cpf, email, telefone, data_admissao) VALUES (?, ?, ?, ?, ?, ?)";
  try {
    const {
      nome,
      dataNascimento,
      cpf,
      email,
      telefone,
      dataAdmissao,
    } = Personal;
    const [rows] = await connection.query(sql, [
      nome,
      dataNascimento,
      cpf,
      email,
      telefone,
      dataAdmissao,
    ]);
    return { rows: rows };
  } catch (err: any) {
    throw new Error(err.message);
  }
}
export async function updatePersonal(Personal: Personal, id: string) {
  const sql =
    "UPDATE professor SET nome = ?, data_nascimento = ?, cpf = ?, email = ?, telefone = ?, data_admissao = ? WHERE id_professor = ?";
  try {
    const {
      nome,
      dataNascimento,
      cpf,
      email,
      telefone,
      dataAdmissao,
    } = Personal;
    const res = await connection.query(sql, [
      nome,
      dataNascimento,
      cpf,
      email,
      telefone,
      dataAdmissao,
      id,
    ]);
    return { res: res };
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function deletePersonal(id: string) {
  const sql = "DELETE FROM professor WHERE id_professor = ?";
  try {
    const res = await connection.query(sql, [id]);
    return { res: res };
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export default {
  getPersonals,
  getPersonalById,
  createPersonal,
  updatePersonal,
  deletePersonal,
};
