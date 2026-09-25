// Todo opcional: un PATCH manda solo lo que cambia.
import { IsInt, IsOptional, IsPositive, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class ActualizarHorarioDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  claseId?: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  dia?: string;

  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, { message: 'horaInicio debe tener formato HH:mm' })
  horaInicio?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  cupoMaximo?: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(80)
  entrenador?: string;
}
