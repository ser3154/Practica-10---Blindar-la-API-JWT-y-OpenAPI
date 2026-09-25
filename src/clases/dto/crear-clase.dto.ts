// Validacion minima a mano. En la Sesion 9 (Blindar la API) la hace
// ValidationPipe.
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CrearClaseDto {
  @IsString()
  @MinLength(1)
  @MaxLength(80)
  nombre!: string;
}