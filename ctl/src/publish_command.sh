# shellcheck shell=bash

set -eo pipefail

set +o nounset
local="${args[--local]}"
set -o nounset

root=$(git rev-parse --show-toplevel)

ctl setup --lazy
ctl format

# We do not want to proceed with publishing if there are uncommitted changes.
if [ -n "$(git status --porcelain)" ]; then
  echo "unable to publish as there are uncommitted changes"
  exit 1
fi

ctl lint
ctl test
ctl build

# Note that we normally do not publish the package. Instead we delegate that to
# GitHub Actions which will look for the tag and perform the publishing.
if [ "$local" ]; then
  npm run publish
fi

version=$(jq -r '.version' "$root/package.json")
tag="v$version"
git tag -f "$tag"
git push origin "$tag"

set +eo pipefail
