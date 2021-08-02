#!/bin/bash

set -e
set -u
set -x

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" > /dev/null && pwd )"

export CYPRESS_CACHE_FOLDER="${SCRIPT_DIR}/cypress_cache"
export npm_config_cache="${SCRIPT_DIR}/.npm"

# Run this script in container:
# docker run -it --rm -v `pwd`:/workdir -w /workdir cypress/browsers:node14.17.0-chrome91-ff89 sh


echo Working dir
pwd

echo "Update npm"
npm install -g npm@7.9.0

echo "Building Web Page"

npm ci
#npx cypress install --force


npm run lint
npm run build
npm run test -- --karma-config karma.conf.ci.js
#npm run e2e:ci


GITHUB_USERPAGE_REPO="https://${DEPLOY_KEY}@github.com/LukasWoodtli/LukasWoodtli.github.io"

GITHUB_USERPAGE_CHECKOUT_DIR="${SCRIPT_DIR}/github-userpage-angular"
GITHUB_USERPAGE_ANGULAR_PAGE_DIR="${GITHUB_USERPAGE_CHECKOUT_DIR}/newpage"

git clone ${GITHUB_USERPAGE_REPO} ${GITHUB_USERPAGE_CHECKOUT_DIR}

pushd ${GITHUB_USERPAGE_CHECKOUT_DIR}

# Don't use jekyll for gh-userpage
touch "${GITHUB_USERPAGE_CHECKOUT_DIR}/.nojekyll"
git add "${GITHUB_USERPAGE_CHECKOUT_DIR}/.nojekyll"

rm -rf "${GITHUB_USERPAGE_ANGULAR_PAGE_DIR}" && mkdir -p "${GITHUB_USERPAGE_ANGULAR_PAGE_DIR}"

echo DEBUG
pwd
echo "${GITHUB_USERPAGE_ANGULAR_PAGE_DIR}"
ls "${GITHUB_USERPAGE_ANGULAR_PAGE_DIR}"
ls "${SCRIPT_DIR}/../dist/web-page/"
echo DEBUG END

cp -r "${SCRIPT_DIR}/../dist/web-page/"* "${GITHUB_USERPAGE_ANGULAR_PAGE_DIR}"

cp "${GITHUB_USERPAGE_ANGULAR_PAGE_DIR}/index.html" "${GITHUB_USERPAGE_ANGULAR_PAGE_DIR}/404.html"

# .gitignore file is only for 'master' in main repo not for gh-pages
rm -f "${GITHUB_USERPAGE_ANGULAR_PAGE_DIR}/assets/.gitignore"
git config user.name "travis (Lukas Woodtli)" &&  git config user.email lukas_woodtli@travis.example.com
git add "${GITHUB_USERPAGE_ANGULAR_PAGE_DIR}/"
git commit -m"Update Github angular page automated."
git push origin
