#!/bin/bash
set -e


# log "Waiting for Elasticsearch to be ready..."
echo "${ELASTIC_PORT} ${ELASTICSEARCH_PASSWORD}"
# Wait for Elasticsearch to be available
until curl -sS -XGET "http://elasticsearch:9200" > /dev/null; do
  echo "Waiting for Elasticsearch to be ready..."
  sleep 5
done

sleep 10
# read -p "Pause Time .5 seconds" -t 0.5



echo "Creating the service account token..."
TOKENS_RESPONSE=$(curl -X GET -u elastic:${ELASTICSEARCH_PASSWORD} "http://elasticsearch:9200/_security/service/elastic/kibana/credential?pretty")


TOKENS_FOUND=$(echo "$TOKENS_RESPONSE" | jq -r '.count')


# Use jq to parse the response and check if the token exists
if echo "$TOKENS_RESPONSE" | jq -e ".tokens.token1" > /dev/null; then

    curl -X DELETE -u elastic:${ELASTICSEARCH_PASSWORD} "http://elasticsearch:9200/_security/service/elastic/kibana/credential/token/token1?pretty"
    echo "Token already exists."
else 
    echo "Token not found"
fi


# Create the service account token using the API call and extract the token value
TOKEN_RESPONSE=$(curl -X POST -u elastic:${ELASTICSEARCH_PASSWORD} "http://elasticsearch:9200/_security/service/elastic/kibana/credential/token/token1?pretty")

# Extract the token value from the response
ELASTIC_TOKEN=$(echo "$TOKEN_RESPONSE" | jq -r '.token.value')

echo "token: ${TOKEN_RESPONSE}"

echo "token: ${ELASTIC_TOKEN}"
# log "Token creation completed. Token: $ELASTICSEARCH_SERVICEACCOUNTTOKEN"

# Set the token as an environment variable for Kibana
export ELASTICSEARCH_SERVICEACCOUNTTOKEN=${ELASTIC_TOKEN}

echo "token env: ${ELASTICSEARCH_SERVICEACCOUNTTOKEN}"
# log "Starting Kibana..."
# Start Kibana
# exec /usr/share/kibana/bin/kibana

exec /usr/share/kibana/bin/kibana --elasticsearch.password ${ELASTICSEARCH_PASSWORD} --elasticsearch.serviceAccountToken ${ELASTICSEARCH_SERVICEACCOUNTTOKEN}
