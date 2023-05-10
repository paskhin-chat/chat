FROM nginx

ARG HTTP_AUTH_PASSWORD

RUN apt-get update && apt-get install -y apache2-utils
RUN htpasswd -cb /etc/nginx/.htpasswd root $HTTP_AUTH_PASSWORD

COPY ./packages/ui/dist/__build__ /usr/share/nginx/ui
COPY ./packages/client/dist /usr/share/nginx/client
COPY ./.docker/nginx/default.conf /etc/nginx/conf.d/

EXPOSE 3000 3001
