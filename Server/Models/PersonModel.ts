export default class Person {
  nome: string;
  dataNascimento: string;
  cpf: string;
  email: string;
  telefone: string;

  constructor(
    nome: string,
    dataNascimento: string,
    cpf: string,
    email: string,
    telefone: string
  ) {
    this.nome = nome;
    this.dataNascimento = dataNascimento;
    this.cpf = cpf;
    this.email = email;
    this.telefone = telefone;
  }

  public getNome(): string {
    return this.nome;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public getDataNascimento(): string {
    return this.dataNascimento;
  }

  public setDataNascimento(dataNascimento: string): void {
    this.dataNascimento = dataNascimento;
  }

  public getCpf(): string {
    return this.cpf;
  }

  public setCpf(cpf: string): void {
    this.cpf = cpf;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public getTelefone(): string {
    return this.telefone;
  }

  public setTelefone(telefone: string): void {
    this.telefone = telefone;
  }
}
