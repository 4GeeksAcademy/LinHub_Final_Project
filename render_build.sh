#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm run build

pipenv install

pipenv run upgrade

mkdir -p src/front/google_services

echo $GOOGLE_SERVICES > /src/front/google_services/google-services.json

# pipenv run shell

# flask insert-languages
