#!/bin/sh

echo "🚀 Iniciando backend..."

# Verificar si el schema de Prisma existe
SCHEMA_PATH="./src/infrastructure/database/prisma/schema.prisma"
if [ -f "$SCHEMA_PATH" ]; then
    echo "📦 Generando Prisma Client desde $SCHEMA_PATH..."
    npx prisma generate --schema=$SCHEMA_PATH
    if [ $? -eq 0 ]; then
        echo "✅ Prisma Client generado correctamente"
    else
        echo "❌ Error al generar Prisma Client"
        exit 1
    fi
else
    echo "❌ Error: No se encuentra el schema en $SCHEMA_PATH"
    ls -la ./src/infrastructure/database/prisma/
    exit 1
fi

# Ejecutar el comando pasado
exec "$@"
