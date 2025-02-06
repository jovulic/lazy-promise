# shellcheck shell=bash

# We do not want to proceed with publishing if there are uncommitted changes.
if [ -n "$(git status --porcelain)" ]; then
  echo "unable to publish as there are uncommitted changes"
  exit 1
fi

npm run publish
