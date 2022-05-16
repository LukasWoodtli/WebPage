#!/bin/bash

set -e
set -u
set -x

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" > /dev/null && pwd )"

echo Working dir
pwd



GITHUB_USERPAGE_REPO="https://${DEPLOY_KEY}@github.com/LukasWoodtli/LukasWoodtli.github.io"

GITHUB_USERPAGE_CHECKOUT_DIR="${SCRIPT_DIR}/user-page-checkout"

rm -rf "${GITHUB_USERPAGE_CHECKOUT_DIR}"

git clone ${GITHUB_USERPAGE_REPO} ${GITHUB_USERPAGE_CHECKOUT_DIR}

cp -r "${SCRIPT_DIR}/../public/"* "${GITHUB_USERPAGE_CHECKOUT_DIR}"

git config user.name "circle-ci (Lukas Woodtli)" &&  git config user.email lukas_woodtli@circle-ci.example.com
cd "${GITHUB_USERPAGE_CHECKOUT_DIR}/"
git add .
git commit -m"Update Github gatsby page automated." || true
git push origin
