export default class Student {
  id?: string;
  nome: string;
  dataNascimento: Date;
  cpf: string;
  email: string;
  telefone: string;
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
    this.nome = nome;
    this.dataNascimento = dataNascimento;
    this.cpf = cpf;
    this.email = email;
    this.telefone = telefone;
    this.endereco = endereco;
    this.dataCadastro = dataCadastro;
  }

  public getNome(): string {
    return this.nome;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public getDataNascimento(): Date {
    return this.dataNascimento;
  }

  public setDataNascimento(dataNascimento: Date): void {
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
