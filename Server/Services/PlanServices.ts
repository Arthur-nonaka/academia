import { RowDataPacket } from "mysql2";
import connection from "../db";
import Plan from "../Models/PlanModel";

// function mapRowToPlan(row: RowDataPacket): Plan {
//   return {
//     id: row.id_plano,
//     nome: row.nome,
//     descricao: row.descricao,
//     valor: row.valor,
//     duracao: row.duracao,
//   } as Plan;
// }

export async function getPlans(): Promise<Plan[]> {
  const sql = "SELECT * FROM plano";
  try {
    const [rows] = await connection.query<RowDataPacket[]>(sql);
    return rows as Plan[];
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function getFilteredPlans({
  nome,
  descricao,
  valor,
  duracao,
}: {
  nome?: string;
  descricao?: string;
  valor?: string;
  duracao?: string;
}) {
  let sql = "SELECT * FROM plano WHERE 1=1";
  const params: string[] = [];
  if (nome) {
    sql += " AND nome LIKE ?";
    params.push(`%${nome}%`);
  }
  if (descricao) {
    sql += " AND descricao LIKE ?";
    params.push(`%${descricao}%`);
  }
  if (valor) {
    sql += " AND valor = ?";
    params.push(valor);
  }
  if (duracao) {
    sql += " AND duracao = ?";
    params.push(duracao);
  }

  try {
    const [rows] = await connection.query<RowDataPacket[]>(sql, params);
    return rows as Plan[];
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function getPlanById(id: string): Promise<Plan[]> {
  const sql = "SELECT * FROM plano WHERE id_plano = ?";
  try {
    const [rows] = await connection.query<RowDataPacket[]>(sql, [id]);
    return rows as Plan[];
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function createPlan(Plan: Plan) {
  const sql =
    "INSERT INTO plano (nome, descricao, valor, duracao) VALUES (?, ?, ?, ?)";
  try {
    const { nome, descricao, valor, duracao } = Plan;
    const [rows] = await connection.query(sql, [
      nome,
      descricao,
      valor,
      duracao,
    ]);
    return { rows: rows };
  } catch (err: any) {
    throw new Error(err.message);
  }
}
export async function updatePlan(Plan: Plan, id: string) {
  const sql =
    "UPDATE plano SET nome = ?, descricao = ?, valor = ?, duracao = ? WHERE id_plano = ?";
  try {
    const { nome, descricao, valor, duracao } = Plan;
    const res = await connection.query(sql, [
      nome,
      descricao,
      valor,
      duracao,
      id,
    ]);
    return { res: res };
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function deletePlan(id: string) {
  const sql = "DELETE FROM plano WHERE id_plano = ?";
  try {
    const res = await connection.query(sql, [id]);
    return { res: res };
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export default {
  getPlans,
  getFilteredPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan,
};
