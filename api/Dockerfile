# Cria uma imagem baseada na versão LTS Alpine do node
FROM node:lts-alpine

# Define as portas do servidor
ARG APP_PORT=7123
ENV PORT=$APP_PORT

# Cria um diretório onde a instalação será instalada
RUN mkdir -p /app
# Muda o diretório atual
WORKDIR /app
# Copia o package.json para diretório atual
COPY package.json ./
# Instala as dependências definidas no package.json
RUN npm install
# Copia todo o código necessário para rodar a aplicação
COPY ./ ./

# Expõe a porta em que a aplicação irá rodar
EXPOSE $PORT
# Inicializa a aplicação
CMD [ "sh", "./start.sh" ]