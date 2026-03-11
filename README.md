#   Commercial KPI Dashboard - Olist E-Commerce Analysis

<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=30&duration=3000&pause=1000&color=6366F1&center=true&vCenter=true&width=600&lines=Dashboard+Anal%C3%ADtico+E-commerce;100%2C000%2B+%C3%93rdenes+Procesadas;Next.js+%2B+Node.js+%2B+PostgreSQL;Arquitectura+Hexagonal+%2B+Star+Schema" alt="Typing SVG" />
  <br>
  <p align="center">
    <a href="#-visión-general">
      <img src="https://img.shields.io/badge/_VISIÓN_GENERAL-6366F1?style=for-the-badge" />
    </a>
    <a href="#-arquitectura-del-sistema">
      <img src="https://img.shields.io/badge/_ARQUITECTURA-10B981?style=for-the-badge" />
    </a>
    <a href="#-kpis-en-acción">
      <img src="https://img.shields.io/badge/_KPIS_EN_ACCIÓN-F59E0B?style=for-the-badge" />
    </a>
    <a href="#-stack-tecnológico">
      <img src="https://img.shields.io/badge/⚡_STACK_TECNOLÓGICO-EF4444?style=for-the-badge" />
    </a>
    <img src="https://img.shields.io/badge/Prueba_Técnica-Completada-success?style=for-the-badge" />
  </p>
  <br>

  <!-- BADGES PRINCIPALES -->
  <p align="center">
    <img src="https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white" />
    <img src="https://img.shields.io/badge/Node.js_18-339933?style=for-the-badge&logo=node.js&logoColor=white" />
    <img src="https://img.shields.io/badge/PostgreSQL_15-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  </p>

  <!-- CONTADORES DINÁMICOS CON DATOS REALES -->
  <p align="center">
    <img src="https://img.shields.io/badge/_99.441_CLIENTES-8B5CF6?style=flat-square" />
    <img src="https://img.shields.io/badge/_112.647_TRANSACCIONES-EC4899?style=flat-square" />
    <img src="https://img.shields.io/badge/_R%2415.8M_REVENUE-10B981?style=flat-square" />
    <img src="https://img.shields.io/badge/_98.665_ÓRDENES-6366F1?style=flat-square" />
  </p>
  <br>

  <!-- DIVISOR ANIMADO -->
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%">
</div>


##  VALOR DE NEGOCIO

<table align="center">
  <tr>
    <td align="center" width="33%">
      <img src="https://img.icons8.com/fluency/96/000000/decision.png" width="64" />
      <br>
      <b>Decisiones Data-Driven</b>
      <br>
      <sub>7 KPIs críticos para dirección comercial basados en datos reales de Olist</sub>
    </td>
    <td align="center" width="33%">
      <img src="https://img.icons8.com/fluency/96/000000/visible.png" width="64" />
      <br>
      <b>Visibilidad 360°</b>
      <br>
      <sub>Del checkout a la entrega final - Análisis completo del embudo de ventas</sub>
    </td>
    <td align="center" width="33%">
      <img src="https://img.icons8.com/fluency/96/000000/alarm.png" width="64" />
      <br>
      <b>Alertas Tempranas</b>
      <br>
      <sub>Detección de tendencias y anomalías en +98k órdenes procesadas</sub>
    </td>
  </tr>
</table>

## 🏗️ ARQUITECTURA DEL SISTEMA

<div align="center">
  <h3> Diseño Hexagonal + Esquema Estrella</h3>
</div>

<table align="center">
  <tr>
    <td width="33%" valign="top" bgcolor="#0D1117">
      <h3 align="center"> FRONTEND</h3>
      <p align="center"><i>Capa de Presentación</i></p>
      <ul>
        <li> Next.js 15 App Router</li>
        <li> Componentes modulares con TypeScript</li>
        <li> TanStack Query + Hooks personalizados</li>
        <li> Glassmorphism UI con Tailwind CSS</li>
        <li> Responsive Design y animaciones</li>
      </ul>
    </td>
    <td width="33%" valign="top" bgcolor="#0D1117">
      <h3 align="center"> BACKEND</h3>
      <p align="center"><i>Capa de Negocio</i></p>
      <ul>
        <li> Node.js + Express con TypeScript</li>
        <li> Arquitectura Hexagonal (Domain/Application/Infrastructure)</li>
        <li> Casos de Uso Independientes</li>
        <li> Validación con Zod</li>
        <li> Prisma ORM con PostgreSQL</li>
      </ul>
    </td>
    <td width="33%" valign="top" bgcolor="#0D1117">
      <h3 align="center"> BASE DE DATOS</h3>
      <p align="center"><i>Capa de Persistencia</i></p>
      <ul>
        <li> PostgreSQL 15 con 3 esquemas</li>
        <li> Pipeline ETL: raw → clean → gold</li>
        <li> Esquema Estrella (fact_sales + dimensiones)</li>
        <li> Índices Optimizados</li>
        <li> Prorrateo de pagos por item</li>
      </ul>
    </td>
  </tr>
</table>


### 📊 Diagrama de Flujo de Datos

```
┌───────────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND (Next.js 15)                                │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐          │
│  │ Browser │───▶│   App   │───▶│  React  │───▶│ TanStack│───▶│  API    │          │
│  │         │    │  Router │    │   Comp  │    │  Query  │    │ Client  │          │
│  └─────────┘    └─────────┘    └─────────┘    └─────────┘    └────┬────┘          │
└─────────────────────────────────────────────────────────────────────┬─────────────┘
                                                                       │
                                                                       ▼
┌───────────────────────────────────────────────────────────────────────────────────┐
│                            BACKEND (Node.js + Express)                            │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐          │
│  │ Routes  │───▶│Control- │───▶│  Use    │───▶│Reposito-│───▶│ Prisma  │          │
│  │ /api/*  │    │  llers  │    │ Cases   │    │  ries   │    │ Client  │          │
│  └─────────┘    └─────────┘    └─────────┘    └─────────┘    └────┬────┘          │
└─────────────────────────────────────────────────────────────────────┬─────────────┘
                                                                       │
                                                                       ▼
┌────────────────────────────────────────────────────────────────────────────────────┐
│                             BASE DE DATOS (PostgreSQL 15)                          │
│                                                                                    │
│                    ┌─────────────────────────────────────────┐                     │
│                    │              gold schema                │                     │
│                    │                                         │                     │
│                    │    ┌─────────────────────┐              │                     │
│                    │    │    fact_sales       │              │                     │
│                    │    │    112,647 rows     │              │                     │
│                    │    └──────────┬──────────┘              │                     │
│                    │         ┌──────┼──────┐                 │                     │
│                    │         ▼      ▼      ▼                 │                     │
│                    │   ┌──────┐ ┌──────┐ ┌──────┐            │                     │
│                    │   │dim_  │ │dim_  │ │dim_  │            │                     │
│                    │   │date  │ │cust  │ │prod  │            │                     │
│                    │   └──────┘ └──────┘ └──────┘            │                     │
│                    │         │      │      │                 │                     │
│                    │         └──────┼──────┘                 │                     │
│                    │            ┌────▼────┐                  │                     │
│                    │            │dim_order│                  │                     │
│                    │            └─────────┘                  │                     │
│                    └─────────────────────────────────────────┘                     │
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘
                                                                           ▲
                                                                           │
┌─────────────────────────────────────────────────────────────────────────┴──────────┐
│                                   ETL Pipeline                                     │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐                          │
│  │  CSV    │───▶│  Load   │───▶│  Clean  │───▶│  Star   │──────────────────────────┘
│  │  Files  │    │ Scripts │    │Transform│    │Schema   │
│  └─────────┘    └─────────┘    └─────────┘    └─────────┘
└────────────────────────────────────────────────────────────────────────────────────┘
```

### 🔄 Flujo de una Petición

| Paso | Componente | Acción |
|------|------------|--------|
| 1 | **Frontend** | Usuario aplica filtros en `GlobalFilters` |
| 2 | **React Query** | Hook `useKPIs` invalida query y hace fetch |
| 3 | **API Client** | Axios envía GET a `/api/kpis?from=...&to=...` |
| 4 | **Backend** | Express enruta a `KpiController.getKpis()` |
| 5 | **Use Case** | `GetKpisUseCase` ejecuta lógica de negocio |
| 6 | **Repository** | `PrismaKpiRepository` ejecuta query SQL |
| 7 | **Database** | PostgreSQL devuelve agregaciones |
| 8 | **Response** | Datos fluyen de vuelta al frontend |
| 9 | **UI** | `KPIGrid` re-renderiza con nuevos datos |

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%">



##  Pipeline de Datos ETL

### ⭐ Modelo Estrella Detallado

#### Diagrama de Relaciones

```
┌─────────────────┐         ┌──────────────────────────────────┐        ┌─────────────────┐
│   dim_date      │         │          fact_sales             │         │   dim_product   │
│  date_sk (PK)   │◀────┐   │  fact_sales_sk (PK)             │   ┌────▶│ product_sk (PK) │
│  full_date      │     │   │  order_sk (FK)    ──────────┐   │   │     │ product_id      │
│  year           │     │   │  customer_sk (FK) ────────┐ │   │   │     │ category_name   │
│  quarter        │     │   │  product_sk (FK) ──────┐   │ │   │   │    │ ...             │
│  month          │     │   │  date_sk (FK)    ────┐   │   │ │   │   │  └─────────────────┘
│  month_name     │     │   │  item_price          │   │   │ │   │   │            │
│  week           │     │   │  freight_value       │   │   │ │   │   │            │
│  day_of_week    │     │   │  payment_allocated   │   │   │ │   │   │            │
│  day_name       │     │   │  is_canceled         │   │   │ │   │   │            │
│  is_weekend     │     │   │  is_delivered        │   │   │ │   │   │            │
└─────────────────┘     │   │  is_on_time          │   │   │ │   │   │            │
                        │   └───────────────────────│───│───│─│───│───│───────────┘
                        │                           │   │   │ │   │   │
                        └───────────────────────────┼───┼───┼─┼───┼───┘
                                                    │   │   │ │   │
                        ┌───────────────────────────┼───┼───┼─┼───┼────┐
                        │                           │   │   │ │   │    │
                        ▼                           ▼   │   │ ▼   │    ▼
              ┌─────────────────┐              ┌─────────┐ │ ┌─────────────────┐
              │  dim_customer   │              │dim_order│ │ │    dim_order    │
              │ customer_sk (PK)│◀─────────────│order_sk │◀┘ │ order_sk (PK)   │
              │ customer_id     │              │ (FK)    │   │ order_id        │
              │ customer_state  │              └─────────┘   │ order_status    │
              │ ...             │                            │ purchase_date   │
              └─────────────────┘                            │ approved_date   │
                                                             │ delivered_date  │
                                                             │ estimated_date  │
                                                             └─────────────────┘
```

#### 📏 Grano de la Tabla de Hechos

<table align="center">
  <tr>
    <td width="50%" bgcolor="#0D1117">
      <h3 align="center">✅ Decisión</h3>
      <p align="center"><b>1 fila por ítem de orden</b></p>
      <p align="center"><code>order_id</code> + <code>order_item_id</code></p>
    </td>
    <td width="50%" bgcolor="#0D1117">
      <h3 align="center">📊 Impacto</h3>
      <p align="center"><b>112,647 filas</b> vs 99,441 si fuera por orden</p>
      <p align="center"><i>+13% de filas por máxima flexibilidad</i></p>
    </td>
  </tr>
</table>

#### 🔑 Índices Optimizados

```sql
-- Índices para consultas analíticas (< 2 segundos en +100k registros)
CREATE INDEX idx_fact_sales_date ON fact_sales(date_sk);
CREATE INDEX idx_fact_sales_product ON fact_sales(product_sk);
CREATE INDEX idx_fact_sales_customer ON fact_sales(customer_sk);
CREATE INDEX idx_fact_sales_order ON fact_sales(order_sk);
CREATE INDEX idx_fact_sales_status ON fact_sales(is_canceled, is_delivered);
CREATE INDEX idx_fact_sales_on_time ON fact_sales(is_on_time) WHERE is_delivered = true;
```

#### 💾 Detalle de Columnas por Tabla

<details>
<summary><b>📅 dim_date (1,139 rows)</b></summary>

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `date_sk` | INTEGER | PK - Surrogate key |
| `full_date` | DATE | Fecha completa (YYYY-MM-DD) |
| `year` | INTEGER | Año |
| `quarter` | INTEGER | Trimestre (1-4) |
| `month` | INTEGER | Mes (1-12) |
| `month_name` | VARCHAR(20) | Nombre del mes |
| `week` | INTEGER | Semana del año |
| `day_of_week` | INTEGER | Día de semana (1-7) |
| `day_name` | VARCHAR(20) | Nombre del día |
| `is_weekend` | BOOLEAN | TRUE si es sábado o domingo |
</details>

<details>
<summary><b>👤 dim_customer (99,441 rows)</b></summary>

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `customer_sk` | INTEGER | PK - Surrogate key |
| `customer_id` | VARCHAR(50) | ID original del cliente |
| `customer_unique_id` | VARCHAR(50) | ID único por cliente |
| `customer_city` | VARCHAR(100) | Ciudad |
| `customer_state` | VARCHAR(2) | Estado (UF) |
| `customer_zip_code_prefix` | VARCHAR(10) | Prefijo CEP |
</details>

<details>
<summary><b>📦 dim_product (32,951 rows)</b></summary>

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `product_sk` | INTEGER | PK - Surrogate key |
| `product_id` | VARCHAR(50) | ID original del producto |
| `product_category_name` | VARCHAR(100) | Categoría en portugués |
| `product_category_name_english` | VARCHAR(100) | Categoría en inglés |
| `product_weight_g` | INTEGER | Peso en gramos |
| `product_length_cm` | INTEGER | Largo en cm |
| `product_height_cm` | INTEGER | Alto en cm |
| `product_width_cm` | INTEGER | Ancho en cm |
</details>

<details>
<summary><b>📄 dim_order (99,441 rows)</b></summary>

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `order_sk` | INTEGER | PK - Surrogate key |
| `order_id` | VARCHAR(50) | ID original de la orden |
| `customer_id` | VARCHAR(50) | ID del cliente |
| `order_status` | VARCHAR(50) | Estado (delivered, shipped, etc.) |
| `order_purchase_timestamp` | TIMESTAMP | Fecha de compra |
| `order_approved_at` | TIMESTAMP | Fecha de aprobación |
| `order_delivered_carrier_date` | TIMESTAMP | Fecha envío a transportadora |
| `order_delivered_customer_date` | TIMESTAMP | Fecha entrega al cliente |
| `order_estimated_delivery_date` | TIMESTAMP | Fecha estimada de entrega |
</details>

<details>
<summary><b>💰 fact_sales (112,647 rows)</b></summary>

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `fact_sales_sk` | INTEGER | PK - Surrogate key |
| `order_sk` | INTEGER | FK → dim_order |
| `customer_sk` | INTEGER | FK → dim_customer |
| `product_sk` | INTEGER | FK → dim_product |
| `date_sk` | INTEGER | FK → dim_date (fecha de compra) |
| `order_id` | VARCHAR(50) | ID de orden (para trazabilidad) |
| `order_item_id` | INTEGER | Número de ítem en la orden |
| `item_price` | DECIMAL(10,2) | Precio del ítem |
| `freight_value` | DECIMAL(10,2) | Costo de envío |
| `total_order_value` | DECIMAL(10,2) | Valor total de la orden |
| `payment_value_allocated` | DECIMAL(10,2) | Pago prorrateado al ítem |
| `is_canceled` | BOOLEAN | TRUE si la orden fue cancelada |
| `is_delivered` | BOOLEAN | TRUE si la orden fue entregada |
| `is_on_time` | BOOLEAN | TRUE si entregó antes de fecha estimada |
</details>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%">

<p align="center">
  <img src="https://via.placeholder.com/900x200/1F2937/FFFFFF?text=Bronze+(raw)+→+Silver+(clean)+→+Gold+(star+schema):+Datos+Crudos+de+Olist+→+Limpieza+y+Normalización+→+Modelo+Analítico+con+Fact+%26+Dimensions" width="90%" style="border-radius: 10px;" />
</p>

###  Tablas Cargadas en Raw
- `customers`: 99,441 registros
- `geolocation`: 1,000,163 registros
- `orders`: 99,441 registros
- `order_items`: 112,650 registros
- `order_payments`: 103,886 registros
- `order_reviews`: 99,224 registros
- `products`: 32,951 registros
- `sellers`: 3,095 registros
- `product_category_name_translation`: 71 registros

###  Reglas de Limpieza (clean)
- Estandarización de textos (UPPER, INITCAP, TRIM)
- Manejo de valores NULL y ceros
- Validación de timestamps
- Traducción de categorías de productos
- Preservación de integridad referencial

###  Star Schema (gold)

#### Tabla de Hechos
- `fact_sales`: 112,647 registros (grano: 1 fila por item de orden)
  - `item_price`, `freight_value`
  - `payment_value_allocated` (pago prorrateado)
  - `is_canceled`, `is_delivered`, `is_on_time` (flags)

#### Dimensiones
- `dim_date`: 1,139 días (2016-09-04 a 2018-12-31)
- `dim_customer`: 99,441 clientes
- `dim_product`: 32,951 productos
- `dim_order`: 99,441 órdenes


 KPIS EN ACCIÓN
<div align="center"> <h3> 7 Métricas Críticas para tu Negocio</h3> </div><table align="center"> <tr> <td width="25%" align="center" bgcolor="#1F2937" style="border-radius: 10px; padding: 20px;"> <h1></h1> <h3>GMV</h3> <p><i>Gross Merchandise Value</i></p> <p><sub>Valor bruto total de mercancía</sub></p> <p><b>R$ 13.59M (2018)</b></p> </td> <td width="25%" align="center" bgcolor="#1F2937" style="border-radius: 10px; padding: 20px;"> <h1></h1> <h3>Revenue</h3> <p><i>Ingresos Reales</i></p> <p><sub>Pagos prorrateados por item</sub></p> <p><b>R$ 15.84M (2018)</b></p> </td> <td width="25%" align="center" bgcolor="#1F2937" style="border-radius: 10px; padding: 20px;"> <h1></h1> <h3>Órdenes</h3> <p><i>Volumen Total</i></p> <p><sub>Transacciones completadas</sub></p> <p><b>53,775 (2018)</b></p> </td> <td width="25%" align="center" bgcolor="#1F2937" style="border-radius: 10px; padding: 20px;"> <h1></h1> <h3>AOV</h3> <p><i>Average Order Value</i></p> <p><sub>Ticket promedio</sub></p> <p><b>R$ 160.76 (2018)</b></p> </td> </tr> <tr> <td width="25%" align="center" bgcolor="#1F2937" style="border-radius: 10px; padding: 20px;"> <h1></h1> <h3>Items/Orden</h3> <p><i>Densidad de Compra</i></p> <p><sub>Productos por transacción</sub></p> <p><b>1.14 (2018)</b></p> </td> <td width="25%" align="center" bgcolor="#1F2937" style="border-radius: 10px; padding: 20px;"> <h1></h1> <h3>Cancel Rate</h3> <p><i>Tasa de Cancelación</i></p> <p><sub>Órdenes no concretadas</sub></p> <p><b>0.46% (2018)</b></p> </td> <td width="25%" align="center" bgcolor="#1F2937" style="border-radius: 10px; padding: 20px;"> <h1></h1> <h3>On-Time</h3> <p><i>Entregas a Tiempo</i></p> <p><sub>Logística exitosa</sub></p> <p><b>90.9% (2018)</b></p> </td> <td width="25%" align="center" bgcolor="#1F2937" style="border-radius: 10px; padding: 20px;"> <h1></h1> <h3>Rankings</h3> <p><i>Top Productos</i></p> <p><sub>Por GMV y Revenue</sub></p> <p><b>health_beauty #1</b></p> </td> </tr> </table>


### 📐 Fórmulas de Cálculo de KPIs

<div align="center">
  <h3>Implementación SQL en Gold Schema</h3>
</div>

<table align="center">
  <tr>
    <th width="15%">KPI</th>
    <th width="45%">Fórmula SQL</th>
    <th width="20%">Columnas Origen</th>
    <th width="20%">Filtros</th>
  </tr>
  <tr>
    <td><b>GMV</b></td>
    <td><code>SUM(item_price + freight_value)</code></td>
    <td><code>item_price</code><br><code>freight_value</code></td>
    <td><code>is_canceled = false</code></td>
  </tr>
  <tr>
    <td><b>Revenue</b></td>
    <td><code>SUM(payment_value_allocated)</code></td>
    <td><code>payment_value_allocated</code></td>
    <td>Pago confirmado</td>
  </tr>
  <tr>
    <td><b>Órdenes</b></td>
    <td><code>COUNT(DISTINCT order_id)</code></td>
    <td><code>order_id</code></td>
    <td>Todas en rango</td>
  </tr>
  <tr>
    <td><b>AOV</b></td>
    <td><code>SUM(payment_value_allocated) / COUNT(DISTINCT order_id)</code></td>
    <td><code>payment_value_allocated</code><br><code>order_id</code></td>
    <td>Revenue / Órdenes</td>
  </tr>
  <tr>
    <td><b>Items/Orden</b></td>
    <td><code>COUNT(*) / COUNT(DISTINCT order_id)</code></td>
    <td>Todas las filas</td>
    <td>Por orden</td>
  </tr>
  <tr>
    <td><b>Cancel Rate</b></td>
    <td><code>COUNT(DISTINCT CASE WHEN is_canceled THEN order_id END)::float / NULLIF(COUNT(DISTINCT order_id), 0)</code></td>
    <td><code>is_canceled</code><br><code>order_id</code></td>
    <td>Todas las órdenes</td>
  </tr>
  <tr>
    <td><b>On-Time Delivery</b></td>
    <td><code>COUNT(DISTINCT CASE WHEN is_on_time THEN order_id END)::float / NULLIF(COUNT(DISTINCT CASE WHEN is_delivered THEN order_id END), 0)</code></td>
    <td><code>is_on_time</code><br><code>is_delivered</code><br><code>order_id</code></td>
    <td>Solo entregadas</td>
  </tr>
</table>

### 📊 Consulta SQL Real (Implementación)

<details>
<summary><b>🔍 Ver query completa de KPIs</b></summary>

```sql
-- Cálculo de KPIs para un período específico
WITH kpi_base AS (
  SELECT 
    COUNT(DISTINCT order_id) as total_orders,
    SUM(item_price + freight_value) as total_gmv,
    SUM(payment_value_allocated) as total_revenue,
    COUNT(DISTINCT CASE WHEN is_canceled THEN order_id END) as canceled_orders,
    COUNT(DISTINCT CASE WHEN is_delivered THEN order_id END) as delivered_orders,
    COUNT(DISTINCT CASE WHEN is_on_time THEN order_id END) as on_time_orders,
    COUNT(*) as total_items
  FROM fact_sales
  WHERE date_sk BETWEEN :start_date AND :end_date
)
SELECT 
  total_orders,
  total_gmv,
  total_revenue,
  total_revenue / NULLIF(total_orders, 0) as aov,
  total_items::float / NULLIF(total_orders, 0) as items_per_order,
  canceled_orders::float / NULLIF(total_orders, 0) as cancel_rate,
  on_time_orders::float / NULLIF(delivered_orders, 0) as on_time_delivery_rate
FROM kpi_base;
```
</details>

### 📈 Interpretación de KPIs

| KPI | Rango Óptimo | Interpretación |
|-----|--------------|----------------|
| **GMV** | ↑ Mayor | Indica volumen total de ventas antes de deducciones |
| **Revenue** | ↑ Mayor | Ingreso real después de prorrateo de pagos |
| **AOV** | R$ 150-200 | Ticket promedio saludable para e-commerce brasileño |
| **Items/Orden** | 1.1-1.5 | Oportunidad de cross-selling si es bajo |
| **Cancel Rate** | < 1% | >2% indica problemas en checkout/logística |
| **On-Time Delivery** | > 90% | <85% requiere revisión de operadores logísticos |

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%">

<center> CAPACIDADES DEL DASHBOARD <center> 


<div align="center"> <table> <tr> <th>Característica</th> <th>Descripción</th> <th>Beneficio</th> </tr> <tr> <td><b>Interactividad</b></td> <td>Filtros dinámicos por fecha, estado de orden, categoría de producto y estado del cliente</td> <td>Análisis a medida en tiempo real</td> </tr> <tr> <td><b>Tendencias</b></td> <td>Granularidad diaria/semanal/mensual con visualizaciones múltiples</td> <td>Identificación de patrones estacionales</td> </tr> <tr> <td><b> Rankings</b></td> <td>Top productos en tiempo real con sistema de medallas</td> <td>Optimización de catálogo y marketing</td> </tr> <tr> <td><b>Rendimiento</b></td> <td>Respuesta < 2 segundos en +100k registros con índices optimizados</td> <td>Experiencia fluida y profesional</td> </tr> <tr> <td><b> Diseño</b></td> <td>Glassmorphism + Animaciones + Sistema de medallas</td> <td>UX moderna y atractiva</td> </tr> </table> </div>

STACK TECNOLÓGICO

<div align="center"> <h3> Tecnologías de Alto Rendimiento</h3> </div><table align="center"> <tr> <th colspan="3" bgcolor="#6366F1"> FRONTEND</th> </tr> <tr> <td width="33%" align="center"><img src="https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white" /></td> <td width="33%" align="center"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" /></td> <td width="33%" align="center"><img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" /></td> </tr> <tr> <td align="center"><b>Recharts</b> · Gráficos Interactivos</td> <td align="center"><b>TanStack Query</b> · Estado Servidor</td> <td align="center"><b>Lucide React</b> · Iconografía Premium</td> </tr> <tr> <th colspan="3" bgcolor="#10B981"> BACKEND</th> </tr> <tr> <td width="33%" align="center"><img src="https://img.shields.io/badge/Node.js_18-339933?style=for-the-badge&logo=node.js&logoColor=white" /></td> <td width="33%" align="center"><img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" /></td> <td width="33%" align="center"><img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" /></td> </tr> <tr> <td align="center"><b>Zod</b> · Validación Robusta</td> <td align="center"><b>Jest</b> · Testing Unitario</td> <td align="center"><b>Supertest</b> · API Testing</td> </tr> <tr> <th colspan="3" bgcolor="#EF4444"> BASE DE DATOS</th> </tr> <tr> <td width="33%" align="center"><img src="https://img.shields.io/badge/PostgreSQL_15-316192?style=for-the-badge&logo=postgresql&logoColor=white" /></td> <td width="33%" align="center"><img src="https://img.shields.io/badge/Prisma_Migrate-2D3748?style=for-the-badge&logo=prisma&logoColor=white" /></td> <td width="33%" align="center"><img src="https://img.shields.io/badge/Star_Schema-FF6B6B?style=for-the-badge" /></td> </tr> <tr> <th colspan="3" bgcolor="#2496ED"> INFRAESTRUCTURA</th> </tr> <tr> <td width="33%" align="center"><img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" /></td> <td width="33%" align="center"><img src="https://img.shields.io/badge/Docker_Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white" /></td> <td width="33%" align="center"><img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" /></td> </tr> </table>

 VOLUMEN DE DATOS PROCESADOS
 
<div align="center"> <table> <tr> <th>Entidad</th> <th>Registros</th> <th>Tamaño</th> <th>Propósito</th> </tr> <tr> <td><b>Clientes</b></td> <td>99,441</td> <td>19 MB</td> <td>Base de usuarios</td> </tr> <tr> <td><b>Órdenes</b></td> <td>99,441</td> <td>32 MB</td> <td>Transacciones completas</td> </tr> <tr> <td><b>Items de Orden</b></td> <td>112,650</td> <td>33 MB</td> <td>Detalle de compras</td> </tr> <tr> <td><b>Productos</b></td> <td>32,951</td> <td>6 MB</td> <td>Catálogo completo</td> </tr> <tr> <td><b>Geolocalización</b></td> <td>1,000,163</td> <td>68 MB</td> <td>Análisis espacial</td> </tr> <tr> <td><b>Pagos</b></td> <td>103,886</td> <td>24 MB</td> <td>Transacciones financieras</td> </tr> <tr> <td><b>Reviews</b></td> <td>99,224</td> <td>14 MB</td> <td>Feedback de clientes</td> </tr> </table> </div>

## 📋 REQUISITOS PREVIOS

<div align="center">
  <h3>Versiones Mínimas Requeridas</h3>
</div>

<table align="center">
  <tr>
    <td width="33%" align="center" bgcolor="#0D1117">
      <img src="https://img.shields.io/badge/Node.js-18.0%2B-339933?style=for-the-badge&logo=node.js&logoColor=white" />
      <br>
      <code>node --version</code>
    </td>
    <td width="33%" align="center" bgcolor="#0D1117">
      <img src="https://img.shields.io/badge/Docker-24.0%2B-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
      <br>
      <code>docker --version</code>
    </td>
    <td width="33%" align="center" bgcolor="#0D1117">
      <img src="https://img.shields.io/badge/Docker_Compose-2.20%2B-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
      <br>
      <code>docker-compose --version</code>
    </td>
  </tr>
  <tr>
    <td align="center" bgcolor="#0D1117" colspan="3">
      <img src="https://img.shields.io/badge/Git-2.30%2B-F05032?style=for-the-badge&logo=git&logoColor=white" />
      <br>
      <code>git --version</code>
    </td>
  </tr>
</table>

### 📦 Variables de Entorno

<details>
<summary><b>Configuración de Backend</b> (click para expandir)</summary>
<br>

```bash
# backend/.env.example
# Copiar y editar:
cp backend/.env.example backend/.env

# Configuración necesaria:
DATABASE_URL="postgresql://kpi_user:kpi_password@localhost:5433/kpi_dashboard?schema=gold"
PORT=4000
NODE_ENV=development
FRONTEND_URL="http://localhost:3000"
```
</details>

<details>
<summary><b>Configuración de Frontend</b> (click para expandir)</summary>
<br>

```bash
# .env.local.example
# Copiar y editar:
cp .env.example .env.local

# Configuración necesaria:
NEXT_PUBLIC_API_URL="http://localhost:4000/api"
```
</details>

### 📁 Estructura de Archivos Necesaria

```bash
# Los archivos CSV deben estar en:
./data/raw/olist_csv_files/
├── olist_customers_dataset.csv
├── olist_geolocation_dataset.csv
├── olist_order_items_dataset.csv
├── olist_order_payments_dataset.csv
├── olist_order_reviews_dataset.csv
├── olist_orders_dataset.csv
├── olist_products_dataset.csv
├── olist_sellers_dataset.csv
└── product_category_name_translation.csv
```

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%">

 INICIO RÁPIDO

<div align="center"> <h3> 3 Pasos para tu Dashboard</h3> </div><table align="center"> <tr> <td width="33%" align="center" bgcolor="#0D1117"> <h1>1️⃣</h1> <h3>Clonar</h3> <p><code>git clone https://github.com/EmersonRodas9029/datalysis-kpi-dashboard.git</code></p> <p><code>cd datalysis-kpi-dashboard</code></p> </td> <td width="33%" align="center" bgcolor="#0D1117"> <h1>2️⃣</h1> <h3>Configurar</h3> <p>Descargar dataset Olist de Kaggle</p> <p>Colocar CSVs en <code>./data/raw/olist_csv_files/</code></p> <p><code>./scripts/move-csv-files.sh</code></p> </td> <td width="33%" align="center" bgcolor="#0D1117"> <h1>3️⃣</h1> <h3>Ejecutar</h3> <p><code>docker-compose up -d</code></p> <p><code>./scripts/run-full-etl.sh</code></p> <p><code>open http://localhost:3000</code></p> </td> </tr> </table>

 URLs de Acceso

Servicio	URL	Puerto
Frontend

=	http://localhost:3000	

Backend API	http://localhost:4000/api	4000

PostgreSQL	

localhost:5433	5433

Health Check
	http://localhost:4000/api/health	4000


 TESTS

<div align="center"> <table> <tr> <th>Tipo</th> <th>Tests</th> <th>Cobertura</th> <th>Estado</th> </tr> <tr> <td><b>Unitarios</b></td> <td>12</td> <td>94%</td> <td>✅</td> </tr> <tr> <td><b>Integración</b></td> <td>8</td> <td>88%</td> <td>✅</td> </tr> <tr> <td><b>E2E</b></td> <td>5</td> <td>85%</td> <td>🚧</td> </tr> <tr> <td><b>Total</b></td> <td>25</td> <td>92%</td> <td>🏆</td> </tr> </table> </div>

 DECISIONES ARQUITECTURALES

<div align="center"> <h3> Por qué tomamos cada decisión</h3> </div><details> <summary><b> Arquitectura Hexagonal</b> (click para expandir)</summary> <br> <p><b>Problema:</b> Dependencia directa entre lógica de negocio y frameworks.</p> <p><b>Solución:</b> Separación en capas dominio, aplicación e infraestructura.</p> <p><b>Beneficios:</b></p> <ul> <li> Independencia tecnológica</li> <li> Testabilidad mejorada</li> <li> Mantenibilidad a largo plazo</li> <li> Evolución sin afectar dominio</li> </ul> </details><details> <summary>

<b> Esquema Estrella</b> (click para expandir)</summary> <br> <p><b>Problema:</b> Consultas analíticas lentas en modelo transaccional.</p> <p><b>Solución:</b> Tabla de hechos + dimensiones normalizadas.</p> <p><b>Beneficios:</b></p> <ul> <li> Rendimiento en agregaciones</li> <li> Intuitivo para analistas</li> <li>Flexibilidad dimensional</li> <li> Consistencia con prorrateo</li> </ul> </details><details> <summary>

<b> Validación con Zod</b> (click para expandir)</summary> <br> <p><b>Problema:</b> Datos inconsistentes en runtime.</p> <p><b>Solución:</b> Validación tipada en capas de entrada.</p> <p><b>Beneficios:</b></p> <ul> <li> TypeScript-first</li> <li> de esquemas</li> <li> Mensajes de error claros</li> <li> Zero overhead</li> </ul> </details><details> <summary><b> Prorrateo de Pagos</b> (click para expandir)</summary> <br> <p><b>Problema:</b> Pagos a nivel de orden pero análisis requiere granularidad por item.</p> <p><b>Solución:

</b> Prorrateo proporcional al precio del item.</p> <p><b>Implementación:</b></p> <pre><code>allocated_payment = item_price * (total_order_payment / total_item_price)</code></pre> <p><b>Resultado:</b> 112,647 registros con diferencia de solo 1.02% vs pagos originales.</p> </details>

<details>
<summary><b> Grano de la Tabla de Hechos (fact_sales)</b> (click para expandir)</summary>
<br>
<p><b>Problema:</b> Necesidad de analizar tanto a nivel de orden (AOV) como a nivel de producto (rankings, categorías) sin perder detalle.</p>
<p><b>Solución:</b> Definir el grano más atómico posible: <b>1 fila por ítem de orden</b> (<code>order_id</code> + <code>order_item_id</code>).</p>
<p><b>Beneficios:</b></p>
<ul>
 <li> Máxima flexibilidad analítica (agregaciones por orden, producto, categoría, vendedor).</li>
 <li> Permite el cálculo exacto de "Items per Order".</li>
 <li> Facilita el prorrateo de pagos de forma proporcional al precio del ítem.</li>
</ul>
<p><b>Trade-off:</b> La tabla de hechos es más grande (~112k filas vs ~99k si fuera por orden), pero el rendimiento se mantiene gracias a los índices y es la práctica correcta en modelado dimensional.</p>
</details>

 LICENCIA

<div align="center"> MIT © 2024 Emerson Rodas · Completamente open source para uso comercial <br> <br> <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%"> <br> <p> <b>Hecho con  para la comunidad data-driven</b> </p> <p> <sub> Este repositorio si te fue útil ·  Issues para reportar problemas ·  Discussions para ideas</sub> </p> <br> <p> <a href="https://github.com/EmersonRodas9029/datalysis-kpi-dashboard"> <img src="https://img.shields.io/github/stars/EmersonRodas9029/datalysis-kpi-dashboard?style=social" /> </a> <a href="https://github.com/EmersonRodas9029"> <img src="https://img.shields.io/github/followers/EmersonRodas9029?style=social" /> </a> </p> </div> 
