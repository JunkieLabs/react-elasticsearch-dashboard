#!/bin/bash
set -e


# log "Waiting for Elasticsearch to be ready..."
echo " ${ELASTIC_PASSWORD} ${KIBANA_PASSWORD}"

# curl GET -v -k --cacert /usr/share/elasticsearch/config/certificates/ca/ca.crt "https://es01:9200"  -u elastic:${ELASTIC_PASSWORD} 

curl -X POST -v -k --cacert /usr/share/elasticsearch/config/certificates/ca/ca.crt "https://es01:9200/_security/user/kibana/_password?pretty"  -u elastic:${ELASTIC_PASSWORD}   -H 'Content-Type: application/json' -d '{ "password" : "'${KIBANA_PASSWORD}'" }' 


if [[ $? == 51 ]]
then
  echo "Connect but it not secure So fail to change Password"
else
  echo "Skip SSL Secure Connection by -k argument so Change password Success"
fi

echo "======= ${ELASTIC_PASSWORD}"
echo "Variable two sign : $$?"
echo "Variable single sign: $?"

# #!/bin/bash

# curl -k  https://es01:9200

echo "Yeah $?"