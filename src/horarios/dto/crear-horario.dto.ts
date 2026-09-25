// Validacion minima a mano. En la Sesion 9 (Blindar la API) la hace
// ValidationPipe.
import { IsInt, IsPositive, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CrearHorarioDto {
  @IsInt()
  @IsPositive()
  claseId!: number;

  @IsString()
  @MinLength(1)
  @MaxLength(20)
  dia!: string;

  @IsString()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, { message: 'horaInicio debe tener formato HH:mm' })
  horaInicio!: string;

  @IsInt()
  @IsPositive()
  cupoMaximo!: number;

  @IsString()
  @MinLength(1)
  @MaxLength(80)
  entrenador!: string;
}