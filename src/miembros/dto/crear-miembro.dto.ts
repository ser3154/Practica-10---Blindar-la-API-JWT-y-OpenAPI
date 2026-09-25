// Validacion minima a mano. En la Sesion 9 (Blindar la API) la hace
// ValidationPipe.
import { IsEmail, IsIn, IsString, MaxLength, MinLength } from 'class-validator';

const MEMBRESIAS = ['basica', 'plus', 'premium'] as const;

export class CrearMiembroDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  nombre!: string;

  @IsEmail()
  @MaxLength(150)
  correo!: string;

  @IsIn(MEMBRESIAS)
  membresia!: string;
}