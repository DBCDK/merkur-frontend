#!/usr/bin/env bash

rm -rf target || true
cp -R e2e target

echo "### changing permissions on cypress test dir ###"
umask 002
# gid 50 is staff!
chgrp -R 50 target || true
chmod g+s target || true
chmod -R g+w target || true

if [[ ! -z "$BUILD_NUMBER" ]]; then
  export IMAGE=docker-io.dbc.dk/merkur-frontend:${BRANCH_NAME}-${BUILD_NUMBER}
else
  export IMAGE=docker-io.dbc.dk/merkur-frontend:devel
fi

export CYPRESS_IMAGE=docker.dbc.dk/cypress:run-as-node-user-7
docker pull ${CYPRESS_IMAGE}
docker-compose -f docker-compose-cypress.yml -p compose-${IMAGE} run e2e
docker-compose -f docker-compose-cypress.yml -p compose-${IMAGE} stop
docker-compose -f docker-compose-cypress.yml -p compose-${IMAGE} rm --force
