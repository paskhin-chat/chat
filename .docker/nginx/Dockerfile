FROM nginx

ARG HTTP_AUTH_PASSWORD

RUN apt-get update && apt-get install -y apache2-utils

COPY ./packages/ui/dist/__build__ /usr/share/nginx/ui
COPY ./packages/client/dist /usr/share/nginx/client

RUN htpasswd -cb /etc/nginx/.htpasswd root $HTTP_AUTH_PASSWORD

COPY ./.docker/nginx/default.conf /etc/nginx/conf.d/

EXPOSE 80
