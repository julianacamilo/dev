# Use a imagem base oficial do Node.js
FROM node:14

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos de configuração do Node.js
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Exponha a porta que o servidor utiliza
EXPOSE 5000

# Comando para iniciar o servidor
CMD ["node", "server.js"]
