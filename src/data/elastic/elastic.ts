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
    node: process.env.NEXT_ELASTIC_URL ?? 'http://localhost:92011',
};

export const getElasticClient = async () => {
    return createElasticSearchClient(getElasticOptions());
}

function getElasticOptions(): ClientOptions {
    // this branch is for dev

    if (process.env.NEXT_ELASTIC_CA_64_CRT) {

        console.log("getElasticOptions elastic : ",process.env.NEXT_ELASTIC_URL )
        return {
            node: process.env.NEXT_ELASTIC_URL,
            tls: {
                ca: Buffer.from(process.env.NEXT_ELASTIC_CA_64_CRT, 'base64').toString('utf8'),
                checkServerIdentity : (host, cert) => {
                    return undefined

                }

            },
            
            auth: {
                username: process.env.NEXT_ELASTIC_USERNAME ?? "",
                password: process.env.NEXT_ELASTIC_PASSWORD ?? ""
            }

        };
    } else {
       return {
            node: process.env.NEXT_ELASTIC_URL,

        };
    }
    // return {
    //     node: DEFAULTS.node,
    // };
}

// process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT