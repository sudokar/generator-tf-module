#!/bin/bash

# This script builds the Docker image for Sudokar's generator-tf-module
# tool.  Generally speaking, it's often sufficient to grab this image
# from Docker Hub rather than building it separately.
#
# To pull from Docker Hub:
#   docker pull sudokar/generator-tf-module:latest
#
# For more about the image on Docker Hub:
#   https://hub.docker.com/r/sudokar/generator-tf-module

# since this is a change from previous behavior (the 'jq' requirement is
# new), make sure to check we can locate the newly required command; if
# not, provide a helpful message (to STDERR) to the user so they can 
# remedy the problem, and then exit with an error code so it's clear
# that the build was not successful.
if ! which jq > /dev/null ; then
  echo "This build script now requires 'jq' to build." 1>&2
  echo "Find it at: https://stedolan.github.io/jq/" 1>&2
  exit 1
fi

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
