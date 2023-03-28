# Define a imagem base
FROM node:14.17.5

# Define a pasta de trabalho do aplicativo dentro do contêiner
WORKDIR /usr/src/app

# Copia o package.json e o package-lock.json para o contêiner
COPY package*.json ./

# Instala as dependências do aplicativo
RUN npm install

# Copia todo o código-fonte do aplicativo para o contêiner
COPY . .

# Expõe a porta 3000
EXPOSE 3000

# Define o comando padrão a ser executado quando o contêiner iniciar
CMD [ "node", "src/server.js" ]
