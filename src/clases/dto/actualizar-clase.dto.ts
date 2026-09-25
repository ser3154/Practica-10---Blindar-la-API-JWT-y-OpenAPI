// Todo opcional: un PATCH manda solo lo que cambia.
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class ActualizarClaseDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(80)
  nombre?: string;
}
