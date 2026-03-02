# commercial-kpi-dashboard/docker/backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY backend/package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY backend/ .

# Exponer puerto
EXPOSE 4000

# Comando para desarrollo
CMD ["npm", "run", "dev"]