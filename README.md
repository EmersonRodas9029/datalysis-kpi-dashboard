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


📦 Estructura de Contenedores Docker

┌─────────────────────────────────────────────────────────────┐
│                     Docker Compose                          │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Frontend   │  │   Backend    │  │  PostgreSQL  │       │
│  │   Node 18    │◀─┤   Node 18    │──┤    Port      │       │
│  │   Port 3000  │  │   Port 4000  │  │    5433      │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│         │                 │                 │               │
│         └─────────────────┴─────────────────┘               │
│                    Red: dashboard-network                   │
└─────────────────────────────────────────────────────────────┘


##  Pipeline de Datos ETL

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

<center> CAPACIDADES DEL DASHBOARD <center> 


<div align="center"> <table> <tr> <th>Característica</th> <th>Descripción</th> <th>Beneficio</th> </tr> <tr> <td><b>Interactividad</b></td> <td>Filtros dinámicos por fecha, estado de orden, categoría de producto y estado del cliente</td> <td>Análisis a medida en tiempo real</td> </tr> <tr> <td><b>Tendencias</b></td> <td>Granularidad diaria/semanal/mensual con visualizaciones múltiples</td> <td>Identificación de patrones estacionales</td> </tr> <tr> <td><b> Rankings</b></td> <td>Top productos en tiempo real con sistema de medallas</td> <td>Optimización de catálogo y marketing</td> </tr> <tr> <td><b>Rendimiento</b></td> <td>Respuesta < 2 segundos en +100k registros con índices optimizados</td> <td>Experiencia fluida y profesional</td> </tr> <tr> <td><b> Diseño</b></td> <td>Glassmorphism + Animaciones + Sistema de medallas</td> <td>UX moderna y atractiva</td> </tr> </table> </div>

STACK TECNOLÓGICO

<div align="center"> <h3> Tecnologías de Alto Rendimiento</h3> </div><table align="center"> <tr> <th colspan="3" bgcolor="#6366F1"> FRONTEND</th> </tr> <tr> <td width="33%" align="center"><img src="https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white" /></td> <td width="33%" align="center"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" /></td> <td width="33%" align="center"><img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" /></td> </tr> <tr> <td align="center"><b>Recharts</b> · Gráficos Interactivos</td> <td align="center"><b>TanStack Query</b> · Estado Servidor</td> <td align="center"><b>Lucide React</b> · Iconografía Premium</td> </tr> <tr> <th colspan="3" bgcolor="#10B981"> BACKEND</th> </tr> <tr> <td width="33%" align="center"><img src="https://img.shields.io/badge/Node.js_18-339933?style=for-the-badge&logo=node.js&logoColor=white" /></td> <td width="33%" align="center"><img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" /></td> <td width="33%" align="center"><img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" /></td> </tr> <tr> <td align="center"><b>Zod</b> · Validación Robusta</td> <td align="center"><b>Jest</b> · Testing Unitario</td> <td align="center"><b>Supertest</b> · API Testing</td> </tr> <tr> <th colspan="3" bgcolor="#EF4444"> BASE DE DATOS</th> </tr> <tr> <td width="33%" align="center"><img src="https://img.shields.io/badge/PostgreSQL_15-316192?style=for-the-badge&logo=postgresql&logoColor=white" /></td> <td width="33%" align="center"><img src="https://img.shields.io/badge/Prisma_Migrate-2D3748?style=for-the-badge&logo=prisma&logoColor=white" /></td> <td width="33%" align="center"><img src="https://img.shields.io/badge/Star_Schema-FF6B6B?style=for-the-badge" /></td> </tr> <tr> <th colspan="3" bgcolor="#2496ED"> INFRAESTRUCTURA</th> </tr> <tr> <td width="33%" align="center"><img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" /></td> <td width="33%" align="center"><img src="https://img.shields.io/badge/Docker_Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white" /></td> <td width="33%" align="center"><img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" /></td> </tr> </table>

 VOLUMEN DE DATOS PROCESADOS
 
<div align="center"> <table> <tr> <th>Entidad</th> <th>Registros</th> <th>Tamaño</th> <th>Propósito</th> </tr> <tr> <td><b>Clientes</b></td> <td>99,441</td> <td>19 MB</td> <td>Base de usuarios</td> </tr> <tr> <td><b>Órdenes</b></td> <td>99,441</td> <td>32 MB</td> <td>Transacciones completas</td> </tr> <tr> <td><b>Items de Orden</b></td> <td>112,650</td> <td>33 MB</td> <td>Detalle de compras</td> </tr> <tr> <td><b>Productos</b></td> <td>32,951</td> <td>6 MB</td> <td>Catálogo completo</td> </tr> <tr> <td><b>Geolocalización</b></td> <td>1,000,163</td> <td>68 MB</td> <td>Análisis espacial</td> </tr> <tr> <td><b>Pagos</b></td> <td>103,886</td> <td>24 MB</td> <td>Transacciones financieras</td> </tr> <tr> <td><b>Reviews</b></td> <td>99,224</td> <td>14 MB</td> <td>Feedback de clientes</td> </tr> </table> </div>

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
