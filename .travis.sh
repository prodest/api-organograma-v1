#!/bin/bash
yarn 
gulp ts
docker build -t $DOCKER_IMAGE .