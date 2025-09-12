# Documentação:
# Este Dockerfile constrói a imagem da nossa aplicação React/Vite.

# --- Estágio 1: Builder ---
# Usa uma imagem Node para instalar as dependências e construir os arquivos estáticos.
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos de definição de pacotes
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código-fonte
COPY . .

# Executa o script de build do Vite, que gera a pasta 'dist' com os arquivos otimizados.
RUN npm run build

# --- Estágio 2: Production Server ---
# Usa uma imagem oficial do Nginx, que é um servidor web leve e otimizado.
FROM nginx:stable-alpine

# Copia os arquivos estáticos da pasta 'dist' (gerada no estágio anterior)
# para a pasta padrão que o Nginx usa para servir conteúdo web.
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta 80, que é a porta padrão do Nginx.
EXPOSE 80

# O comando para iniciar o servidor Nginx já está embutido na imagem,
# então não precisamos de um CMD aqui.