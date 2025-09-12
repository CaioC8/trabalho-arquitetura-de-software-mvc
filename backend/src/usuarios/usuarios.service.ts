import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Usuario } from "@prisma/client"; // O tipo User agora é importado do Prisma Client!

@Injectable()
export class UsuariosService {
  // Injetamos o PrismaService que criamos.
  constructor(private prisma: PrismaService) {}

  // Método assíncrono para buscar todos os usuários.
  async findAll(): Promise<Usuario[]> {
    // Usamos o cliente Prisma para executar a consulta no banco de dados.
    return this.prisma.usuario.findMany();
  }
}
