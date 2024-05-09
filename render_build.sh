#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm run build

pipenv install

pipenv run upgrade

curl -X GET https://tuaplicacion.com/filldb

# Opcional: agregar un tiempo de espera para asegurar que la solicitud se complete antes de continuar con el despliegue
sleep 5

# pipenv run shell

# flask insert-languages
