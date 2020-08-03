#! /bin/bash

VERSION=0.6.1

docker build --build-arg BUILD_DATE=`date -u +"%Y-%m-%dT%H:%M:%SZ"` \
             --build-arg VCS_REF=`git rev-parse --short HEAD` \
             --build-arg VERSION=$VERSION -t sudokar/generator-tf-module:$VERSION .

docker tag sudokar/generator-tf-module:$VERSION sudokar/generator-tf-module:latest