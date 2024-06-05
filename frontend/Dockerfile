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

# Construa a aplicação para produção
RUN npm run build

# Use uma imagem Nginx para servir a aplicação
FROM nginx:alpine

# Copie os arquivos de build para o diretório do Nginx
COPY --from=0 /app/build /usr/share/nginx/html

# Exponha a porta que o Nginx utiliza
EXPOSE 3000

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]