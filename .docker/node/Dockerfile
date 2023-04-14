FROM node

RUN apt update

WORKDIR /app

COPY ./packages/api/ /app/packages/api/
COPY ./packages/config/ /app/packages/config/
COPY package.json package-lock.json tsconfig.json /app/

RUN npm ci

COPY .env /app/
RUN npm run build:prod -w config
RUN rm .env

RUN npm run build:prod -w api

COPY ./.docker/node/pm2.config.json ./.docker/node/init.sh /app/

ENTRYPOINT ["/app/init.sh"]

CMD []
