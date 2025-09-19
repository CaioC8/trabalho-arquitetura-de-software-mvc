import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "https://literate-space-cod-976vx7rqv556hrp4-8080.app.github.dev",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
