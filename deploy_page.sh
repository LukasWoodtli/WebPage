#!/usr/bin/env bash

set -e
set -u

SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"


source .env


npm run build

npm run test

# If `lftp` fails with "Fatal error: Host key verification failed.":
# log in first manually with `ssh -p 52839 $USER_NAME@server101.hostfactory.ch`
lftp -p 52839 -u $USER_NAME,$PASSWORD sftp://server101.hostfactory.ch  -e "mirror -R -P 4 $SCRIPTPATH/public /httpdocs ; exit"

npm run e2e:deployed
