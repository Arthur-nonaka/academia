import { Request, Response } from "express";
import studentServices from "../Services/StudentServices";
import Student from "../Models/StudentModel";

export async function getStudents(req: Request, res: Response) {
  try {
    const students = await studentServices.getStudents();

    if (students) {
      res.status(200).json(students);
    } else {
      res.status(404).json({ message: "Nenhum aluno encontrado" });
      return;
    }
  } catch (err: any) {
    res.status(500).json({ message: "Erro ao buscar alunos: " + err.message });
    return;
  }
}

export async function getStudentById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const student = await studentServices.getStudentById(id);

    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ message: "Aluno não encontrado" });
      return;
    }
  } catch (err: any) {
    res.status(500).json({ message: "Erro ao buscar aluno: " + err.message });
    return;
  }
}

export async function createStudent(req: Request, res: Response) {
  const { nome, dataNascimento, cpf, email, telefone, endereco } = req.body;

  if (!nome || !dataNascimento || !cpf || !email || !telefone || !endereco) {
    res.status(400).json({ message: "Dados inválidos" });
    return;
  }

  const student = new Student(
    nome,
    new Date(dataNascimento),
    cpf,
    email,
    telefone,
    endereco,
    new Date()
  );

  try {
    await studentServices.createStudent(student);

    res.status(201).json({ message: "Aluno cadastrado com sucesso" });
  } catch (err: any) {
    res.status(500).json({ message: "Erro ao cadastrar aluno: " + err.message });
  }
}

export async function updateStudent(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { nome, dataNascimento, cpf, email, telefone, endereco } = req.body;

    const result = await studentServices.getStudentById(id);

    if (!Array.isArray(result) || result.length === 0) {
      res.status(404).json({ message: "Aluno não encontrado" });
      return;
    }

    const existingStudent = result[0];

    const student = new Student(
      nome || existingStudent.nome,
      dataNascimento || new Date(existingStudent.dataNascimento),
      cpf || existingStudent.cpf,
      email || existingStudent.email,
      telefone || existingStudent.telefone,
      endereco || existingStudent.endereco,
      new Date(existingStudent.dataCadastro)
    );

    await studentServices.updateStudent(student, id);

    res.status(200).json({ message: "Aluno atualizado com sucesso" });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar aluno: " + err.message });
  }
}
export async function deleteStudent(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const result = await studentServices.getStudentById(id);

    if (!result) {
      res.status(404).json({ message: "Aluno não encontrado" });
      return;
    }

    await studentServices.deleteStudent(id);

    res.status(200).json({ message: "Aluno deletado com sucesso" });
  } catch (err: any) {
    res.status(500).json({ message: "Erro ao deletar aluno: " + err.message });
  }
}
