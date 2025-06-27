import { Request, Response } from "express";
import planServices from "../Services/PlanServices";
import Plan from "../Models/PlanModel";

export async function getPlans(req: Request, res: Response) {
  const { nome, descricao, valor, duracao } = req.query;

  try {
    let plans;
    if (nome || descricao || valor || duracao) {
      plans = await planServices.getFilteredPlans({
        nome: nome as string,
        descricao: descricao as string,
        valor: valor as string,
        duracao: duracao as string,
      });
    } else {
      plans = await planServices.getPlans();
    }

    if (plans) {
      res.status(200).json(plans);
    } else {
      res.status(404).json({ message: "Nenhum Plano encontrado" });
      return;
    }
  } catch (err: any) {
    res.status(500).json({ message: "Erro ao buscar Planos: " + err.message });
    return;
  }
}

export async function getPlanById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const plan = await planServices.getPlanById(id);

    if (plan) {
      res.status(200).json(plan);
    } else {
      res.status(404).json({ message: "Plano não encontrado" });
      return;
    }
  } catch (err: any) {
    res.status(500).json({ message: "Erro ao buscar Plano: " + err.message });
    return;
  }
}

export async function createPlan(req: Request, res: Response) {
  const { nome, descricao, valor, duracao } = req.body;

  if (!nome || !descricao || !valor || !duracao) {
    res.status(400).json({ message: "Dados inválidos" });
    return;
  }

  const plan = new Plan(nome, descricao, valor, duracao);

  try {
    await planServices.createPlan(plan);

    res.status(201).json({ message: "Plano cadastrado com sucesso" });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Erro ao cadastrar Plano: " + err.message });
  }
}

export async function updatePlan(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { nome, descricao, valor, duracao } = req.body;

    const result = await planServices.getPlanById(id);

    if (!Array.isArray(result) || result.length === 0) {
      res.status(404).json({ message: "Plano não encontrado" });
      return;
    }

    const existingPlan = result[0];

    const plan = new Plan(
      nome || existingPlan.nome,
      descricao || existingPlan.descricao,
      valor || existingPlan.valor,
      duracao || existingPlan.duracao
    );

    await planServices.updatePlan(plan, id);

    res.status(200).json({ message: "Plano atualizado com sucesso" });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar Plano: " + err.message });
  }
}
export async function deletePlan(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const result = await planServices.getPlanById(id);

    if (!result) {
      res.status(404).json({ message: "Plano não encontrado" });
      return;
    }

    await planServices.deletePlan(id);

    res.status(200).json({ message: "Plano deletado com sucesso" });
  } catch (err: any) {
    res.status(500).json({ message: "Erro ao deletar Plano: " + err.message });
  }
}
