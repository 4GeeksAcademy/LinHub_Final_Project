#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm run build

pipenv install

pipenv run upgrade

pipenv shell

flask insert-languages
flask insert-av_courses
flask insert-modules
flask insert-lessons
flask insert-questions
flask insert-options