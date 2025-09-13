- iniciar containeres no modo de desenvolvimento:

docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

- iniciar containeres no modo de produção:

docker-compose up --build
