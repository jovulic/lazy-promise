# shellcheck shell=bash

# We do not want to proceed with publishing if there are uncommitted changes.
if [ -n "$(git status --porcelain)" ]; then
  echo "unable to publish as there are uncommitted changes"
  exit 1
fi

root=$(git rev-parse --show-toplevel)

ctl format
ctl lint
ctl test
ctl build

npm run publish

version=$(jq -r '.version' "$root/package.json")
tag="v$version"
git tag "$tag"
git push origin "$tag"
