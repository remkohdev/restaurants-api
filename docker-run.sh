echo '=====>docker rm'
docker stop restaurants-api
sleep 2
docker rm restaurants-api
sleep 3

echo '=====>docker build'
docker build --no-cache -t restaurants-api .

echo '=====>docker run'
docker run --restart always --name restaurants-api -d -p 3000:3000 -e "COUCHDB_HOST=192.168.1.3" -e "COUCHDB_PORT=5984" -e "COUCHDB_USERNAME=root" -e "COUCHDB_PASSWORD=password" restaurants-api
