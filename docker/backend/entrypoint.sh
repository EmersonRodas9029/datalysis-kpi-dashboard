#!/bin/sh

SCHEMA_PATH="./src/infrastructure/database/prisma/schema.prisma"
if [ -f "$SCHEMA_PATH" ]; then
    npx prisma generate --schema=$SCHEMA_PATH
    if [ $? -eq 0 ]; then
        echo "Prisma Client generado correctamente"
    else
        echo " Error al generar Prisma Client"
        exit 1
    fi
else
    echo " Error: No se encuentra el schema en $SCHEMA_PATH"
    exit 1
fi

exec "$@"