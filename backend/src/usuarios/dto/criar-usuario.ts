import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CriarUsuarioDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  nome: string;
}
