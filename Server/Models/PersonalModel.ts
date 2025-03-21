import Person from "./PersonModel";

export default class Personal extends Person {
  id?: string;
  dataAdmissao: Date;

  constructor(
    nome: string,
    dataNascimento: Date,
    cpf: string,
    email: string,
    telefone: string,
    dataAdmissao: Date
  ) {
    super(nome, dataNascimento, cpf, email, telefone);
    this.dataAdmissao = dataAdmissao;
  }

  public getDataAdmissao(): Date {
    return this.dataAdmissao;
  }

  public setDataAdmissao(dataAdmissao: Date): void {
    this.dataAdmissao = dataAdmissao;
  }
}
