const XLSX = require('xlsx');
const fs = require('fs');
// const elasticsearch = require('elasticsearch');
const { ClientOptions, Client } = require('@elastic/elasticsearch');


// Load the XLSX file
const data = JSON.parse(fs.readFileSync('data/data_logs.json'));


// console.log(data); // Array of objects with column data



const index = 'test_script';

const bulk = [];

for (const cityItem of data) {
    const document = cityItem;

    // console.log("event_logs index: ", cityItem,)


    bulk.push({
        "index": {
            "_index": index,
            //   "_type": type
        }
    });
    bulk.push(document);
}

const client = new Client({
    node: 'http://192.168.1.16:9200'
});


// try{

client.indices.exists({ index: index }).then(

    (isExist) => {
        if (isExist) {

            try {

                console.log("client.delete: ", bulk[1], data[1])


                client.indices.delete({
                    index: index
                }).then((val) => {

                    console.log('Index deleted successfully');

                    createAndAdd();


                }, (err) => {
                    console.log('Index deleted err');

                    console.error(err);
                });
            } catch (e) {

            }


        } else {
            createAndAdd();
        }
    }
)

// }catch(e){

// }


const settings = {
    "mappings": {

        "properties": {
            // "channel_name": {
            //     "type": "text"
            // },
            // "bouquet_name": { "type": "text" },
            // "deviceId": { "type": "text" },
            "user_age": { "type": "integer" },
            "event": { "type": "text" },
            "timestamp": {
                "type": "date",
                "store": true
            },
            "message": { "type": "text" },
            "location": {
                "type": "geo_point"
            }
        },
        "dynamic_templates": [
            {
                "timestamps": {
                    "match_mapping_type": "date",
                    "mapping": {
                        "type": "date",
                        "format": "strict_date_optional_time||epoch_millis",
                        "store": true
                    }
                }
            }
        ],
        "date_detection": true

    },
    "settings": {
        "index": {
            "mapping": {
                "total_fields": {
                    "limit": 2000
                }
            }
        }
    }
};


function createAndAdd() {

    console.log("bulk: ", bulk[1], bulk.length)

    client.indices.create({
        index: index,
        body: settings
    }).then((res) => {

        client.bulk({
            body: bulk
        }).then((res) => {

            console.log('Documents added successfully');

        }, (err) => {
            console.error(err);
        });

    }, err => {
        console.error(err);
    });
}




// client.bulk({
//   body: bulk
// }, (err, res) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log('Documents added successfully');
//   }
// });