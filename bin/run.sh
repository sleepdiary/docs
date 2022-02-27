#!/bin/sh

set -e

if [ -e /opt/sleepdiary/utils.sh ]
then . /opt/sleepdiary/utils.sh
else printf '\033[1;31m/opt/sleepdiary/utils.sh not found - some checks bypassed.\033[0m\n'
fi

case "$1" in

    build)
        npx vuepress build --dest docs
        ;;

    test)
        generic_tests
        exit "$WARNED"
        ;;

    serve)
        npm run dev -- -p 8083
        ;;

    upgrade)
        npm upgrade
        rm -f yarn.lock
        yarn import
        ;;

    *)
        echo "Usage: $0 < build | test | serve | upgrade >"
        exit 2
        ;;

esac
