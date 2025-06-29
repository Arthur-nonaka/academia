import { Request, Response } from "express";
import personalServices from "../Services/PersonalServices";
import Personal from "../Models/PersonalModel";

export async function getPersonals(req: Request, res: Response) {
  const { nome, dataNascimento, cpf, email, telefone } = req.query;

  try {
    let personals;
    if (nome || dataNascimento || cpf || email || telefone) {
      personals = await personalServices.getFilteredPersonals({
        nome: nome as string,
        dataNascimento: dataNascimento as string,
        cpf: cpf as string,
        email: email as string,
        telefone: telefone as string,
      });
    } else {
      personals = await personalServices.getPersonals();
    }

    const formatted = personals.map((student) => ({
      ...student,
      dataNascimento: new Date(student.dataNascimento)
        .toISOString()
        .split("T")[0],
      dataAdmissao: new Date(student.dataAdmissao).toISOString().split("T")[0],
    }));

    if (formatted) {
      res.status(200).json(formatted);
    } else {
      res.status(404).json({ message: "Nenhum personal encontrado" });
      return;
    }
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Erro ao buscar personals: " + err.message });
    return;
  }
}

export async function getPersonalById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const personal = await personalServices.getPersonalById(id);

    personal[0].dataNascimento = new Date(personal[0].dataNascimento)
      .toISOString()
      .split("T")[0];
    personal[0].dataAdmissao = new Date(personal[0].dataAdmissao)
      .toISOString()
      .split("T")[0];

    if (personal) {
      res.status(200).json(personal);
    } else {
      res.status(404).json({ message: "personal não encontrado" });
      return;
    }
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Erro ao buscar personal: " + err.message });
    return;
  }
}

export async function createPersonal(req: Request, res: Response) {
  const { nome, dataNascimento, cpf, email, telefone } = req.body;

  if (!nome || !dataNascimento || !cpf || !email || !telefone) {
    res.status(400).json({ message: "Dados inválidos" });
    return;
  }

  const personal = new Personal(
    nome,
    dataNascimento,
    cpf,
    email,
    telefone,
    new Date().toISOString().split("T")[0]
  );

  try {
    await personalServices.createPersonal(personal);

    res.status(201).json({ message: "personal cadastrado com sucesso" });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Erro ao cadastrar personal: " + err.message });
  }
}

export async function updatePersonal(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { nome, dataNascimento, cpf, email, telefone } = req.body;

    const result = await personalServices.getPersonalById(id);

    if (!Array.isArray(result) || result.length === 0) {
      res.status(404).json({ message: "personal não encontrado" });
      return;
    }

    const existingPersonal = result[0];

    const personal = new Personal(
      nome || existingPersonal.nome,
      dataNascimento || existingPersonal.dataNascimento,
      cpf || existingPersonal.cpf,
      email || existingPersonal.email,
      telefone || existingPersonal.telefone,
      existingPersonal.dataAdmissao
    );

    await personalServices.updatePersonal(personal, id);

    res.status(200).json({ message: "personal atualizado com sucesso" });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar personal: " + err.message });
  }
}
export async function deletePersonal(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const result = await personalServices.getPersonalById(id);

    if (!result) {
      res.status(404).json({ message: "personal não encontrado" });
      return;
    }

    await personalServices.deletePersonal(id);

    res.status(200).json({ message: "personal deletado com sucesso" });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Erro ao deletar personal: " + err.message });
  }
}
