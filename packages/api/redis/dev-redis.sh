export CONTAINER_NAME="chat-dev-redis"

if [ ! "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
  if [ "$(docker ps -aq -f status=exited -f name=$CONTAINER_NAME)" ]; then
    docker rm $CONTAINER_NAME
  fi
  docker run --name $CONTAINER_NAME \
    --rm -d \
    -h localhost \
    -p 6379:6379 \
    redis
fi
