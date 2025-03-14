import { Request, Response } from "express";
import studentServices from "../Services/StudentServices";

export async function getStudents(req: Request, res: Response) {
  try {
    const students = await studentServices.getStudents();
    if (students) {
      res.json(students);
    } else {
      res.status(404).json({ message: "Nenhum aluno encontrado" });
      return;
    }
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar alunos" });
    return;
  }
}

export async function getStudentById() {}
export async function createStudent(req: Request, res: Response) {
  const { nome, dataNascimento, cpf, email, telefone, endereco, dataCadastro } =
    req.body;

  if (
    !nome ||
    !dataNascimento ||
    !cpf ||
    !email ||
    !telefone ||
    !endereco ||
    !dataCadastro
  ) {
    res.status(400).json({ message: "Dados inválidos" });
    return;
  }

  const result = await studentServices.createStudent(
    nome,
    dataNascimento,
    cpf,
    email,
    telefone,
    endereco,
    dataCadastro
  );

  if (!result.error) {
    res.status(201).json({ message: "Aluno cadastrado com sucesso" });
  } else {
    res.status(500).json({ message: "Erro ao cadastrar aluno " + result.error });
  }
}
export async function updateStudent() {}
export async function deleteStudent() {}
