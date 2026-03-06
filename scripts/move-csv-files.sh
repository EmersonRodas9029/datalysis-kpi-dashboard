#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Moviendo archivos CSV de Olist...${NC}"

SOURCE_DIR="/home/emerson/Documentos/archive"
DEST_DIR="$(pwd)/data/raw/olist_csv_files"

if [ ! -d "$SOURCE_DIR" ]; then
    echo -e "${RED}Error: No se encuentra el directorio $SOURCE_DIR${NC}"
    exit 1
fi

CSV_COUNT=$(ls -1 "$SOURCE_DIR"/*.csv 2>/dev/null | wc -l)
if [ "$CSV_COUNT" -eq 0 ]; then
    echo -e "${RED}Error: No se encontraron archivos CSV en $SOURCE_DIR${NC}"
    exit 1
fi

echo -e "${GREEN}Encontrados $CSV_COUNT archivos CSV en origen${NC}"

mkdir -p "$DEST_DIR"

echo -e "${YELLOW}Moviendo archivos...${NC}"
mv -v "$SOURCE_DIR"/*.csv "$DEST_DIR/" 2>/dev/null

MOVED_COUNT=$(ls -1 "$DEST_DIR"/*.csv 2>/dev/null | wc -l)
if [ "$MOVED_COUNT" -eq "$CSV_COUNT" ]; then
    echo -e "${GREEN}Exito: Se movieron $MOVED_COUNT archivos CSV a $DEST_DIR${NC}"
    
    echo -e "${YELLOW}Archivos en destino:${NC}"
    ls -la "$DEST_DIR"/*.csv | sed 's/^/  /'
else
    echo -e "${RED}Error: Solo se movieron $MOVED_COUNT de $CSV_COUNT archivos${NC}"
    exit 1
fi

echo -e "${GREEN}Proceso completado!${NC}"