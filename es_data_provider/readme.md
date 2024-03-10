# Populating Data into Elastic DB

This guide will walk you through the steps to build and run TypeScript scripts to populate data into Elasticsearch DB using Docker Desktop.

## Prerequisites

Before you begin, ensure you have Node.js and npm installed on your system. Also, make sure you have Docker Desktop installed and Elasticsearch DB container running as per the setup mentioned in the previous section.

## Setup TypeScript Scripts

Follow these steps to set up TypeScript scripts for populating data into Elasticsearch DB:

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Build TypeScript script:**

   ```bash
   npm run build
   ```

## Populate Data into Elasticsearch DB

### City List Population

1. **Run the script:**

   ```bash
   node dist/city_list.js
   ```

   This script will add cities with geolocation from the local `data/city_list.xlsx` file to Elasticsearch DB.

### Event Generator

2. **Run the script:**

   ```bash
   node dist/event_generator.js
   ```

   This script will generate dummy past events for different locations and populate them into Elasticsearch DB.

## Notes

- Ensure that Elasticsearch DB container is running before executing the scripts.
- Modify the scripts if needed to match your Elasticsearch DB configuration or data format.
