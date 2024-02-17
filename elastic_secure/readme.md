# Elastic - Kibana - Docker - Nginx - Letsencrypt

---

### Introduction

Setup a Elastic + Kibana stack in seconds! Ready for public use with TLS enabled between nodes, and automatic SSL/TLS certificates + renewal with certbot and Nginx.

Docker-compose follows Elastic's official documentation for creating a Elastic Stack on Docker. More information can be found on their official site.
https://www.elastic.co/guide/en/elastic-stack-get-started/current/get-started-docker.html
https://www.elastic.co/guide/en/elasticsearch/reference/current/configuring-tls-docker.html

### DISCLAIMER

Instructions and scripts are designed to be used with the version listed in the .env file.

### Instructions

1. Create Certificate Authority:
   - Install Openssl if your system don't have.
   - Certificate Url [Opensssl Download](https://knowledge.digicert.com/solution/generate-a-certificate-signing-request-using-openssl-on-microsoft-windows-system)
   - private key
   `openssl genpkey -algorithm RSA -out ca.key`
   - private certificate
   `openssl req -x509 -new -key ca.key -out ca.crt`.

2.  Setup Docker Compose: (https://github.com/wdrdres3qew5ts21/MeetU/blob/master/docker-compose-elastic-single-full-ssl.yml)
   
3.  
