#!/bin/bash

echo "Generando Prisma Client..."
npx prisma generate --schema=./src/infrastructure/database/prisma/schema.prisma