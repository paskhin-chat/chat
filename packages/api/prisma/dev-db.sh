export CONTAINER_NAME="chat-dev-db"

if [ ! "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
  if [ "$(docker ps -aq -f status=exited -f name=$CONTAINER_NAME)" ]; then
    docker rm $CONTAINER_NAME
  fi
  docker run --name $CONTAINER_NAME \
    --rm -d \
    -e POSTGRES_DB=dev \
    -e POSTGRES_USER=root \
    -e POSTGRES_PASSWORD=root \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -v /dev-db-data:/var/lib/postgresql/data \
    -p 5432:5432 \
    postgres:14.2-alpine
fi
