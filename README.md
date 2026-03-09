📊 Commercial KPI Dashboard
<div align="center">
https://img.shields.io/badge/Next.js-14.0.3-000000?style=for-the-badge&logo=next.js&logoColor=white
https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white
https://img.shields.io/badge/PostgreSQL-15-316192?style=for-the-badge&logo=postgresql&logoColor=white
https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white

<h3>Transformando 100,000+ órdenes en inteligencia de negocio actionable</h3>
Visión General •
Arquitectura •
KPIs •
Demo Rápida •
Stack Tecnológico

</div>
🎯 Visión General
Plataforma analítica enterprise construida sobre el dataset público de Olist, el marketplace brasileño más grande. Este dashboard transforma datos crudos de e-commerce en métricas de negocio accionables, procesando más de 100,000 órdenes con actualización en tiempo real.

Valor de Negocio
Toma de decisiones basada en datos con 7 KPIs críticos actualizados dinámicamente

Visibilidad completa del funnel comercial desde la orden hasta la entrega

Detección temprana de tendencias y anomalías en el negocio

Arquitectura escalable lista para manejar millones de registros

Capacidades Clave
Dashboard interactivo con métricas en tiempo real y visualizaciones dinámicas

Análisis multidimensional con filtros por fecha, estado de orden y categoría de producto

Rankings automáticos de productos por volumen de ventas e ingresos

Tendencias temporales con granularidad configurable (diaria/semanal/mensual)

Diseño moderno con efectos glassmorphism y animaciones fluidas

🏗️ Arquitectura del Sistema
Diseño de Alto Nivel
El sistema está estructurado en tres capas independientes pero interconectadas, siguiendo principios de arquitectura limpia y domain-driven design.

Frontend - Capa de Presentación

Aplicación Next.js 14 con App Router para renderizado híbrido

Componentes modulares y reutilizables con TypeScript

Estado gestionado mediante React Query y custom hooks

Interfaz responsive con diseño glassmorphism

Backend - Capa de Negocio

API REST construida con Node.js y Express

Arquitectura hexagonal que separa dominio, aplicación e infraestructura

Casos de uso independientes de frameworks y bases de datos

Validación robusta en capas de entrada

Base de Datos - Capa de Persistencia

PostgreSQL 15 optimizado para cargas analíticas

Pipeline ETL de tres etapas: raw → clean → gold

Esquema estrella para máximo rendimiento en consultas

Pipeline de Datos
El proceso de transformación de datos sigue un enfoque por capas inspirado en medallion architecture:

Capa Bronze (Raw)
Almacenamiento de datos crudos directamente desde los archivos CSV del dataset de Olist, preservando la información original sin modificaciones.

Capa Silver (Clean)
Normalización y limpieza de datos: corrección de tipos, manejo de nulos, estandarización de formatos y validación de integridad referencial.

Capa Gold (Modelo Analítico)
Implementación de esquema estrella con tablas de hechos y dimensiones, optimizado para consultas analíticas de alto rendimiento.

📊 Indicadores Clave
Métricas Principales
Volumen de Negocio

Gross Merchandise Value: Valor bruto total de mercancía vendida

Revenue: Ingresos reales después de asignación de pagos

Total de Órdenes: Volumen de transacciones completadas

Eficiencia Operativa

Average Order Value: Ticket promedio por orden

Items por Orden: Densidad de productos en cada transacción

Tasa de Cancelación: Porcentaje de órdenes no concretadas

Entregas a Tiempo: Proporción de entregas exitosas en plazo

Análisis Disponibles
Ranking de Productos
Clasificación automática de productos por diferentes métricas de rendimiento, permitiendo identificar artículos estrella y oportunidades de mejora.

Tendencias Temporales
Visualización de la evolución de métricas clave en el tiempo, con capacidad de ajustar granularidad para identificar patrones estacionales.

Filtros Avanzados
Segmentación multidimensional por rangos de fecha, estados de orden y categorías de producto para análisis específicos.

🚀 Demo Rápida
Inicio en Minutos
Requisitos Previos

Node.js versión 18 o superior

Docker y Docker Compose instalados

Git para clonación del repositorio

Pasos de Implementación

Obtener el código fuente del repositorio y preparar la configuración base copiando el archivo de variables de entorno.

Descargar el dataset público de Olist y colocar los archivos CSV en la carpeta designada para datos crudos.

Ejecutar Docker Compose para levantar todos los servicios: base de datos PostgreSQL, backend Node.js y frontend Next.js.

Verificación
Acceder al dashboard a través del navegador en la dirección local configurada y confirmar que los datos se cargan correctamente.

🛠️ Stack Tecnológico
Frontend
Next.js 14 con App Router para renderizado eficiente y rutas dinámicas
TypeScript para tipado estático y mejor mantenibilidad
Tailwind CSS para estilos utilitarios y diseño consistente
Recharts para visualizaciones interactivas y responsivas
React Query para gestión de estado del servidor y caching
Axios para comunicación HTTP con el backend

Backend
Node.js 18 como entorno de ejecución principal
Express para construcción de API REST estructurada
TypeScript para seguridad de tipos en toda la capa de negocio
Prisma ORM para acceso a base de datos tipado y migraciones
Zod para validación de datos en tiempo de ejecución
Jest y Supertest para testing unitario y de integración

Base de Datos
PostgreSQL 15 optimizado para consultas analíticas complejas
Esquema Estrella con tabla de hechos y dimensiones normalizadas
Índices estratégicos para acelerar consultas frecuentes
Particionamiento para manejo eficiente de grandes volúmenes

Infraestructura
Docker para contenedorización consistente
Docker Compose para orquestación multi-servicio
Git para control de versiones y colaboración
Make para automatización de tareas comunes

📈 Volumen de Datos
El sistema está probado y optimizado para manejar:

99,441 clientes únicos con historial de compras

99,441 órdenes completas con detalles de transacción

112,650 items de orden con precios y cantidades

32,951 productos en catálogo con categorización

1,000,163 registros de geolocalización para análisis espacial

🔄 Flujo de Trabajo para Desarrolladores
Entorno de Desarrollo Local
Configuración Inicial
Clonar repositorio y configurar variables de entorno siguiendo las plantillas provistas. Instalar dependencias tanto para frontend como backend.

Base de Datos
Levantar PostgreSQL mediante Docker y ejecutar migraciones para crear el esquema. Cargar datos semilla desde los archivos CSV procesados.

Servicios
Iniciar backend en modo desarrollo con recarga automática. Iniciar frontend con hot reload para desarrollo iterativo.

Testing
Ejecutar suite completa de pruebas unitarias y de integración. Verificar cobertura y rendimiento de consultas críticas.

🎯 Decisiones Estratégicas
Arquitectura Hexagonal
Se optó por este patrón arquitectónico para lograr una separación clara entre la lógica de negocio y los detalles de infraestructura. Esto permite:

Independencia tecnológica: La lógica core no depende de frameworks o bases de datos específicas

Testabilidad mejorada: Los casos de uso pueden probarse de forma aislada

Mantenibilidad: Cambios en infraestructura no afectan el dominio de negocio

Evolución natural: Facilita la incorporación de nuevos adaptadores o casos de uso

Esquema Estrella para Análisis
La decisión de implementar un modelo dimensional tipo estrella responde a:

Rendimiento analítico: Optimizado para consultas de agregación y filtrado multidimensional

Inteligibilidad: Modelo intuitivo para analistas de negocio

Flexibilidad: Permite añadir nuevas dimensiones sin afectar consultas existentes

Consistencia: El prorrateo de pagos asegura integridad en el grano más fino

Validación con Zod
La implementación de validación en capas usando Zod proporciona:

Seguridad de tipos: Validación que genera tipos TypeScript automáticamente

Composición: Esquemas reutilizables y combinables

UX mejorada: Mensajes de error claros y localizables

Rendimiento: Validación eficiente sin overhead significativo

📁 Organización del Proyecto
El repositorio está estructurado para maximizar la claridad y facilitar el desarrollo colaborativo:

Backend
Organización por capas con separación entre dominio, aplicación, infraestructura y adaptadores. Los tests siguen la misma estructura para facilitar el mapeo.

Frontend
Estructura modular con páginas en App Router, componentes reutilizables, hooks personalizados y utilidades compartidas.

Infraestructura
Configuraciones Docker separadas por servicio, scripts ETL para procesamiento de datos y documentación técnica detallada.