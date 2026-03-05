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

## Tabla de Contenidos
- [Descripción General](#-descripción-general)
- [Arquitectura](#-arquitectura)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Modelo de Datos](#-modelo-de-datos)
- [KPIs Implementados](#-kpis-implementados)
- [API Endpoints](#-api-endpoints)
- [Decisiones Técnicas](#-decisiones-técnicas)

##  Descripción General

Dashboard comercial interactivo construido con **Next.js**, **Node.js** y **PostgreSQL** que permite monitorear el desempeño de ventas del dataset público de Olist (e-commerce brasileño con +100k órdenes).

### Características Principales
-  **7 KPIs** en tiempo real (GMV, Revenue, Orders, AOV, Items/Order, Cancel Rate, On-Time Delivery)
- **Rankings** de productos por GMV y Revenue
-  **Tendencias** con granularidad diaria/semanal/mensual
-  **Filtros** por rango de fechas, estado de orden, categoría y estado del cliente
-  **Diseño responsive** con glassmorphism y animaciones
-  **Arquitectura hexagonal** en backend
- **Esquema estrella** en base de datos

##  Arquitectura

### Diagrama de Alto Nivel

┌─────────────────────────────────────────────────────────────┐
│ Frontend (Next.js) │
│ Port 3000 │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ Pages: Overview, Rankings, Trends, Products │ │
│ │ Components: KPICards, Charts, Filters │ │
│ │ State: React Query + Hooks │ │
│ └──────────────────────────────────────────────────────┘ │
└────────────────────────────┬────────────────────────────────┘
│ HTTP REST
▼
┌─────────────────────────────────────────────────────────────┐
│ Backend (Node.js) │
│ Port 4000 │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ Arquitectura Hexagonal │ │
│ │ │ │
│ │ ┌──────────────┐ ┌──────────────┐ │ │
│ │ │ Adapters │────▶│ Use Cases │ │ │
│ │ │ (HTTP) │◀────│ (Applicación)│ │ │
│ │ └──────────────┘ └──────────────┘ │ │
│ │ │ │ │ │
│ │ ▼ ▼ │ │
│ │ ┌──────────────┐ ┌──────────────┐ │ │
│ │ │ Controllers │ │ Domain │ │ │
│ │ │ & Routes │ │ (Entities) │ │ │
│ │ └──────────────┘ └──────────────┘ │ │
│ │ │ │ │
│ │ ▼ │ │
│ │ ┌──────────────┐ ┌──────────────┐ │ │
│ │ │ Repositories │◀────│ Ports │ │ │
│ │ │(Prisma/SQL) │ │ (Interfaces) │ │ │
│ │ └──────────────┘ └──────────────┘ │ │
│ └──────────────────────────────────────────────────────┘ │
└────────────────────────────┬────────────────────────────────┘
│ SQL (solo gold)
▼
┌─────────────────────────────────────────────────────────────┐
│ PostgreSQL (Port 5433) │
│ │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │
│ │ raw │───▶│ clean │───▶│ gold │ │
│ │ (CSV raw) │ │ (Limpieza) │ │Star Schema │ │
│ └──────────────┘ └──────────────┘ └──────────────┘ │
│ │ │
│ ▼ │
│ ┌────────────────┐ │
│ │ fact_sales │ │
│ │ dim_date │ │
│ │ dim_customer │ │
│ │ dim_product │ │
│ │ dim_order │ │
│ └────────────────┘ │
└─────────────────────────────────────────────────────────────┘

### Flujo de Datos

1. **Ingesta**: CSV → `raw.*` (copia exacta)
2. **Limpieza**: `raw.*` → `clean.*` (tipos correctos, normalización)
3. **Transformación**: `clean.*` → `gold.*` (esquema estrella)
4. **Consulta**: Backend consulta solo `gold.fact_sales` (JOIN a dimensiones)
5. **Presentación**: Frontend consume API y visualiza

## Tecnologías Utilizadas

### Backend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Node.js** | 18.x | Entorno de ejecución |
| **Express** | 4.18 | Framework web |
| **TypeScript** | 5.x | Tipado estático |
| **Prisma** | 5.x | ORM y migraciones |
| **Zod** | 3.x | Validación de datos |
| **Jest** | 29.x | Testing unitario |
| **Supertest** | 7.x | Testing de integración |

### Frontend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Next.js** | 14.0.3 | Framework React |
| **TypeScript** | 5.x | Tipado estático |
| **Tailwind CSS** | 3.x | Estilos |
| **Recharts** | 2.x | Gráficos |
| **React Query** | 3.x | Estado del servidor |
| **Axios** | 1.x | Cliente HTTP |
| **Lucide React** | - | Iconos |

### Base de Datos
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **PostgreSQL** | 15 | Base de datos relacional |
| **PL/pgSQL** | - | Funciones almacenadas |

### Infraestructura
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Docker** | 24.0+ | Contenedores |
| **Docker Compose** | 2.20+ | Orquestación |
| **Git** | - | Control de versiones |

##  Estructura del Proyecto

commercial-kpi-dashboard/
├── 📁 backend/ # Backend Node.js + Express
│ ├── 📁 src/
│ │ ├── 📁 domain/ # Entidades y puertos
│ │ │ ├── entities/ # KPI, TopProduct, etc.
│ │ │ ├── value-objects/ # DateRange, FilterParams
│ │ │ └── ports/ # IKpiRepository interface
│ │ │
│ │ ├── 📁 application/ # Casos de uso
│ │ │ ├── use-cases/ # GetKpis, GetRevenueTrend, GetTopProducts
│ │ │ └── dtos/ # KpiResponseDto, etc.
│ │ │
│ │ ├── 📁 infrastructure/ # Implementaciones
│ │ │ ├── database/ # Prisma client, schema
│ │ │ └── repositories/ # PrismaKpiRepository
│ │ │
│ │ └── 📁 adapters/ # Interfaces externas
│ │ ├── http/ # Routes
│ │ ├── controllers/ # KpiController
│ │ ├── middleware/ # Error handler, validation
│ │ └── validators/ # Zod schemas
│ │
│ ├── 📁 tests/ # Tests
│ │ ├── unit/ # Use cases tests
│ │ └── integration/ # API tests
│ │
│ └── 📁 scripts/ # Scripts ETL específicos
│
├── 📁 frontend/ # Frontend Next.js
│ ├── 📁 src/
│ │ ├── 📁 app/ # Páginas (App Router)
│ │ │ ├── page.tsx # Overview
│ │ │ ├── rankings/page.tsx # Rankings
│ │ │ ├── trends/page.tsx # Trends
│ │ │ └── products/page.tsx # Products
│ │ │
│ │ ├── 📁 components/ # Componentes React
│ │ │ ├── layout/ # DashboardLayout
│ │ │ ├── kpi-cards/ # KPICard, KPIGrid
│ │ │ ├── charts/ # RevenueTrendChart, TopProductsChart
│ │ │ ├── filters/ # GlobalFilters, DateRangeFilter
│ │ │ └── ui/ # Card, Button, Tabs
│ │ │
│ │ ├── 📁 hooks/ # Custom hooks
│ │ │ ├── useKPI.ts # React Query hooks
│ │ │ ├── useFilters.ts # Filters state
│ │ │ └── useHydration.ts # Hydration fix
│ │ │
│ │ ├── 📁 lib/ # Utilidades
│ │ │ ├── api/ # Cliente Axios
│ │ │ └── utils.ts # Formatters, cn
│ │ │
│ │ └── 📁 types/ # TypeScript types
│ │
│ └── 📁 public/ # Archivos estáticos
│
├── 📁 docker/ # Configuración Docker
│ ├── 📁 backend/ # Dockerfile backend
│ ├── 📁 frontend/ # Dockerfile frontend
│ └── 📁 postgres/ # Scripts SQL iniciales
│ ├── 01-create-schemas.sql
│ ├── 02-create-raw-tables.sql
│ ├── 03-create-clean-tables.sql
│ └── 04-create-star-schema.sql
│
├── 📁 scripts/ # Scripts ETL generales
│ ├── move-csv-files.sh # Mover CSVs al proyecto
│ ├── load-raw-data.sh # Cargar raw
│ ├── transform-raw-to-clean.sh # Limpiar datos
│ ├── build-star-schema.sh # Construir gold
│ └── verify-gold-schema.sh # Verificar datos
│
├── 📁 data/ # Datos CSV
│ └── 📁 raw/ # Archivos CSV de Olist
│
├── docker-compose.yml # Orquestación de servicios
├── .env.example # Variables de entorno ejemplo
└── INSTALL.md # Guía de instalación 

## Modelo de Datos

### Capas de Datos

| Esquema | Descripción | Tablas |
|---------|-------------|--------|
| **raw** | Datos crudos de los CSV | customers, orders, order_items, products, sellers, payments, reviews, geolocation |
| **clean** | Datos limpios y normalizados | customers, orders, order_items, products, sellers, payments |
| **gold** | Esquema estrella analítico | fact_sales, dim_date, dim_customer, dim_product, dim_order |

### Tabla de Hechos: `gold.fact_sales`

**Grano**: 1 fila por item de orden (`order_id` + `order_item_id`)

| Columna | Tipo | Descripción | KPI |
|---------|------|-------------|-----|
| fact_sales_sk | SERIAL | Clave primaria | - |
| order_sk | INTEGER | FK a dim_order | - |
| customer_sk | INTEGER | FK a dim_customer | - |
| product_sk | INTEGER | FK a dim_product | - |
| date_sk | INTEGER | FK a dim_date | - |
| order_id | VARCHAR(50) | ID de la orden | - |
| order_item_id | INTEGER | Número de item | - |
| item_price | DECIMAL | Precio del item | GMV |
| freight_value | DECIMAL | Valor del envío | - |
| total_order_value | DECIMAL | Valor total | - |
| payment_value_allocated | DECIMAL | Pago prorrateado | Revenue |
| is_canceled | BOOLEAN | Flag de cancelación | Cancel Rate |
| is_delivered | BOOLEAN | Flag de entrega | - |
| is_on_time | BOOLEAN | Flag de entrega a tiempo | On-Time Rate |

### Dimensiones

#### `gold.dim_date` (1,139 días)
| Columna | Tipo | Descripción |
|---------|------|-------------|
| date_sk | SERIAL | Clave surrogate |
| full_date | DATE | Fecha completa |
| year | INTEGER | Año |
| quarter | INTEGER | Trimestre |
| month | INTEGER | Mes |
| month_name | VARCHAR | Nombre del mes |
| week | INTEGER | Semana del año |
| day_of_week | INTEGER | Día de la semana |
| day_name | VARCHAR | Nombre del día |
| is_weekend | BOOLEAN | Flag de fin de semana |

#### `gold.dim_customer` (99,441 registros)
| Columna | Tipo | Descripción |
|---------|------|-------------|
| customer_sk | SERIAL | Clave surrogate |
| customer_id | VARCHAR | ID del cliente |
| customer_unique_id | VARCHAR | ID único |
| customer_city | VARCHAR | Ciudad |
| customer_state | VARCHAR | Estado (UF) |
| customer_zip_code_prefix | VARCHAR | Prefijo CEP |

#### `gold.dim_product` (32,951 registros)
| Columna | Tipo | Descripción |
|---------|------|-------------|
| product_sk | SERIAL | Clave surrogate |
| product_id | VARCHAR | ID del producto |
| product_category_name | VARCHAR | Categoría (PT) |
| product_category_name_english | VARCHAR | Categoría (EN) |
| product_weight_g | INTEGER | Peso en gramos |
| product_length_cm | INTEGER | Largo |
| product_height_cm | INTEGER | Alto |
| product_width_cm | INTEGER | Ancho |

#### `gold.dim_order` (99,441 registros)
| Columna | Tipo | Descripción |
|---------|------|-------------|
| order_sk | SERIAL | Clave surrogate |
| order_id | VARCHAR | ID de la orden |
| customer_id | VARCHAR | ID del cliente |
| order_status | VARCHAR | Estado |
| order_purchase_timestamp | TIMESTAMP | Fecha de compra |
| order_approved_at | TIMESTAMP | Fecha de aprobación |
| order_delivered_carrier_date | TIMESTAMP | Fecha envío |
| order_delivered_customer_date | TIMESTAMP | Fecha entrega |
| order_estimated_delivery_date | TIMESTAMP | Fecha estimada |

### Prorrateo de Pagos

Para mantener el grano de 1 fila por item, los pagos se prorratean usando:

```sql
payment_value_allocated = (item_price / total_order_price) * total_payment_valueEjemplo:

Orden #123 con 2 items:

Item A: R$ 100

Item B: R$ 200

Pago total: R$ 270

Cálculos:

Item A: (100 / 300) * 270 = R$ 90

Item B: (200 / 300) * 270 = R$ 180

Total prorrateado: R$ 270 ✓

KPIs Implementados
KPI	Fórmula	Descripción	Filtros
GMV	SUM(item_price)	Gross Merchandise Value	✅
Revenue	SUM(payment_value_allocated)	Ingresos reales	✅
Orders	COUNT(DISTINCT order_id)	Número de órdenes	✅
AOV	Revenue / Orders	Average Order Value	✅
Items per Order	COUNT(order_item_id) / Orders	Items por orden	✅
Cancel Rate	cancelled_orders / total_orders	Tasa de cancelación	✅
On-Time Delivery	delivered_on_time / delivered_total	Entregas a tiempo	✅
📡 API Endpoints
GET /api/health
Health check del servidor.

GET /api/kpis
Obtiene los KPIs principales con filtros.

Parámetros:

from (requerido): Fecha inicial (YYYY-MM-DD)

to (requerido): Fecha final (YYYY-MM-DD)

orderStatus (opcional): Estado(s) de orden

productCategory (opcional): Categoría(s) de producto

customerState (opcional): Estado(s) del cliente

GET /api/trend/revenue
Obtiene la tendencia de revenue.

Parámetros:

from (requerido): Fecha inicial

to (requerido): Fecha final

grain (opcional): 'day' | 'week' | 'month'

GET /api/rankings/products
Obtiene el ranking de productos.

Parámetros:

from (requerido): Fecha inicial

to (requerido): Fecha final

metric (opcional): 'gmv' | 'revenue'

limit (opcional): 1-100

 Decisiones Técnicas
1. Arquitectura Hexagonal en Backend
Motivación: Separación clara de responsabilidades, fácil testing

Beneficio: Los use cases son independientes de frameworks y BD

Implementación: Domain (entities + ports), Application (use cases), Infrastructure (repos), Adapters (HTTP)

2. Esquema Estrella en Gold
Motivación: Optimizado para consultas analíticas

Grano: 1 fila por item (permite análisis a nivel producto)

Prorrateo: Proporcional al precio (Opción A) para mantener consistencia

Validación: Diferencia < 2% entre pagos originales y prorrateados

3. Prisma + SQL Raw
Motivación: Type safety + control fino en consultas complejas

Uso: Prisma para modelos, SQL raw para KPIs (mejor performance)

4. Next.js App Router
Motivación: Server components, routing intuitivo

Client Components: Solo donde hay interactividad (filtros, gráficos)

5. Diseño Glassmorphism
Motivación: Moderno, profesional, buena UX

Implementación: Tailwind CSS + efectos de blur y gradientes

6. React Query para Estado
Motivación: Caching automático, revalidación, manejo de errores

Configuración: StaleTime 5min, retry 1 vez

7. Validación con Zod
Motivación: TypeScript first, composable, excelente DX

Uso: Validación de queries en backend y frontend

8. Docker Compose
Motivación: Entorno reproducible, fácil despliegue

Servicios: PostgreSQL, Backend, Frontend

Healthchecks: Todos los servicios verifican su estado

 Estadísticas del Dataset

Tabla	Registros	Tamaño
customers	99,441	19 MB
orders	99,441	32 MB
order_items	112,650	33 MB
order_payments	103,886	24 MB
products	32,951	6 MB
sellers	3,095	544 KB
geolocation	1,000,163	68 MB
fact_sales	112,647	-

 Tests

Tipo	Archivo	Tests
Unitario	get-kpis.use-case.test.ts	3
Unitario	get-revenue-trend.use-case.test.ts	4
Unitario	get-top-products.use-case.test.ts	5
Integración	kpi-api.test.ts	8
Total		20

Archivos de Configuración Clave

docker-compose.yml: Orquestación de servicios

.env.example: Variables de entorno

backend/prisma/schema.prisma: Modelo de datos

frontend/tailwind.config.js: Estilos

backend/jest.config.js: Testing


