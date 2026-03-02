# docker/frontend/Dockerfile (actualizado)
FROM node:18-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY frontend/package*.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY frontend/ .

# Exponer puerto
EXPOSE 3000

# Comando para desarrollo
CMD ["npm", "run", "dev"]