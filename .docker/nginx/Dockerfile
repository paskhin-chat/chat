FROM node as node

RUN apt update

WORKDIR /app

COPY ./packages/config/ /app/packages/config/
COPY ./packages/ui/ /app/packages/ui/
COPY ./packages/client/ /app/packages/client/
COPY package.json package-lock.json tsconfig.json /app/

RUN npm ci

COPY .env /app/
RUN npm run build:prod -w config
RUN rm .env

RUN npm run build:prod -w ui

FROM nginx

ARG HTTP_AUTH_PASSWORD

RUN apt-get update && apt-get install -y apache2-utils

COPY --from=node /app/packages/ui/dist/__build__ /usr/share/nginx/ui
COPY --from=node /app/packages/client/dist /usr/share/nginx/client

RUN htpasswd -cb /etc/nginx/.htpasswd root $HTTP_AUTH_PASSWORD

COPY /.docker/nginx/default.conf /etc/nginx/conf.d/

EXPOSE 80
