#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm run build

pipenv install

pipenv run upgrade

mkdir -p src/front

echo $GOOGLE_SERVICES > src/front/google-services.json

# pipenv run shell

# flask insert-languages
