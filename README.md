# Commercial KPI Dashboard

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14.0.3-black" alt="Next.js">
  <img src="https://img.shields.io/badge/Node.js-18.x-green" alt="Node.js">
  <img src="https://img.shields.io/badge/PostgreSQL-15-blue" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED" alt="Docker Compose">
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6" alt="TypeScript">
  <img src="https://img.shields.io/badge/Prisma-5.x-2D3748" alt="Prisma">
  <img src="https://img.shields.io/badge/Tests-Jest-C21325" alt="Jest">
</div>

<p align="center">
  <img src="docs/dashboard-preview.png" alt="Dashboard Preview" width="800">
</p>

## 📋 Tabla de Contenidos
- [Descripción General](#-descripción-general)
- [Arquitectura](#-arquitectura)
- [Modelo de Datos (Star Schema)](#-modelo-de-datos-star-schema)
- [KPIs Implementados](#-kpis-implementados)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Ejecución](#-instalación-y-ejecución)
- [Endpoints de la API](#-endpoints-de-la-api)
- [Pruebas](#-pruebas)
- [Decisiones Técnicas](#-decisiones-técnicas)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Licencia](#-licencia)

## 🎯 Descripción General

Dashboard comercial interactivo que permite monitorear el desempeño de ventas del dataset público de Olist (e-commerce brasileño). El proyecto implementa una arquitectura moderna con:

- **Backend**: Node.js + Express con arquitectura hexagonal
- **Frontend**: Next.js 14 con diseño glassmorphism
- **Base de datos**: PostgreSQL con esquema estrella
- **Infraestructura**: Docker Compose con 3 servicios

### Características Principales
- ✅ 7 KPIs comerciales en tiempo real
- ✅ Rankings de productos por GMV/Revenue
- ✅ Tendencias de revenue con granularidad diaria/semanal/mensual
- ✅ Filtros por rango de fechas y múltiples criterios
- ✅ Diseño responsive con animaciones y efectos visuales
- ✅ Arquitectura limpia y escalable

## 🏗️ Arquitectura

### Diagrama de Arquitectura

│ Frontend (Next.js) │
│ Port 3000 │
└────────────────────────────┬────────────────────────────────┘
│ HTTP
▼
┌─────────────────────────────────────────────────────────────┐
│ Backend (Node.js + Express) │
│ Port 4000 │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ Arquitectura Hexagonal │ │
│ │ ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │ │
│ │ │ Adapters │→│ Use Cases │→│ Repositories │ │ │
│ │ │ (HTTP) │←│(Application)│←│ (Infrastructure)│ │ │
│ │ └──────────┘ └──────────┘ └──────────────────┘ │ │
│ └──────────────────────────────────────────────────────┘ │
└────────────────────────────┬────────────────────────────────┘
│ SQL (solo gold)
▼
┌─────────────────────────────────────────────────────────────┐
│ PostgreSQL (Port 5433) │
│ ┌──────────┐ ┌──────────┐ ┌──────────────────────────┐ │
│ │ raw │→│ clean │→│ gold (Star Schema) │ │
│ │(CSV raw) │ │(Limpieza) │ │ fact_sales + dim_* │ │
│ └──────────┘ └──────────┘ └──────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
### Capas de Datos

| Esquema | Descripción | Tablas |
|---------|-------------|--------|
| **raw** | Datos crudos de los CSV de Olist | customers, orders, order_items, products, etc. |
| **clean** | Datos limpios con tipos correctos y normalización | customers, orders, order_items, products, etc. |
| **gold** | Esquema estrella para análisis | fact_sales, dim_date, dim_customer, dim_product, dim_order |

## 📊 Modelo de Datos (Star Schema)

### Tabla de Hechos: `gold.fact_sales`

**Grano**: 1 fila por item de orden (`order_id` + `order_item_id`)

| Columna | Tipo | Descripción |
|---------|------|-------------|
| fact_sales_sk | SERIAL | Clave primaria surrogate |
| order_sk | INTEGER | FK a dim_order |
| customer_sk | INTEGER | FK a dim_customer |
| product_sk | INTEGER | FK a dim_product |
| date_sk | INTEGER | FK a dim_date |
| order_id | VARCHAR(50) | ID de la orden |
| order_item_id | INTEGER | Número de item en la orden |
| item_price | DECIMAL(10,2) | Precio del item |
| freight_value | DECIMAL(10,2) | Valor del envío |
| total_order_value | DECIMAL(10,2) | Valor total de la orden |
| payment_value_allocated | DECIMAL(10,2) | Pago prorrateado |
| is_canceled | BOOLEAN | Flag de cancelación |
| is_delivered | BOOLEAN | Flag de entrega |
| is_on_time | BOOLEAN | Flag de entrega a tiempo |

### Dimensiones

#### `gold.dim_date`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| date_sk | SERIAL | Clave surrogate |
| full_date | DATE | Fecha completa |
| year | INTEGER | Año |
| quarter | INTEGER | Trimestre |
| month | INTEGER | Mes |
| month_name | VARCHAR(20) | Nombre del mes |
| week | INTEGER | Semana del año |
| day_of_week | INTEGER | Día de la semana |
| day_name | VARCHAR(20) | Nombre del día |
| is_weekend | BOOLEAN | Flag de fin de semana |

#### `gold.dim_customer`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| customer_sk | SERIAL | Clave surrogate |
| customer_id | VARCHAR(50) | ID del cliente |
| customer_unique_id | VARCHAR(50) | ID único |
| customer_city | VARCHAR(100) | Ciudad |
| customer_state | VARCHAR(2) | Estado (UF) |
| customer_zip_code_prefix | VARCHAR(10) | Prefijo CEP |

#### `gold.dim_product`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| product_sk | SERIAL | Clave surrogate |
| product_id | VARCHAR(50) | ID del producto |
| product_category_name | VARCHAR(100) | Categoría (PT) |
| product_category_name_english | VARCHAR(100) | Categoría (EN) |
| product_weight_g | INTEGER | Peso en gramos |
| product_length_cm | INTEGER | Largo |
| product_height_cm | INTEGER | Alto |
| product_width_cm | INTEGER | Ancho |

#### `gold.dim_order`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| order_sk | SERIAL | Clave surrogate |
| order_id | VARCHAR(50) | ID de la orden |
| customer_id | VARCHAR(50) | ID del cliente |
| order_status | VARCHAR(50) | Estado |
| order_purchase_timestamp | TIMESTAMP | Fecha de compra |
| order_approved_at | TIMESTAMP | Fecha de aprobación |
| order_delivered_carrier_date | TIMESTAMP | Fecha envío |
| order_delivered_customer_date | TIMESTAMP | Fecha entrega |
| order_estimated_delivery_date | TIMESTAMP | Fecha estimada |
| purchase_date_sk | INTEGER | FK a dim_date |
| approved_date_sk | INTEGER | FK a dim_date |
| delivered_date_sk | INTEGER | FK a dim_date |
| estimated_delivery_date_sk | INTEGER | FK a dim_date |

### Asignación de Pagos (Prorrateo)

Para mantener el grano de 1 fila por item, los pagos se prorratean usando la siguiente fórmula:

```sql
payment_value_allocated = (item_price / total_order_price) * total_payment_valueEjemplo:

Orden con 2 items: R$ 100 y R$ 200

Pago total: R$ 270

Item 1: (100/300) * 270 = R$ 90

Item 2: (200/300) * 270 = R$ 180

📈 KPIs Implementados
KPI	Fórmula	Descripción
GMV	SUM(item_price)	Gross Merchandise Value
Revenue	SUM(payment_value_allocated)	Ingresos reales
Orders	COUNT(DISTINCT order_id)	Número de órdenes
AOV	Revenue / Orders	Average Order Value
Items per Order	COUNT(order_item_id) / Orders	Items por orden
Cancel Rate	cancelled_orders / total_orders	Tasa de cancelación
On-Time Delivery	delivered_on_time / delivered_total	Entregas a tiempo
🛠️ Tecnologías Utilizadas
Backend
Node.js + Express - Servidor web

TypeScript - Tipado estático

Prisma - ORM para PostgreSQL

Zod - Validación de datos

Jest + Supertest - Testing

Arquitectura Hexagonal - Organización del código

Frontend
Next.js 14 - Framework React

TypeScript - Tipado estático

Tailwind CSS - Estilos

Recharts - Gráficos

React Query - Gestión de estado

Axios - Cliente HTTP

Lucide React - Iconos

Base de Datos
PostgreSQL 15 - Base de datos relacional

Esquema Estrella - Modelado analítico

PL/pgSQL - Funciones almacenadas

Infraestructura
Docker + Docker Compose - Contenedores

Git - Control de versiones

📁 Estructura del Proyectocommercial-kpi-dashboard/
├── backend/                    # Backend Node.js + Express
│   ├── src/
│   │   ├── domain/            # Entidades y puertos
│   │   ├── application/        # Casos de uso
│   │   ├── infrastructure/     # Repositorios, Prisma
│   │   └── adapters/          # Controladores HTTP
│   ├── tests/                  # Tests unitarios e integración
│   └── scripts/                # Scripts ETL
├── frontend/                   # Frontend Next.js
│   ├── src/
│   │   ├── app/               # Páginas (App Router)
│   │   ├── components/        # Componentes React
│   │   ├── hooks/             # Custom hooks
│   │   ├── lib/               # Utilidades
│   │   └── types/             # TypeScript types
│   └── public/                 # Archivos estáticos
├── docker/                     # Configuración Docker
│   ├── backend/                # Dockerfile backend
│   ├── frontend/               # Dockerfile frontend
│   └── postgres/               # Scripts SQL iniciales
├── scripts/                    # Scripts ETL generales
├── data/                       # Datos CSV
├── docker-compose.yml          # Orquestación de servicios
└── README.md                   # Documentación📋 Requisitos Previos
Docker 24.0+ y Docker Compose 2.20+

Node.js 18+ (para desarrollo local)

Git

Puertos disponibles: 3000, 4000, 5433

🚀 Instalación y Ejecución
1. Clonar el repositorio
git clone https://github.com/EmersonRodas9029/datalysis-kpi-dashboard.git
cd commercial-kpi-dashboard2. Configurar variables de entorno
cp .env.example .env
# Editar .env si es necesario (los valores por defecto funcionan)3. Descargar y preparar los datos
# Mover los archivos CSV a la carpeta data (desde tu descarga)
./scripts/move-csv-files.sh4. Levantar los servicios con Docker
docker compose up --buildEsto iniciará:

PostgreSQL en localhost:5433

Backend en http://localhost:4000

Frontend en http://localhost:3000

5. Cargar los datos en la base de datos
En otra terminal:# Ejecutar ETL completo
./scripts/run-full-etl.shEste script:

Carga los CSV a raw.*

Transforma raw → clean

Construye el star schema en gold6. Verificar la instalación
# Health check del backend
curl http://localhost:4000/api/health

# Probar KPIs
curl "http://localhost:4000/api/kpis?from=2018-01-01&to=2018-12-31"🧪 Pruebas
Backend
cd backend
npm install
npm test          # Ejecutar tests
npm run test:coverage  # Ver coberturaTests Implementados
Archivo	Tipo	Descripción
get-kpis.use-case.test.ts	Unitario	Prueba el caso de uso de KPIs
get-revenue-trend.use-case.test.ts	Unitario	Prueba el caso de uso de tendencias
get-top-products.use-case.test.ts	Unitario	Prueba el caso de uso de rankings
kpi-api.test.ts	Integración	Prueba todos los endpoints
Total: 20 tests (12 unitarios + 8 integración)

💡 Decisiones Técnicas
1. Arquitectura Hexagonal
Por qué: Separación clara de responsabilidades, fácil testing y mantenimiento

Beneficio: Los use cases son independientes de frameworks y bases de datos

2. Esquema Estrella en Gold
Por qué: Optimizado para consultas analíticas

Grano: 1 fila por item (permite análisis a nivel producto)

Prorrateo: Opción A (proporcional al precio) para mantener consistencia

3. Prisma como ORM
Por qué: Type safety, migraciones automáticas, excelente DX

Uso: Consultas SQL raw para mejor control en KPIs complejos

4. Next.js App Router
Por qué: Server components, routing intuitivo, optimizaciones automáticas

Client Components: Solo donde es necesario (interactividad)

5. Docker Compose
Por qué: Entorno reproducible, fácil despliegue, aislamiento de servicios

6. Validación con Zod
Por qué: TypeScript first, composable, excelente integración con Express

🖼️ Capturas de Pantalla
Dashboard Overview
https://docs/overview.png

Rankings de Productos
https://docs/rankings.png

Tendencias
https://docs/trends.png

Análisis de Productos
https://docs/products.png

🔧 Scripts Útiles# ETL completo (carga + transformaciones)
./scripts/run-full-etl.sh

# Solo carga raw
./scripts/load-raw-data.sh

# Solo transformación raw → clean
./scripts/transform-raw-to-clean.sh

# Solo construcción star schema
./scripts/build-star-schema.sh

# Verificar datos cargados
./scripts/verify-gold-schema.sh📊 Datos del Dataset Olist
Tabla	Registros	Descripción
customers	99,441	Clientes
orders	99,441	Órdenes
order_items	112,650	Items de órdenes
order_payments	103,886	Pagos
products	32,951	Productos
sellers	3,095	Vendedores
geolocation	1,000,163	Geolocalización
