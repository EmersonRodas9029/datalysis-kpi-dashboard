#!/bin/bash

# Esperar a que PostgreSQL esté listo
echo "Esperando a PostgreSQL..."
sleep 5

# Generar Prisma Client
echo "Generando Prisma Client..."
npx prisma generate --schema=./src/infrastructure/database/prisma/schema.prisma

echo "✅ Setup completado"
