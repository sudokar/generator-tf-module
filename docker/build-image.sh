#!/bin/bash

# you may wish to change these, depending on how you're building / testing
OWNER="${OWNER:-sudokar}"
NAME="${NAME:-$(cat ../package.json | jq -r '.name')}"

# this grabs the version from package.json; you probably don't need to change
VERSION="${VERSION:-$(cat ../package.json | jq -r '.version')}"

# these are grabbed automatically; you really don't want the change
BUILD_DATE="${BUILD_DATE:-$(date -u +"%Y-%m-%dT%H:%M:%SZ")}"
VCS_REF="${VCS_REF:-$(git rev-parse --short HEAD)}"
DOCKER_ROOT="${DOCKER_ROOT:-$(git rev-parse --show-toplevel)/docker}"

# make sure we show the `docker build` command before it's executed
set -o xtrace

# perform the build using the arguments previously supplied
docker build --build-arg BUILD_DATE=$BUILD_DATE \
             --build-arg VCS_REF=$VCS_REF \
             --build-arg VERSION=$VERSION \
             --tag $OWNER/$NAME:$VERSION \
             "${DOCKER_ROOT}"

