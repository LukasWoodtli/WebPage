#!/usr/bin/env bash

set -e
set -u

SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"


source .env


npm run build

npm run test

lftp -p 52839 -u $USER_NAME,$PASSWORD sftp://server101.hostfactory.ch  -e "mirror -R -P 4 $SCRIPTPATH/public /httpdocs ; exit"

npm run e2e:deployed
