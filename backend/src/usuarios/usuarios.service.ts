import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Usuario } from "@prisma/client";

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany();
  }
}
