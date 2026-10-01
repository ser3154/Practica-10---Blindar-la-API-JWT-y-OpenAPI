import { ErrorDominio } from '../../comun/errores/error_dominio';

export abstract class ErrorDeDominio extends ErrorDominio {}

export class HorarioNoEncontradoError extends ErrorDeDominio {
  readonly codigo = 'NO_ENCONTRADO' as const;
  constructor(horarioId: number) {
    super(`No existe el horario ${horarioId}`);
  }
}

export class MiembroNoEncontradoError extends ErrorDeDominio {
  readonly codigo = 'NO_ENCONTRADO' as const;
  constructor(miembroId: number) {
    super(`No existe el miembro ${miembroId}`);
  }
}

export class CupoLlenoError extends ErrorDeDominio {
  readonly codigo = 'CONFLICTO' as const;
  constructor(horarioId: number, cupoMaximo: number) {
    super(`El horario ${horarioId} ya tiene ${cupoMaximo} inscripciones confirmadas`);
  }
}

export class InscripcionDuplicadaError extends ErrorDeDominio {
  readonly codigo = 'CONFLICTO' as const;
  constructor(horarioId: number, miembroId: number) {
    super(`El miembro ${miembroId} ya esta inscrito en el horario ${horarioId}`);
  }
}