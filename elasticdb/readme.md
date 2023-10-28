# setup Elastic db: 


## get kibana token

- elastic db port: 9200 

- create user
```
curl -X POST elastic:password "http://localhost:9200/_security/api/realm/internal/user/kibana_user" -H "Content-Type: application/json" -d '{
"username": "kibana_user",
"roles": ["kibana_read_only"]
}'
```
- create token
```
curl -X POST -u elastic:password "localhost:9200/_security/service/elastic/kibana/credential/token/token1?pretty"
```

## common issue

- value of "elastic" is forbidden.

https://stackoverflow.com/questions/71615937/elasticsearch-kibana-docker-compose-value-of-elastic-is-forbidden/71937294#71937294

- dockerfile chmod: operation not permitted
https://serverfault.com/questions/967580/chmod-changing-permissions-of-myscript-sh-operation-not-permitted