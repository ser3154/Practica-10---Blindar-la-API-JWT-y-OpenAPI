import { ErrorDominio } from '../../comun/errores/error_dominio';

export class HorarioNoEncontradoError extends ErrorDominio {
  readonly codigo = 'NO_ENCONTRADO' as const;
  constructor(horarioId: number) {
    super(`No existe el horario ${horarioId}`);
  }
}

export class MiembroNoEncontradoError extends ErrorDominio {
  readonly codigo = 'NO_ENCONTRADO' as const;
  constructor(miembroId: number) {
    super(`No existe el miembro ${miembroId}`);
  }
}

export class CupoLlenoError extends ErrorDominio {
  readonly codigo = 'CONFLICTO' as const;
  constructor(horarioId: number, cupoMaximo: number) {
    super(`El horario ${horarioId} ya tiene ${cupoMaximo} inscripciones confirmadas`);
  }
}

export class InscripcionDuplicadaError extends ErrorDominio {
  readonly codigo = 'CONFLICTO' as const;
  constructor(horarioId: number, miembroId: number) {
    super(`El miembro ${miembroId} ya esta inscrito en el horario ${horarioId}`);
  }
}