FROM node:18-alpine

WORKDIR /app

# Copiar package.json (están en el mismo directorio que el Dockerfile)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer puerto
EXPOSE 4000

# Comando para desarrollo
CMD ["npm", "run", "dev"]
