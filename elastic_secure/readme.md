# Setting up secure Elastic DB and Kibana with Docker

This guide will walk you through the steps to set up Elastic DB and Kibana using Docker Desktop. This is a basic setup with no security or password configuration.
`If for simple setup, you can check [elasticdb](./../elasticdb/readme.md)  

---

## Prerequisites

Before you begin, ensure you have Docker Desktop installed on your system. If not, follow the steps below to install Docker Desktop:

1. **Install Docker Desktop:**
   - Go to the Docker website: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
   - Download Docker Desktop for your operating system (Windows/Mac).
   - Follow the installation instructions provided for your platform.

## Setup Elastic DB and Kibana

Follow these steps to set up Elastic DB and Kibana using Docker Desktop:

1. **Create .env file, and put env variables like in example.env file:**

   ```env
   ELASTIC_VERSION=8.8.0
   KIBANA_VERSION=8.7.1
   ELASTIC_SECURITY=true
   ELASTIC_PASSWORD=password
   KIBANA_PASSWORD=passwordkibana
   COMPOSE_PROJECT_NAME=es
   CERTS_DIR=/usr/share/elasticsearch/config/certificates
   KIBANA_ENCRYPTION_KEY=random32CharactorString
   ELASTIC_PORT=9200
   KIBANA_PORT=5601

   ```

2. **Create Certificate Authority:**
   - Install Openssl if your system don't have.
   - Certificate Url [Opensssl Download](https://knowledge.digicert.com/solution/generate-a-certificate-signing-request-using-openssl-on-microsoft-windows-system)
   - create folder:

   ```bash
   mkdir -p folder/subfolder
   ```

   - create private key

   ```bash
   openssl genpkey -algorithm RSA -out certs/ca/ca.key 
   ```

   - private certificate

   ```bash
   openssl req -x509 -new -key certs/ca/ca.key -out certs/ca/ca.crt -days 36500
   ```

   - after this you will see certs folder with ca certificates.

3. **Create TLS certificates for encrypted communications between nodes:**

   ```bash
   docker-compose -f create-certs.yml run --rm create_certs
   ```  

   - in cert folder you will see es01 and kib01 folder respectively.

4. **Run Docker Compose:**

   ```bash
   docker-compose up -d
   ```

   This command will start Elastic DB and Kibana containers in the background.

5. **Change Password for kibana**

   - open bash inside es01 container

   ```bash
   docker exec -it es01 bash
   ```  

   - run changePassword.sh mounted inside the container

   ```bash
   sh /usr/share/elasticsearch/changePassword.sh
   ```

6. **Access Elastic Kibana:**
   - Open your web browser and go to [https://localhost:5601](https://localhost:5601).
   - You should see the Kibana login page.
   - put user as: elastic and password value from your env file ELASTIC_PASSWORD.

## Notes

- By default, this setup does not include any security or password protection. It's recommended to configure security settings according to your requirements before deploying to production.
- Ensure that Docker Desktop is running before executing Docker Compose commands.
- Docker-compose follows Elastic's official documentation for creating a Elastic Stack on Docker. More information can be found on their official site.
<https://www.elastic.co/guide/en/elastic-stack-get-started/current/get-started-docker.html>
<https://www.elastic.co/guide/en/elasticsearch/reference/current/configuring-tls-docker.html>
