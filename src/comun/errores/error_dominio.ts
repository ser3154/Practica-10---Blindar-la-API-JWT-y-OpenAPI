export abstract class ErrorDominio extends Error {
  abstract readonly codigo: 'NO_ENCONTRADO' | 'CONFLICTO';

  constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}