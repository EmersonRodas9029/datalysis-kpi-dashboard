FROM node:18-alpine AS deps

WORKDIR /app

# Copiar archivos de dependencias (desde la carpeta frontend)
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY frontend/ .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL:-http://localhost:4000}

# Construir la aplicación
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Verificar que la carpeta public existe antes de copiar
RUN if [ -d "/app/public" ]; then echo "public folder exists"; else mkdir -p /app/public; fi

# Copiar archivos necesarios
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Si no existe la carpeta public, crear una vacía
RUN if [ ! -d "./public" ]; then mkdir -p ./public; fi

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]