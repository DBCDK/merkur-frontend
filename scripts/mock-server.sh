#!/usr/bin/env bash

docker run -it --rm \
  -p 8080:8080 \
  --name wiremock \
  -v $PWD/wiremock:/home/wiremock \
  docker-metascrum.artifacts.dbccloud.dk/wiremock:3.3.1