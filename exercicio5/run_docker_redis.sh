#!/bin/bash

docker run --name redis-container -p 6379:6379 -d redis
echo "Redis container running"
