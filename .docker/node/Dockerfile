FROM node

RUN apt update

WORKDIR /app

COPY ./packages/api/ /app/packages/api/
COPY ./packages/config/ /app/packages/config/
COPY ./node_modules/ /app/node_modules/
COPY ./package.json /app/

COPY ./.docker/node/pm2.config.json ./.docker/node/init.sh /app/

ENTRYPOINT ["/app/init.sh"]

CMD []
