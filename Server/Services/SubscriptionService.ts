import { RowDataPacket } from "mysql2";
import connection from "../db";
import Subscription from "../Models/SubscriptionModel";

function mapRowToSubscription(row: RowDataPacket): Subscription {
  return {
    id: row.id_matricula,
    dataMatricula: row.data_matricula,
    status: row.status,
    idAluno: row.id_aluno,
    idPersonal: row.id_professor,
    idPlano: row.id_plano,
  } as Subscription;
}

export async function getSubscriptions(): Promise<Subscription[]> {
  const sql = "SELECT * FROM matricula";
  try {
    const [rows] = await connection.query<RowDataPacket[]>(sql);
    return rows.map(mapRowToSubscription);
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function getFilteredSubscriptions({
  idAluno,
  idPersonal,
  idPlano,
}: {
  idAluno?: string;
  idPersonal?: string;
  idPlano?: string;
}) {
  let sql = "SELECT * FROM matricula WHERE 1=1";
  const params: string[] = [];
  if (idAluno) {
    sql += " AND id_aluno = ?";
    params.push(idAluno);
  }
  if (idPlano) {
    sql += " AND id_plano = ?";
    params.push(idPlano);
  }
  if (idPersonal) {
    sql += " AND id_professor = ?";
    params.push(idPersonal);
  }

  try {
    const [rows] = await connection.query<RowDataPacket[]>(sql, params);
    return rows.map(mapRowToSubscription);
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function getSubscriptionById(id: string): Promise<Subscription[]> {
  const sql = "SELECT * FROM matricula WHERE id_matricula = ?";
  try {
    const [rows] = await connection.query<RowDataPacket[]>(sql, [id]);
    return rows.map(mapRowToSubscription);
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function createSubscription(Subscription: Subscription) {
  const sql =
    "INSERT INTO matricula (data_matricula, status, id_aluno, id_professor, id_plano) VALUES (?, ?, ?, ?, ?)";
  try {
    const { dataMatricula, status, idAluno, idPersonal, idPlano } =
      Subscription;
    const [rows] = await connection.query(sql, [
      dataMatricula,
      status,
      idAluno,
      idPersonal,
      idPlano,
    ]);
    return { rows: rows };
  } catch (err: any) {
    throw new Error(err.message);
  }
}
export async function updateSubscription(
  Subscription: Subscription,
  id: string
) {
  const sql =
    "UPDATE matricula SET data_matricula = ?, status = ?, id_aluno = ?, id_professor = ?, id_plano = ? WHERE id_matricula = ?";
  try {
    const { dataMatricula, status, idAluno, idPersonal, idPlano } =
      Subscription;
    const res = await connection.query(sql, [
      dataMatricula,
      status,
      idAluno,
      idPersonal,
      idPlano,
      id,
    ]);
    return { res: res };
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function deleteSubscription(id: string) {
  const sql = "DELETE FROM matricula WHERE id_matricula = ?";
  try {
    const res = await connection.query(sql, [id]);
    return { res: res };
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export default {
  getSubscriptions,
  getFilteredSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  deleteSubscription,
};
