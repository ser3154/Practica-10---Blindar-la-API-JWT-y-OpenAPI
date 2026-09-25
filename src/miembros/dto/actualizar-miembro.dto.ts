// Todo opcional: un PATCH manda solo lo que cambia. "activo" es el
// campo pensado para dar de baja a un miembro sin borrar su historial.
import { IsBoolean, IsEmail, IsIn, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

const MEMBRESIAS = ['basica', 'plus', 'premium'] as const;

export class ActualizarMiembroDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  nombre?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(150)
  correo?: string;

  @IsOptional()
  @IsIn(MEMBRESIAS)
  membresia?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
