FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache openssl

COPY backend/package*.json ./

RUN npm install

RUN mkdir -p src/infrastructure/database/prisma

COPY backend/ .

RUN if [ -f src/infrastructure/database/prisma/schema.prisma ]; then \
        npx prisma generate --schema=src/infrastructure/database/prisma/schema.prisma; \
    else \
        exit 1; \
    fi

COPY docker/backend/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 4000

ENTRYPOINT ["/entrypoint.sh"]

CMD ["npm", "run", "dev"]