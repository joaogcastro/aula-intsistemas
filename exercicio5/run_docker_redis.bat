@echo off

docker run --name redis-container -p 6379:6379 -d redis
docker exec -it redis-container redis-cli
