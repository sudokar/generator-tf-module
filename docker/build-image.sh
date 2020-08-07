#!/bin/bash

OWNER="${OWNER:-sudokar}"
VERSION="${VERSION:-$(cat ../package.json | jq -r '.version')}"
NAME="${NAME:-$(cat ../package.json | jq -r '.name')}"
BUILD_DATE="${BUILD_DATE:-$(date -u +"%Y-%m-%dT%H:%M:%SZ")}"
VCS_REF="${VCS_REF:-$(git rev-parse --short HEAD)}"

docker build --build-arg BUILD_DATE=$BUILD_DATE \
             --build-arg VCS_REF=$VCS_REF \
             --build-arg VERSION=$VERSION -t $OWNER/$NAME:$VERSION .

docker tag $OWNER/$NAME:$VERSION $OWNER/$NAME:latest