
## Project Overview

This dashboard is designed to analyze and visualize data retrieved from an Elasticsearch database. It offers insights into various aspects of setup box data, such as channel performance, top channels, slow channels, device monitoring, and configuration details.

## Tech Stack

  - Next.js - A React framework for server-rendered applications.
  - UI Library - @mui/joy for building user interfaces.
  - State Management - Redux and Redux-Saga for managing application state.
  - Charts - Chart.js and Highcharts for data visualization.
  - @elastic/elasticsearch - JavaScript client for Elasticsearch.

## For Development
To run this dashboard locally, follow these steps:


Node.js Runtime: 18.x or newer; 
 
1. Install dependencies:


```bash
npm install
```


2. Configure Elasticsearch: 
   
   - Ensure you have Elasticsearch up and running, and configure the data.



3. Start the development server:

```bash
npm run dev
```

This command will start the Next.js development server, and you can access the dashboard in your browser at http://localhost:3000.


## Folder Structure

Here's the folder structure for the project:

- **app/:** Next.js navigation related folder representing different sections of the `dashboard` and server side `api` related to elastic search and auth. For more detail [see here](https://nextjs.org/docs/app/building-your-application/routing).
- **data/:** This directory contains the API repository and any data-related files.
-  **domain/:** Here we put business logics. In the domain folder we have [Redux Store](#redux-store) and module specific folder. 


```csharp

smardtv-dashboard/
│
├── app/
│   ├── (dashboard)
│   │   ├── actions/
│   │   │   └── report-generation/
│   │   │       ├── page.tsx
│   │   │       └── styles.module.scss
│   │   │    
│   │   ├── analysis/
│   │   ├── configuration/
│   │   ├── map/
│   │   └── layout.tsx
│   │
│   ├── api
│   │   ├── auth/
│   │   │   ├── login/ 
│   │   │   └── ..  
│   │   │  
│   │   ├── elastic/
│   │   │   ├── bouquets/
│   │   │   ├── ..
│   │   │   └── api.constants.ts  
│   │   │  
│   │   └── api.constants.ts
│   │
│   ├── auth/
│   ├── favicon.ico
│   ├── layout.tsx
│   ├── page.tsx
│   └── ...
│
├── data/
│   ├── api/
│   │   ├── api.constants.ts
│   │   └── ..
│   │
│   ├── elastic/
│   │   ├── bouquets
│   │   │   └── bouquets.ts
│   │   └── ..
│   │
├── domain/
│   ├── charts
│   │   └── helper.ts
│   │
│   ├── ..
│   └── store/
│       ├── deviceMonitor/
│       │   ├── reducer.ts
│       │   ├── saga.ts
│       │   └── selector.ts
│       │
│       ├── ..
│       ├── store.constants.ts
│       └── store.ts
│   
├── resources/
│   ├── styles/
│   └── ...
│
├── tools/
│   ├── global.css
│   └── ...
|
├── types/
│   ├── analysis/
│   └── ...
|
├── ui/
│   ├── sections/
│   │   ├── actions/
│   │   │   └── ReportGeneration/
│   │   │       ├── ReportGeneration.module.scss
│   │   │       └── ReportGeneration.tsx
│   │   │   
│   │   └── ... 
│   │
│   ├── common/
│   ├── components/
│   ├── widgets/
│   ├── global.css
│   └── ...
│
├── .gitignore
├── package.json
├── README.md
└── ...

```


## Elastic Search Api:

The Elastic Search API is built using the following technology:

- **@elastic/elasticsearch**: The official JavaScript client for Elasticsearch, used to query and interact with the Elasticsearch database.

### API Endpoints

The Elastic Search API provides various endpoints for data retrieval and aggregation:

- [**events/**](src\app\api\elastic\events): Handles aggregation, hits, filters queries for event data.
- [**cities/**](src\app\api\elastic\cities): Contains logic for getting cities list.
- [**pincodes/**](src\app\api\elastic\pincodes): Contains logic for getting pincodes from event related index.
- [**bouquets/**](src\app\api\elastic\bouquets): Contains logic for getting bouquets from event related index.
- [**channels/**](src\app\api\elastic\channels): Contains logic for getting channels from event related index.

These endpoints are responsible for retrieving and processing data from the Elasticsearch database to populate the Next.js dashboard with relevant information.

These apis is called from [`data/api/elastic`](src\data\api\elastic) folder, which is client side code. Which is connect in Redux store's saga related files.

For example: Check [`this file`](src\domain\store\cities\saga.ts) for saga connection to api related to cities.




## Redux Store:

### Tech Stack
The project uses Redux, a predictable state container for webapp, to manage state. You can learn more about Redux in the [official Redux documentation](https://redux.js.org/).

The Redux store in the project is built using the following technologies:

- **Redux**: A predictable state container webapp.
- **Redux-Saga**: A library for managing side effects in Redux applications. For example calling api on effect of action.

### Store Modules

Each module within the `store/` directory represents a specific part of your application's state management. These states are in use inside `ui/` and in `app/` folder. Here's a brief description of one of the module:

- **deviceMonitor/**: Contains the state management logic and files related to Device Monitor section in dashboard. Including the following files:
  - `reducer.ts`: Defines the Redux reducer for Module 2.
  - `saga.ts`: Manages asynchronous actions and side effects for Module
  - `selector.ts`: Provides selectors to access specific parts of state.
  
For other modules you can check into folder [`domain/store/`](/src/domain/store)

## Dashboard Pages:

The dashboard consists of several pages, each dedicated to a specific information of the setup box data analysis. This is made according to nextJs navigation [more detail here](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts). Here's an overview of the available dashboard pages:

- **Channel Performance**: Displays performance metrics for various channels based on bouquet and bouquet channels selected.
- **Top Channels**: Provides insights into the top-performing channels based on different filters.
- **Slow Channels**: Provides insights into the slow-performing channels based on different filters.
- **Device Monitor**: Offers real-time monitoring of device status and statistics.
- **Configuration**: Allows users to view and manage setup box configurations.


## UI:

### Sections:

The user interface (UI) of the dashboard is organized into different sections, each responsible for presenting specific data and functionalities. These sections include:

- **Channel Performance Section**: Visualizes channel performance data.
- **Top Channels Section**: Presents information about top-performing channels.
- **Slow Channels Section**: Highlights channels with performance problems.
- **Device Monitor Section**: Displays real-time device monitoring data.
- **Configuration Section**: Provides a user interface for managing setup box configurations.


### Common:


### Widget:



## Other Parts:


### Dummy Auth API:



