FROM node:18-alpine AS deps

WORKDIR /app

# Copiar archivos de dependencias
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci

# Etapa de construcción
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY frontend/ .

# Variables de entorno para el build
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL:-http://localhost:4000}

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Crear usuario no root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar archivos necesarios
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]