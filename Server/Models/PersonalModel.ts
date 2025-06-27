import Person from "./PersonModel";

export default class Personal extends Person {
  id?: string;
  dataAdmissao: string;

  constructor(
    nome: string,
    dataNascimento: string,
    cpf: string,
    email: string,
    telefone: string,
    dataAdmissao: string
  ) {
    super(nome, dataNascimento, cpf, email, telefone);
    this.dataAdmissao = dataAdmissao;
  }

  public getDataAdmissao(): string {
    return this.dataAdmissao;
  }

  public setDataAdmissao(dataAdmissao: string): void {
    this.dataAdmissao = dataAdmissao;
  }
}
