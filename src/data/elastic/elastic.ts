import { ClientOptions } from '@elastic/elasticsearch';


const createElasticSearchClient = async (options: ClientOptions) => {
    const { Client } = await import('@elastic/elasticsearch');
    // console.log('====================================================', options);
    var cl =  new Client(options);

    try {
        await cl.ping();
        console.log('Elasticsearch client is connected');
      } catch (error) {
        console.error('Elasticsearch client connection failed:', error);
      }
      return cl;
}

// export default createElasticSearchClient


const DEFAULTS: ClientOptions = {
    node: process.env.NEXT_ELASTIC_URL ?? 'http://localhost:9200',
};

export const getElasticClient = async () => {
    return createElasticSearchClient(getElasticOptions());
}

function getElasticOptions(): ClientOptions {
    // this branch is for dev
    return {
        node: DEFAULTS.node,
    };
}

// process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT