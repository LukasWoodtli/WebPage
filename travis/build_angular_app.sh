#!/bin/bash

set -e
set -u

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" > /dev/null && pwd )"

export CYPRESS_CACHE_FOLDER="${SCRIPT_DIR}/cypress_cache"

# Run this script in container:
# docker run -it --rm -v `pwd`:/workdir -w /workdir cypress/browsers:node14.17.0-chrome88-ff89 sh


echo Working dir
pwd

echo "Update npm"
npm install -g npm@7.9.0

echo "Building Web Page"

npm install
npx cypress install --force


npm run lint
npm run build
npm run test -- --karma-config karma.conf.ci.js
npm run e2e:ci
