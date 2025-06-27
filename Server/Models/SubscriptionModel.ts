export default class Subscription {
  id?: string;
  dataMatricula: string;
  status: string;
  idAluno: string;
  idPlano: string;
  idPersonal: string;

  constructor(
    dataMatricula: string,
    status: string,
    idAluno: string,
    idPersonal: string,
    idPlano: string
  ) {
    this.dataMatricula = dataMatricula;
    this.status = status;
    this.idAluno = idAluno;
    this.idPersonal = idPersonal;
    this.idPlano = idPlano;
  }

  public getId(): string | undefined {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public getDataMatricula(): string {
    return this.dataMatricula;
  }

  public setDataMatricula(dataMatricula: string): void {
    this.dataMatricula = dataMatricula;
  }

  public getStatus(): string {
    return this.status;
  }

  public setStatus(status: string): void {
    this.status = status;
  }

  public getIdAluno(): string {
    return this.idAluno;
  }

  public setIdAluno(idAluno: string): void {
    this.idAluno = idAluno;
  }

  public getIdPlano(): string {
    return this.idPlano;
  }

  public setIdPlano(idPlano: string): void {
    this.idPlano = idPlano;
  }

  public getIdPersonal(): string {
    return this.idPersonal;
  }

  public setIdPersonal(idPersonal: string): void {
    this.idPersonal = idPersonal;
  }
}
