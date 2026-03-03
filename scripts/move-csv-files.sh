#!/bin/bash

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📂 Moviendo archivos CSV de Olist...${NC}"

# Ruta de origen (tus archivos descargados)
SOURCE_DIR="/home/emerson/Documentos/archive"

# Ruta de destino en el proyecto
DEST_DIR="$(pwd)/data/raw/olist_csv_files"

# Verificar que el directorio fuente existe
if [ ! -d "$SOURCE_DIR" ]; then
    echo -e "${RED}❌ Error: No se encuentra el directorio $SOURCE_DIR${NC}"
    exit 1
fi

# Verificar que hay archivos CSV en el directorio fuente
CSV_COUNT=$(ls -1 "$SOURCE_DIR"/*.csv 2>/dev/null | wc -l)
if [ "$CSV_COUNT" -eq 0 ]; then
    echo -e "${RED}❌ Error: No se encontraron archivos CSV en $SOURCE_DIR${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Encontrados $CSV_COUNT archivos CSV en origen${NC}"

# Crear directorio de destino si no existe
mkdir -p "$DEST_DIR"

# Mover los archivos
echo -e "${YELLOW}📋 Moviendo archivos...${NC}"
mv -v "$SOURCE_DIR"/*.csv "$DEST_DIR/" 2>/dev/null

# Verificar que se movieron correctamente
MOVED_COUNT=$(ls -1 "$DEST_DIR"/*.csv 2>/dev/null | wc -l)
if [ "$MOVED_COUNT" -eq "$CSV_COUNT" ]; then
    echo -e "${GREEN}✅ Éxito: Se movieron $MOVED_COUNT archivos CSV a $DEST_DIR${NC}"
    
    # Listar los archivos movidos
    echo -e "${YELLOW}Archivos en destino:${NC}"
    ls -la "$DEST_DIR"/*.csv | sed 's/^/  /'
else
    echo -e "${RED}❌ Error: Solo se movieron $MOVED_COUNT de $CSV_COUNT archivos${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Proceso completado!${NC}"
