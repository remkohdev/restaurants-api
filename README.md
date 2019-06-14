# restaurants-api

# Install

Configure the '.docker.env' (currently not used), the 'controllers/rating.controller.ts' (line 11),
docker-run.sh,

```
docker network create ibm-network
docker-compose build
docker-compose up -d
sh db/createDB.sh
curl -X POST "http://192.168.1.3:3000/rating" -H "accept: */*" -H "Content-Type: application/json" -d "{\"userId\":1,\"placeId\":\"12\",\"visited\":true,\"rating\":\"great\"}"
curl -X GET "http://192.168.1.3:3000/rating/1" -H "accept: */*"
```

# Loopback

[![LoopBack](<https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png>)](http://loopback.io/)
