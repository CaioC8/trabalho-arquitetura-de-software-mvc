import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsuariosModule } from "./usuarios/usuarios.module"; // Importe o módulo de usuários

@Module({
  imports: [UsuariosModule], // Adicione o UsersModule aqui
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
