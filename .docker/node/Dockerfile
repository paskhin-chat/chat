FROM node

WORKDIR /app

COPY ./packages/api/ /app/packages/api/
COPY ./packages/constant/ /app/packages/constant/
COPY ./node_modules/ /app/node_modules/
COPY ./package.json /app/

COPY ./.docker/node/pm2.config.json ./.docker/node/init.sh ./.env /app/

ENTRYPOINT ["/app/init.sh"]

EXPOSE 3002

CMD []
