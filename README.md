# restaurants-api

# Optional

clean docker

```
docker ps -a -q | xargs docker stop
docker ps -a -q | xargs docker rm
yes | docker system prune -a
docker ps -a
```

# Configure

Retrieve you localhost IP address,

```
ipconfig getifaddr en0
  192.168.1.3
```

Edit the file '.docker.env',

```
COUCHDB_USER=root
COUCHDB_PASSWORD=password
COUCHDB_SERVER=192.168.1.3
COUCHDB_PORT=5984
COUCHDB_PROTOCOL=http
```

and the file 'db/createDB.sh'

```
USERNAME="root"
PASSWORD="password"
IP='192.168.1.3'
PORT='5984'
```

TODO: read from same config file

# Install

Configure the '.docker.env' (currently not used), the 'controllers/rating.controller.ts' (line 11),
docker-run.sh,

```
git clone git@github.com:remkohdev/restaurants-api.git
cd restaurants-api
docker network create ibm-network
docker-compose build
docker-compose up -d
```

Make sure you can login to CouchDB,

```
open http://localhost:5984/_utils/#
```

```
sh db/createDB.sh
curl -X POST "http://192.168.1.3:3000/rating" -H "accept: */*" -H "Content-Type: application/json" -d "{\"userId\":1,\"placeId\":\"12\",\"visited\":true,\"rating\":\"great\"}"
curl -X GET "http://192.168.1.3:3000/rating/1" -H "accept: */*"
```

Try the loopback/explorer,

```
open http://localhost:3000/explorer/
```

# Loopback

[![LoopBack](<https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png>)](http://loopback.io/)
