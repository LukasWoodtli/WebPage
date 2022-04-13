#!/bin/bash

set -e
set -u
set -x

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" > /dev/null && pwd )"

echo Working dir
pwd



GITHUB_USERPAGE_REPO="https://${DEPLOY_KEY}@github.com/LukasWoodtli/LukasWoodtli.github.io"

GITHUB_USERPAGE_CHECKOUT_DIR="${SCRIPT_DIR}/user-page-checkout"

git clone ${GITHUB_USERPAGE_REPO} ${GITHUB_USERPAGE_CHECKOUT_DIR}

GATSBY_PAGE_SUBDIR="${GITHUB_USERPAGE_CHECKOUT_DIR}/gatsby-page"

mkdir -p "${GATSBY_PAGE_SUBDIR}"

cp -r "${SCRIPT_DIR}/../public/"* "${GATSBY_PAGE_SUBDIR}"

git config user.name "circle-ci (Lukas Woodtli)" &&  git config user.email lukas_woodtli@circle-ci.example.com
cd "${GATSBY_PAGE_SUBDIR}/"
git add .
git commit -m"Update Github gatsby page automated." || true
git push origin
