import Person from "./PersonModel";

export default class Student extends Person {
  id?: string;
  endereco: string;
  dataCadastro: Date;

  constructor(
    nome: string,
    dataNascimento: Date,
    cpf: string,
    email: string,
    telefone: string,
    endereco: string,
    dataCadastro: Date
  ) {
    super(nome, dataNascimento, cpf, email, telefone);
    this.endereco = endereco;
    this.dataCadastro = dataCadastro;
  }

  public getEndereco(): string {
    return this.endereco;
  }

  public setEndereco(endereco: string): void {
    this.endereco = endereco;
  }

  public getDataCadastro(): Date {
    return this.dataCadastro;
  }

  public setDataCadastro(dataCadastro: Date): void {
    this.dataCadastro = dataCadastro;
  }
}
