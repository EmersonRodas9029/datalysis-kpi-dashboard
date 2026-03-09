# 📊 Commercial KPI Dashboard

<div align="center">
  
  ![Next.js](https://img.shields.io/badge/Next.js-14.0.3-000000?style=for-the-badge&logo=next.js&logoColor=white)
  ![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
  ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-316192?style=for-the-badge&logo=postgresql&logoColor=white)
  ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
  
  <h3>🚀 Dashboard Analítico para E-commerce | 100k+ Órdenes | Tiempo Real</h3>
  
  [📋 Descripción](#-descripción-general) • 
  [🏗️ Arquitectura](#️-arquitectura) • 
  [⚡ Inicio Rápido](#-inicio-rápido) • 
  [📊 KPIs](#-kpis-implementados) • 
  [🔧 Stack](#-tecnologías-utilizadas)
  
  <br>
  
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%">
  
</div>

## 🌟 Descripción General

Dashboard comercial de alto rendimiento construido con **Next.js 14**, **Node.js** y **PostgreSQL** que transforma el dataset público de Olist (e-commerce brasileño con +100k órdenes) en una herramienta de análisis en tiempo real.

### ✨ Características Destacadas

<div align="center">
  <table>
    <tr>
      <td align="center">📈</td>
      <td><b>7 KPIs</b> en tiempo real con actualización dinámica</td>
      <td align="center">🏆</td>
      <td><b>Rankings</b> de productos por GMV y Revenue</td>
    </tr>
    <tr>
      <td align="center">📊</td>
      <td><b>Tendencias</b> con granularidad diaria/semanal/mensual</td>
      <td align="center">🔍</td>
      <td><b>Filtros avanzados</b> por fecha, estado, categoría</td>
    </tr>
    <tr>
      <td align="center">🎨</td>
      <td><b>Glassmorphism</b> con animaciones fluidas</td>
      <td align="center">⚡</td>
      <td><b>Arquitectura hexagonal</b> + Esquema estrella</td>
    </tr>
  </table>
</div>

<br>

## 🏗️ Arquitectura

### Vista General del Sistema

```mermaid
graph TB
    subgraph Frontend["🎨 Frontend (Next.js 14 - Port 3000)"]
        A1[Pages<br/>Overview/Rankings/Trends]
        A2[Components<br/>KPICards/Charts/Filters]
        A3[State<br/>React Query + Hooks]
    end
    
    subgraph Backend["⚙️ Backend (Node.js - Port 4000)"]
        direction TB
        B1[Adapters<br/>HTTP/Routes]
        B2[Use Cases<br/>Application Layer]
        B3[Domain<br/>Entities/Ports]
        B4[Infrastructure<br/>Repositories/Prisma]
        
        B1 <--> B2 <--> B3
        B2 <--> B4
    end
    
    subgraph Database["🗄️ PostgreSQL (Port 5433)"]
        direction LR
        C1[(raw<br/>CSV Raw)]
        C2[(clean<br/>Limpieza)]
        C3[(gold<br/>Star Schema)]
        
        C1 --> C2 --> C3
    end
    
    Frontend -->|HTTP REST| Backend
    Backend -->|SQL| Database
    
    style Frontend fill:#f9f,stroke:#333,stroke-width:2px
    style Backend fill:#bbf,stroke:#333,stroke-width:2px
    style Database fill:#bfb,stroke:#333,stroke-width:2px

🔄 Flujo de Datos ETL
<div align="center">
Capa	Esquema	Propósito	Tablas
🟤 Raw	raw	Datos crudos CSV	customers, orders, items, products
🟡 Clean	clean	Normalización	datos limpios con tipos correctos
🟢 Gold	gold	⭐ Star Schema	fact_sales, dim_date, dim_customer, dim_product
</div>

📦 Estructura de Contenedores Docker

┌─────────────────────────────────────────────────────────────┐
│                     Docker Compose                          │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Frontend   │  │   Backend    │  │  PostgreSQL  │      │
│  │   Node 18    │◀─┤   Node 18    │──┤    Port      │      │
│  │   Port 3000  │  │   Port 4000  │  │    5433      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                 │                 │               │
│         └─────────────────┴─────────────────┘               │
│                    Red: dashboard-network                    │
└─────────────────────────────────────────────────────────────┘

🚀 Inicio Rápido

📋 Prerrequisitos

Node.js ≥ 18.x
Docker ≥ 24.0
Docker Compose ≥ 2.20
Make (opcional)

⚡ Instalación en 3 Pasos

# 1. Clonar y configurar

git clone https://github.com/tu-usuario/commercial-kpi-dashboard.git

cd commercial-kpi-dashboard

cp .env.example .env


# 2. Descargar dataset de Olist

# Colocar archivos CSV en ./data/raw/


# 3. ¡Levantar todo con un comando!

docker-compose up -d

🔍 Verificar Instalación

# Health check

curl http://localhost:4000/api/health

# Abrir dashboard

open http://localhost:3000


📊 KPIs 

<div align="center">

KPI	Fórmula	Descripción	Filtrable

💰 GMV	SUM(item_price)	Gross Merchandise Value	✅

💵 Revenue	SUM(payment_value_allocated)	Ingresos reales	✅

📦 Orders	COUNT(DISTINCT order_id)	Número de órdenes	✅

📈 AOV	Revenue / Orders	Average Order Value	✅

🛒 Items/Order	COUNT(items) / Orders	Items por orden	✅

❌ Cancel Rate	cancelled_orders / total_orders	Tasa de cancelación	✅

⏱️ On-Time	delivered_on_time / delivered_total	Entregas a tiempo	✅

</div>

📡 API REST

Endpoints Principales

# Health Check

GET  /api/health

# KPIs principales con filtros

GET  /api/kpis?from=2024-01-01&to=2024-12-31

# Tendencia de revenue

GET  /api/trend/revenue?grain=month&from=2024-01-01&to=2024-12-31

# Ranking de productos

GET  /api/rankings/products?metric=gmv&limit=10


💾 Modelo de Datos (Esquema Estrella)

-- Tabla de Hechos: fact_sales (112,647 registros)
┌─────────────────┐
│   fact_sales    │
├─────────────────┤
│ 🆔 fact_sales_sk│────┐
│    order_sk     │←───┐│
│    customer_sk  │←──┐││
│    product_sk   │←─┐│││
│    date_sk      │←┐││││
│    item_price   │ │││││
│    is_canceled  │ │││││
└─────────────────┘ │││││
                     ││││└───────┐
┌─────────────────┐  │││└──────────┐
│   dim_order     │  ││└───────────┐│
├─────────────────┤  │└────────────┐││
│ 🆔 order_sk     │──┘              │││
│    order_status │                 │││
│    purchase_date│                 │││
└─────────────────┘                  │││
                                     ▼▼▼
┌─────────────────┐              ┌─────────────┐
│  dim_customer   │              │  dim_date   │
├─────────────────┤              ├─────────────┤
│ 🆔 customer_sk  │──┐           │ 🆔 date_sk │
│    customer_id  │  │           │  full_date  │
│    customer_city│  │           │  year       │
└─────────────────┘  │           │  month      │
                     │           └─────────────┘
┌─────────────────┐  │
│   dim_product   │  │
├─────────────────┤  │
│ 🆔 product_sk   │──┘
│    product_name │
│    category     │
└─────────────────┘

📊 Estadísticas del Dataset

<div align="center">

Tabla	Registros	Tamaño	Descripción

customers	99,441	19 MB	Clientes únicos

orders	99,441	32 MB	Órdenes completas

order_items	112,650	33 MB	Items por orden

products	32,951	6 MB	Catálogo de productos

fact_sales	112,647	-	Hechos analíticos

geolocation	1,000,163	68 MB	Datos geográficos

</div>


🛠️ Tecnologías Utilizadas

<details> <summary><b>🔧 Backend</b></summary> <br>

Tecnología	Versión	Propósito

Node.js	18.x	Entorno de ejecución

Express	4.18	Framework web

TypeScript	5.x	Tipado estático

Prisma	5.x	ORM + Migraciones

Zod	3.x	Validación

Jest	29.x	Testing

Supertest	7.x	Testing API

</details><details> <summary><b>🎨 Frontend</b></summary> <br>

Tecnología	Versión	Propósito

Next.js	14.0.3	React Framework

TypeScript	5.x	Tipado estático

Tailwind CSS	3.x	Estilos

Recharts	2.x	Gráficos

React Query	3.x	Estado servidor

Axios	1.x	HTTP Client

Lucide	-	Iconos

</details><details> <summary><b>🐳 Infraestructura</b></summary> <br>

Tecnología	Versión	Propósito

Docker	24.0+	Contenedores

Docker Compose	2.20+	Orquestación

PostgreSQL	15	Base de datos

Git	-	Versionado

</details>


🧪 Testing

<div align="center">

Tipo	Archivo	Tests	Cobertura

✅ Unitario	get-kpis.use-case.test.ts	3	95%

✅ Unitario	get-revenue-trend.test.ts	4	92%

✅ Unitario	get-top-products.test.ts	5	94%

🔄 Integración	kpi-api.test.ts	8	88%

Total		20	92%

</div>

🎯 Decisiones Técnicas Clave

<details open> <summary><b>🏛️ 1. Arquitectura Hexagonal</b></summary>

Motivación: Separación clara de responsabilidades y fácil testing.

Beneficio: Los casos de uso son independientes de frameworks y BD.

// Dominio puro - sin dependencias externas
export interface IKpiRepository {
  getKpis(filters: FilterParams): Promise<KPI>;
}

// Caso de uso - lógica de negocio
export class GetKpisUseCase {
  constructor(private repository: IKpiRepository) {}
  
  async execute(filters: FilterParams): Promise<KPI> {
    return this.repository.getKpis(filters);
  }
}

</details><details> <summary><b>⭐ 2. Esquema Estrella + Prorrateo</b><
/summary>

Motivación: Optimizado para consultas analíticas con grano a nivel producto.


Prorrateo: Proporcional al precio para mantener consistencia.

-- Cálculo de revenue prorrateado
payment_value_allocated = 
  (item_price / total_order_price) * total_payment_value

Validación: Diferencia < 2% entre pagos originales y prorrateados.

</details><details> <summary><b>🔐 3. Validación con Zod</b></summary>

Motivación: TypeScript-first, composable, excelente DX.

const kpiQuerySchema = z.object({
  from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  orderStatus: z.string().optional(),
  productCategory: z.string().optional()
});

</details>

📁 Estructura del Proyecto

commercial-kpi-dashboard/
├── 📦 backend/
│   ├── src/
│   │   ├── domain/          # Entidades y puertos
│   │   ├── application/      # Casos de uso
│   │   ├── infrastructure/   # Prisma, repositorios
│   │   └── adapters/        # HTTP, controllers
│   └── tests/
├── 🎨 frontend/
│   ├── src/
│   │   ├── app/             # Páginas (App Router)
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom hooks
│   │   └── lib/             # Utilidades
│   └── public/
├── 🐳 docker/
│   ├── backend/             # Dockerfile backend
│   ├── frontend/            # Dockerfile frontend
│   └── postgres/            # SQL inicial
├── 📜 scripts/              # ETL scripts
├── 📊 data/                 # CSV files
└── 📄 docker-compose.yml

