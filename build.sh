#!/usr/bin/env bash

case "$1" in
    docker)
        echo "### building merkur frontend service docker ###"
        docker build -f ./Dockerfile --pull --no-cache . -t docker-io.dbc.dk/merkur-frontend:devel || exit 1
        if [[ ! -z "$BUILD_NUMBER" ]]; then
            docker tag docker-io.dbc.dk/merkur-frontend:devel docker-io.dbc.dk/merkur-frontend:${BRANCH_NAME}-${BUILD_NUMBER}
        fi
        ;;

    *)
        echo "### building merkur frontend project ###"

        npm ci || exit 1
        npm run prettier:ci || exit 1
        npm run lint || exit 1
        ;;
esac