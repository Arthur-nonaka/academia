import { Request, Response } from "express";
import subscriptionServices from "../Services/SubscriptionService";
import Subscription from "../Models/SubscriptionModel";
import personalServices from "../Services/PersonalServices";
import planServices from "../Services/PlanServices";
import studentServices from "../Services/StudentServices";

export async function getSubscriptions(req: Request, res: Response) {
  const { idAluno, idPlano, idPersonal } = req.query;

  try {
    let subscriptions;
    if (idAluno || idPlano || idPersonal) {
      subscriptions = await subscriptionServices.getFilteredSubscriptions({
        idAluno: idAluno as string,
        idPlano: idPlano as string,
        idPersonal: idPersonal as string,
      });
    } else {
      subscriptions = await subscriptionServices.getSubscriptions();
    }

    if (subscriptions) {
      res.status(200).json(subscriptions);
    } else {
      res.status(404).json({ message: "Nenhuma matricula encontrado" });
      return;
    }
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Erro ao buscar matriculas: " + err.message });
    return;
  }
}

export async function getSubscriptionById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const subscription = await subscriptionServices.getSubscriptionById(id);

    if (subscription) {
      res.status(200).json(subscription);
    } else {
      res.status(404).json({ message: "matricula não encontrada" });
      return;
    }
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Erro ao buscar matricula: " + err.message });
    return;
  }
}

export async function createSubscription(req: Request, res: Response) {
  const { status, idAluno, idPersonal, idPlano } = req.body;

  if (!status || !idAluno || !idPersonal || !idPlano) {
    res.status(400).json({ message: "Dados inválidos" });
    return;
  }

  const subscription = new Subscription(
    new Date().toISOString().split("T")[0],
    status,
    idAluno,
    idPersonal,
    idPlano
  );

  try {
    const alunoExists = await studentServices.getStudentById(idAluno);
    const personalExists = await personalServices.getPersonalById(idPersonal);
    const planoExists = await planServices.getPlanById(idPlano);

    if (
      alunoExists.length === 0 ||
      personalExists.length === 0 ||
      planoExists.length === 0
    ) {
      res.status(400).json({ message: "IDs inválidos" });
      return;
    }
  } catch (err: any) {
    res.status(500).json({ message: "Erro ao validar IDs: " + err.message });
    return;
  }

  try {
    await subscriptionServices.createSubscription(subscription);

    res.status(201).json({ message: "Mtricula cadastrada com sucesso" });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Erro ao cadastrar matricula: " + err.message });
  }
}

export async function updateSubscription(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status, idAluno, idPersonal, idPlano } = req.body;

    const result = await subscriptionServices.getSubscriptionById(id);

    if (!Array.isArray(result) || result.length === 0) {
      res.status(404).json({ message: "Matricula não encontrada" });
      return;
    }

    const existingSubscription = result[0];

    const subscription = new Subscription(
      existingSubscription.dataMatricula,
      status || existingSubscription.status,
      idAluno || existingSubscription.idAluno,
      idPersonal || existingSubscription.idPersonal,
      idPlano || existingSubscription.idPlano
    );

    try {
      const alunoExists = await studentServices.getStudentById(
        subscription.getIdAluno()
      );
      const personalExists = await personalServices.getPersonalById(
        subscription.getIdPersonal()
      );
      const planoExists = await planServices.getPlanById(
        subscription.getIdPlano()
      );

      if (!alunoExists || !personalExists || !planoExists) {
        res.status(400).json({ message: "IDs inválidos" });
        return;
      }
    } catch (err: any) {
      res.status(500).json({ message: "Erro ao validar IDs: " + err.message });
      return;
    }

    await subscriptionServices.updateSubscription(subscription, id);

    res.status(200).json({ message: "matricula atualizado com sucesso" });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar matricula: " + err.message });
  }
}
export async function deleteSubscription(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const result = await subscriptionServices.getSubscriptionById(id);

    if (!result) {
      res.status(404).json({ message: "Matricula não encontrado" });
      return;
    }

    await subscriptionServices.deleteSubscription(id);

    res.status(200).json({ message: "Matricula deletado com sucesso" });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Erro ao deletar matricula: " + err.message });
  }
}
