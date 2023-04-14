#!/bin/sh

npm exec -c 'prisma migrate deploy' -w api && npm exec -c 'prisma generate' -w api
node ./node_modules/.bin/pm2-runtime start pm2.config.json
