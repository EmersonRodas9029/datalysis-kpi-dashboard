#!/bin/sh

echo "🚀 Iniciando backend..."

# Verificar si Prisma Client está generado
if [ ! -d "node_modules/.prisma/client" ]; then
    echo "📦 Generando Prisma Client..."
    npx prisma generate --schema=./src/infrastructure/database/prisma/schema.prisma
fi

# Ejecutar el comando pasado
exec "$@"
