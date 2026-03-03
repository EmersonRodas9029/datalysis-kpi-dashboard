#!/bin/bash

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}📥 Cargando CSV a tablas raw${NC}"
echo -e "${BLUE}================================${NC}"

# Configuración
CSV_DIR="$(pwd)/data/raw/olist_csv_files"
DB_CONTAINER="kpi-db"
DB_USER="kpi_user"
DB_NAME="kpi_dashboard"

# Verificar que el directorio CSV existe
if [ ! -d "$CSV_DIR" ]; then
    echo -e "${RED}❌ Error: No se encuentra el directorio $CSV_DIR${NC}"
    exit 1
fi

# Verificar que hay archivos CSV
CSV_COUNT=$(ls -1 "$CSV_DIR"/*.csv 2>/dev/null | wc -l)
if [ "$CSV_COUNT" -eq 0 ]; then
    echo -e "${RED}❌ Error: No hay archivos CSV en $CSV_DIR${NC}"
    echo -e "Ejecuta primero: ./scripts/move-csv-files.sh"
    exit 1
fi
echo -e "${GREEN}✅ Encontrados $CSV_COUNT archivos CSV${NC}"

# Verificar que el contenedor de PostgreSQL está corriendo
echo -e "${YELLOW}🔍 Verificando conexión a PostgreSQL...${NC}"
if ! docker exec $DB_CONTAINER pg_isready -U $DB_USER > /dev/null 2>&1; then
    echo -e "${RED}❌ Error: PostgreSQL no está corriendo${NC}"
    echo -e "Ejecuta 'docker compose up -d' primero"
    exit 1
fi
echo -e "${GREEN}✅ PostgreSQL conectado${NC}"

# Función para cargar CSV a tabla usando docker cp y COPY
load_csv_to_table() {
    local csv_file=$1
    local table_name=$2
    local schema=$3
    
    echo -e "${YELLOW}📄 Cargando $csv_file → $schema.$table_name...${NC}"
    
    # Verificar que el archivo existe
    if [ ! -f "$CSV_DIR/$csv_file" ]; then
        echo -e "${RED}  ❌ Error: No se encuentra $CSV_DIR/$csv_file${NC}"
        return 1
    fi
    
    # Copiar el archivo CSV al contenedor
    docker cp "$CSV_DIR/$csv_file" $DB_CONTAINER:/tmp/$csv_file
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}  ❌ Error al copiar archivo al contenedor${NC}"
        return 1
    fi
    
    # Usar \copy en lugar de COPY (cliente-side)
    docker exec -i $DB_CONTAINER psql -U $DB_USER -d $DB_NAME -c "TRUNCATE TABLE $schema.$table_name;"
    
    docker exec -i $DB_CONTAINER psql -U $DB_USER -d $DB_NAME -c "\copy $schema.$table_name FROM '/tmp/$csv_file' WITH (FORMAT csv, HEADER true, NULL '', QUOTE '\"', ESCAPE '\"');"
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}  ❌ Error al cargar datos${NC}"
        # Limpiar archivo temporal
        docker exec $DB_CONTAINER rm -f /tmp/$csv_file
        return 1
    fi
    
    # Limpiar archivo temporal
    docker exec $DB_CONTAINER rm -f /tmp/$csv_file
    
    # Verificar carga
    local row_count=$(docker exec -i $DB_CONTAINER psql -U $DB_USER -d $DB_NAME -t -c "SELECT COUNT(*) FROM $schema.$table_name;" | xargs)
    
    echo -e "${GREEN}  ✅ Cargadas $row_count filas en $schema.$table_name${NC}"
    return 0
}

# Cargar cada CSV a su tabla correspondiente
echo -e "${YELLOW}🚀 Iniciando carga de datos...${NC}"
echo ""

# Lista de archivos y tablas
declare -a FILES=(
    "olist_customers_dataset.csv:customers"
    "olist_geolocation_dataset.csv:geolocation"
    "olist_orders_dataset.csv:orders"
    "olist_order_items_dataset.csv:order_items"
    "olist_order_payments_dataset.csv:order_payments"
    "olist_order_reviews_dataset.csv:order_reviews"
    "olist_products_dataset.csv:products"
    "olist_sellers_dataset.csv:sellers"
    "product_category_name_translation.csv:product_category_name_translation"
)

SUCCESS_COUNT=0
FAIL_COUNT=0

for file_mapping in "${FILES[@]}"; do
    IFS=':' read -r filename tablename <<< "$file_mapping"
    if load_csv_to_table "$filename" "$tablename" "raw"; then
        SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    else
        FAIL_COUNT=$((FAIL_COUNT + 1))
    fi
    echo ""
done

echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}✅ Carga completada: $SUCCESS_COUNT tablas exitosas, $FAIL_COUNT fallidas${NC}"
echo -e "${GREEN}================================${NC}"

# Mostrar resumen final solo si al menos una tabla tuvo éxito
if [ $SUCCESS_COUNT -gt 0 ]; then
    echo ""
    echo -e "${BLUE}📊 Resumen de tablas raw:${NC}"
    docker exec -i $DB_CONTAINER psql -U $DB_USER -d $DB_NAME -c "
    SELECT 
        schemaname,
        tablename,
        pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size,
        (SELECT reltuples::bigint FROM pg_class WHERE oid = (schemaname||'.'||tablename)::regclass) as estimated_rows
    FROM pg_tables 
    WHERE schemaname = 'raw'
    ORDER BY tablename;
    "
fi
