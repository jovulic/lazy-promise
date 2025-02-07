# shellcheck shell=bash

set -eo pipefail

root=$(git rev-parse --show-toplevel)

if [ ! -d "${root}/node_modules" ]; then
  npm install
fi

npm run lint

set +eo pipefail
