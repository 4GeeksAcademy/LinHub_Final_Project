#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm run build

pipenv install

pipenv run upgrade

# Obtener la URL del backend desde la variable de entorno
BACKEND_URL=$(grep -E '^BACKEND_URL=' .env | cut -d '=' -f 2)

# Verificar que se haya obtenido correctamente la URL del backend
if [ -z "$BACKEND_URL" ]; then
  echo "ERROR: No se pudo obtener la URL del backend desde la variable de entorno BACKEND_URL en el archivo .env"
  exit 1
fi

# Ejecutar una solicitud HTTP al endpoint filldb
curl -X GET "$BACKEND_URL/api/filldb"

# Opcional: agregar un tiempo de espera para asegurar que la solicitud se complete antes de continuar con el despliegue
sleep 5

# pipenv run shell

# flask insert-languages
