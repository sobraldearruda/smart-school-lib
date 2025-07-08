FROM node:20

# Define o diretório de trabalho
WORKDIR /my-app

# Copia os arquivos de configuração
COPY package*.json ./
COPY tsconfig.json ./

# Instala dependências
RUN npm install

# Copia o restante da aplicação
COPY . .

# Compila o código TypeScript
RUN npm run build

# Expõe a porta da API
EXPOSE 3000

# Executa o servidor compilado
CMD ["node", "dist/index.js"]
