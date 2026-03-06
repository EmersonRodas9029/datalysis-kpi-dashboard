FROM node:18-alpine

WORKDIR /app

# Instalar dependencias necesarias
RUN apk add --no-cache openssl

# Copiar package.json y package-lock.json
COPY backend/package*.json ./

# Instalar dependencias
RUN npm install

# Crear la estructura de directorios para Prisma
RUN mkdir -p src/infrastructure/database/prisma

# Copiar el código fuente primero (para incluir el schema)
COPY backend/ .

# Verificar que el schema existe y generar Prisma Client
RUN if [ -f src/infrastructure/database/prisma/schema.prisma ]; then \
        echo "✅ Schema encontrado, generando Prisma Client..."; \
        npx prisma generate --schema=src/infrastructure/database/prisma/schema.prisma; \
    else \
        echo "❌ Error: No se encuentra el schema"; \
        exit 1; \
    fi

# Copiar entrypoint
COPY docker/backend/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Exponer puerto
EXPOSE 4000

# Usar entrypoint
ENTRYPOINT ["/entrypoint.sh"]

# Comando para desarrollo
CMD ["npm", "run", "dev"]
