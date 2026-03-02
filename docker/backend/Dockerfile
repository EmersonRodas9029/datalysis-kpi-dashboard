# docker/backend/Dockerfile (actualizado)
FROM node:18-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY backend/package*.json ./

# Instalar dependencias (usar npm install en desarrollo)
RUN npm install

# Copiar código fuente
COPY backend/ .

# Exponer puerto
EXPOSE 4000

# Comando para desarrollo
CMD ["npm", "run", "dev"]