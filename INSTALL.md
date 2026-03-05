# Guía de Instalación - Commercial KPI Dashboard

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14.0.3-black" alt="Next.js">
  <img src="https://img.shields.io/badge/Node.js-18.x-green" alt="Node.js">
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED" alt="Docker Compose">
</div>

##  Tabla de Contenidos
- [Requisitos Previos](#-requisitos-previos)
- [Instalación Rápida (5 minutos)](#-instalación-rápida-5-minutos)
- [Instalación Paso a Paso](#-instalación-paso-a-paso)
- [Configuración](#-configuración)
- [Ejecución](#-ejecución)
- [Verificación](#-verificación)
- [Solución de Problemas](#-solución-de-problemas)
- [Comandos Útiles](#-comandos-útiles)
- [Acceso a la Aplicación](#-acceso-a-la-aplicación)

##  Requisitos Previos

### Software Necesario
| Herramienta | Versión Mínima | Comando para verificar |
|-------------|---------------|------------------------|
| **Docker** | 24.0.0 | `docker --version` |
| **Docker Compose** | 2.20.0 | `docker compose version` |
| **Git** | 2.30.0 | `git --version` |
| **curl** | Cualquiera | `curl --version` |

### Puertos Necesarios
Asegúrate de que estos puertos estén disponibles:
- `3000` - Frontend Next.js
- `4000` - Backend Node.js
- `5433` - PostgreSQL (no el default 5432)

```bash
# Verificar puertos en Linux/Mac
lsof -i :3000
lsof -i :4000
lsof -i :5433

# En Windows (PowerShell)
netstat -ano | findstr :3000
netstat -ano | findstr :4000
netstat -ano | findstr :5433Espacio en Disco
Mínimo: 5 GB libres

Dataset Olist: ~120 MB

Imágenes Docker: ~2 GB

 Instalación Rápida (5 minutos)
Si ya tienes Docker y Git instalados: # 1. Clonar el repositorio
git clone https://github.com/EmersonRodas9029/datalysis-kpi-dashboard.git
cd commercial-kpi-dashboard

# 2. Configurar variables de entorno
cp .env.example .env

# 3. Levantar los servicios
docker compose up -d

# 4. Mover los archivos CSV (desde tu carpeta de descargas)
#    Ajusta la ruta según donde tengas los archivos
./scripts/move-csv-files.sh

# 5. Cargar los datos
./scripts/run-full-etl.sh

# 6. Verificar instalación
curl http://localhost:4000/api/health ¡Listo! Abre http://localhost:3000 en tu navegador.

 Instalación Paso a Paso
Paso 1: Clonar el Repositorio # Clonar con HTTPS
git clone https://github.com/EmersonRodas9029/datalysis-kpi-dashboard.git

# O con SSH
git clone git@github.com:EmersonRodas9029/datalysis-kpi-dashboard.git

# Entrar al directorio
cd commercial-kpi-dashboard Paso 2: Obtener los Datos (Dataset Olist)
Opción A: Descargar desde el mirror de GitHub (recomendada) # Crear directorio para los datos
mkdir -p data/raw/olist_csv_files


# Descargar archivos (puede tomar unos minutos)

https://github.com/ayushic2899/Brazilian-E-Commerce-Public-Dataset-by-Olist

Opción B: Usar archivos ya descargados

Si ya tienes los CSV en tu computadora:# Edita la ruta en el script según tu caso
nano scripts/move-csv-files.sh
# Cambia SOURCE_DIR a tu directorio (ej: /home/usuario/Downloads/olist)

# Ejecuta el script
./scripts/move-csv-files.shOpción C: Verificar archivos existentes
 # Verificar que los archivos están en el lugar correcto
ls -la data/raw/olist_csv_files/

# Deberías ver 9 archivos .csv Paso 3: Configurar Variables de Entorno
 # Copiar el archivo de ejemplo
cp .env.example .env

# Verificar configuración (los valores por defecto funcionan)
cat .env Paso 4: Levantar los Servicios con Docker
 # Construir y levantar todos los servicios
docker compose up --build

# Para ejecutar en segundo plano (detached)
docker compose up -d --build

# Ver logs de todos los servicios
docker compose logs -f # Ver estado de los contenedores
docker compose ps

# Deberías ver algo como:
# NAME                STATUS                  PORTS
# kpi-db              Up (healthy)            0.0.0.0:5433->5432/tcp
# kpi-backend         Up                      0.0.0.0:4000->4000/tcp
# kpi-frontend        Up                      0.0.0.0:3000->3000/tcp Paso 6: Cargar los Datos en la Base de Datos
 # Ejecutar ETL completo (puede tomar 2-3 minutos)
./scripts/run-full-etl.sh Lo que hace el script:

load-raw-data.sh: Carga CSV → raw.* (9 tablas, ~1.5M filas)

transform-raw-to-clean.sh: Limpia y normaliza → clean.*

build-star-schema.sh: Construye esquema estrella → gold.* # 1. Health check del backend
curl http://localhost:4000/api/health
# Debería responder: {"status":"OK","timestamp":"..."}

# 2. Probar KPIs
curl "http://localhost:4000/api/kpis?from=2018-01-01&to=2018-12-31"
# Debería mostrar datos de 2018

# 3. Verificar datos en la base de datos
docker exec -it kpi-db psql -U kpi_user -d kpi_dashboard -c "SELECT COUNT(*) FROM gold.fact_sales;"
# Debería mostrar: 112647

# 4. Abrir el navegador en http://localhost:3000
# Deberías ver el dashboard con datos Configuración de Prisma (opcional)
 # Si quieres explorar la base de datos con Prisma Studio
cd backend
npx prisma studio
# Abre http://localhost:5555 Scripts ETL
 # Ver todos los scripts disponibles
ls -la scripts/

# Ejecutar ETL completo
./scripts/run-full-etl.sh

# Cargar solo raw
./scripts/load-raw-data.sh

# Transformar raw → clean
./scripts/transform-raw-to-clean.sh

# Construir star schema
./scripts/build-star-schema.sh

# Verificar datos
./scripts/verify-gold-schema.sh # Backend tests
cd backend
npm test                 # Todos los tests
npm run test:coverage    # Ver cobertura

