# Setting up basic Elastic DB and Kibana with Docker

This guide will walk you through the steps to set up Elastic DB and Kibana using Docker Desktop. This is a basic setup with no security or password configuration.
`If for security, you can check [elastic_secure](./../elastic_secure/readme.md)  

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
   ELASTIC_PORT=9200
   KIBANA_PORT=5600

   ```

2. **Run Docker Compose:**

   ```bash
   docker-compose up -d
   ```

   This command will start Elastic DB and Kibana containers in the background.

3. **Access Elastic Kibana:**
   - Open your web browser and go to [http://localhost:5601](http://localhost:5601).
   - You should see the Kibana login page.

## Notes

- By default, this setup does not include any security or password protection. It's recommended to configure security settings according to your requirements before deploying to production.
- Ensure that Docker Desktop is running before executing Docker Compose commands.
