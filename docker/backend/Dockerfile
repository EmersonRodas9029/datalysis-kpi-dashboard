FROM node:18-alpine

WORKDIR /app

# Instalar dependencias necesarias
RUN apk add --no-cache openssl

# Copiar package.json y package-lock.json
COPY backend/package*.json ./

# Instalar dependencias (sin postinstall)
RUN npm install --ignore-scripts

# Instalar Prisma globalmente
RUN npm install -g prisma

# Crear la estructura de directorios para Prisma
RUN mkdir -p src/infrastructure/database/prisma

# Copiar el schema de Prisma
COPY backend/src/infrastructure/database/prisma/schema.prisma ./src/infrastructure/database/prisma/

# Generar Prisma Client
RUN npx prisma generate --schema=./src/infrastructure/database/prisma/schema.prisma

# Copiar el resto del código fuente
COPY backend/ .

# Copiar entrypoint
COPY docker/backend/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Exponer puerto
EXPOSE 4000

# Usar entrypoint
ENTRYPOINT ["/entrypoint.sh"]

# Comando para desarrollo
CMD ["npm", "run", "dev"]
