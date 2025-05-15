# How to

``` bash
docker pull rabbitmq:3-management
docker run --rm -it -p 8080:15672 -p 5672:5672 rabbitmq:3-management
node receiver.js
node sender.js
```