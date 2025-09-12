# Documentação:
# Este Dockerfile constrói a imagem da nossa aplicação NestJS.

# --- Estágio 1: Builder ---
# Usamos uma imagem Node completa para instalar todas as dependências (incluindo as de desenvolvimento)
# e compilar o projeto TypeScript para JavaScript.
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos de definição de pacotes
COPY package*.json ./

# Instala todas as dependências
RUN npm install

# Copia o restante do código-fonte da aplicação
COPY . .

# Gera o cliente Prisma
RUN npx prisma generate

# Compila o projeto TypeScript
RUN npm run build

# --- Estágio 2: Production ---
# Agora usamos uma imagem Node mais leve (alpine) para a versão final,
# o que resulta em uma imagem menor e mais segura.
FROM node:20-alpine

WORKDIR /app

# Copia apenas as dependências de produção do estágio 'builder'
COPY --from=builder /app/node_modules ./node_modules
# Copia o código compilado (JavaScript) do estágio 'builder'
COPY --from=builder /app/dist ./dist
# Copia o schema do Prisma para a imagem final, necessário para o Prisma Client funcionar
COPY --from=builder /app/prisma ./prisma

# Expõe a porta 3000, que é a porta que a aplicação NestJS usa.
EXPOSE 3000

# O comando para iniciar a aplicação em modo de produção.
CMD ["node", "dist/main"]