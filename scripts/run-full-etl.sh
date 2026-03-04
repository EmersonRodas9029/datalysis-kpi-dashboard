#!/bin/bash

echo "🚀 Iniciando ETL completo..."

echo "📥 Paso 1: Cargando datos a raw..."
./scripts/load-raw-data.sh

echo "🧹 Paso 2: Transformando raw → clean..."
./scripts/transform-raw-to-clean.sh

echo "⭐ Paso 3: Construyendo star schema en gold..."
./scripts/build-star-schema.sh

echo "✅ ETL completado exitosamente!"
