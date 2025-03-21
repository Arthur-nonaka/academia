export default class Plan {
  id?: string;
  nome: string;
  descricao: string;
  valor: number;
  duracao: number;
  constructor(
    nome: string,
    descricao: string,
    valor: number,
    duracao: number
  ) {
    this.nome = nome;
    this.descricao = descricao;
    this.valor = valor;
    this.duracao = duracao;
  }

  public getId(): string | undefined {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public getNome(): string {
    return this.nome;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public getDescricao(): string {
    return this.descricao;
  }

  public setDescricao(descricao: string): void {
    this.descricao = descricao;
  }

  public getValor(): number {
    return this.valor;
  }

  public setValor(valor: number): void {
    this.valor = valor;
  }

  public getDuracao(): number {
    return this.duracao;
  }

  public setDuracao(duracao: number): void {
    this.duracao = duracao;
  }
}
