import { IsEmail, IsOptional, IsString } from "class-validator";

export class AtualizarUsuarioDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  nome?: string;
}
