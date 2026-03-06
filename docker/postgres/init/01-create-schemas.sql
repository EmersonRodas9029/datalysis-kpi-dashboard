-- Crear los schemas requeridos por la arquitectura
CREATE SCHEMA IF NOT EXISTS raw;
CREATE SCHEMA IF NOT EXISTS clean;
CREATE SCHEMA IF NOT EXISTS gold;

-- Crear extensiones útiles
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- Mensaje de confirmación
DO $$
BEGIN
    RAISE NOTICE ' Schemas creados correctamente: raw, clean, gold';
    RAISE NOTICE ' Base de datos lista para el dashboard de KPIs comerciales';
    RAISE NOTICE ' Puerto PostgreSQL: 5432 (interno) / 5433 (host)';
END $$;
