# shellcheck shell=bash

set -eo pipefail

root=$(git rev-parse --show-toplevel)

if [ ! -d "${root}/node_modules" ]; then
  npm install
fi

ctl format

# We do not want to proceed with publishing if there are uncommitted changes.
if [ -n "$(git status --porcelain)" ]; then
  echo "unable to publish as there are uncommitted changes"
  exit 1
fi

ctl lint
ctl test
ctl build

npm run publish

version=$(jq -r '.version' "$root/package.json")
tag="v$version"
git tag "$tag"
git push origin "$tag"

set +eo pipefail
