#!/bin/sh

# Run this script in container:
# docker run -it --rm -v `pwd`:/workdir -w /workdir node:15.14.0-alpine3.10 sh

echo Working dir
pwd

apk add --no-cache chromium

export CHROME_BIN=/usr/bin/chromium-browser

echo "Update npm"
npm install -g npm@7.9.0

echo "Building Web Page"
npm install

ng analytics off

npm run lint
npm run build
npm run test -- --karma-config karma.conf.ci.js
