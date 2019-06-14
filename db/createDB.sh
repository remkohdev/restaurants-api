#!/usr/bin/env bash

USERNAME="root"
PASSWORD="password"
IP='192.168.1.3'
PORT='5984'
	
PUTARGS="-X PUT"

DB="http://$USERNAME:$PASSWORD@$IP:$PORT"
RATINGS="$DB/ratings"
RATINGSVIEW="$RATINGS/_design/user-id"

echo '=====> delete existing databases'
curl -X DELETE $RATINGS
curl -X DELETE $DB/_users
curl -X DELETE $DB/_replicator
curl -X DELETE $DB/_global_changes
sleep 5
echo '=====> create single node system databases'
curl -X PUT $DB/_users
curl -X PUT $DB/_replicator
curl -X PUT $DB/_global_changes
echo '=====> create databases'
curl -X PUT $RATINGS
sleep 5
echo '=====> get all databases'
curl -X GET $DB/_all_dbs


echo '=====> create banks/name-view'
curl -X PUT -H "Content-Type: application/json" -d '{
  "views": {
    "user-id-view": {
      "map": "function (doc) {\n  if(doc.userId)\n  {\n    emit(doc.userId, doc); \n  }\n}"
    }
  },
  "language": "javascript"
}' $RATINGSVIEW

echo '=====> done'
