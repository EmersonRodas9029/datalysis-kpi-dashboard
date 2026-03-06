#!/bin/bash

echo "Reiniciando base de datos con nuevo esquema..."
echo "================================================"

docker compose down -v

docker compose up -d postgres

echo "Esperando a que PostgreSQL este listo..."
sleep 15

echo "Verificando conexion a PostgreSQL..."
if docker exec kpi-db pg_isready -U kpi_user > /dev/null 2>&1; then
    echo "PostgreSQL esta listo"
else
    echo "PostgreSQL no esta respondiendo"
    exit 1
fi

docker compose up -d backend frontend

echo ""
echo "Verificando tablas creadas:"
echo "------------------------------"
echo "Esquema RAW:"
docker exec kpi-db psql -U kpi_user -d kpi_dashboard -c "\dt raw.*"

echo ""
echo "Esquema CLEAN:"
docker exec kpi-db psql -U kpi_user -d kpi_dashboard -c "\dt clean.*"

echo ""
echo "Esquema GOLD:"
docker exec kpi-db psql -U kpi_user -d kpi_dashboard -c "\dt gold.*"

echo ""
echo "================================================"
echo "Base de datos lista con nuevo esquema"
echo ""
echo "Servicios disponibles:"
echo "   • Frontend: http://localhost:3000"
echo "   • Backend:  http://localhost:4000"
echo "   • Health:   http://localhost:4000/health"
echo "   • DB:       localhost:5433"
echo "================================================"