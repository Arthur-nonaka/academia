import Person from "./PersonModel";

export default class Student extends Person {
  id?: string;
  endereco: string;
  dataCadastro: string;

  constructor(
    nome: string,
    dataNascimento: string,
    cpf: string,
    email: string,
    telefone: string,
    endereco: string,
    dataCadastro: string
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

  public getDataCadastro(): string {
    return this.dataCadastro;
  }

  public setDataCadastro(dataCadastro: string): void {
    this.dataCadastro = dataCadastro;
  }
}
