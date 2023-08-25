const XLSX = require('xlsx');
const fs = require('fs');
const elasticsearch = require('elasticsearch');

// Load the XLSX file
const data = JSON.parse(fs.readFileSync('data/data_logs.json'));


// console.log(data); // Array of objects with column data



const index = 'event_log';

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

const client = new elasticsearch.Client({
    host: '192.168.1.16:9200'
});


if (client.indices.exists({ index: index })) {

    console.log("client.indices.exists: ", bulk[1], data[1])
    client.indices.delete({
        index: index
    }, (err, res) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Index deleted successfully');
        }
    });

}
const settings = {
    "mappings": {

        "properties": {
            "channel_name": {
                "type": "text"
            },
            "bouquet_name": { "type": "text" },
            "deviceId": { "type": "text" },
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

console.log("bulk: ", bulk[1])

client.indices.create({
    index: index,
    body: settings
}, (err, res) => {
    if (err) {
        console.error(err);
    } else {
        client.bulk({
            body: bulk
        }, (err, res) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Documents added successfully');
            }
        });
    }
});


// client.bulk({
//   body: bulk
// }, (err, res) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log('Documents added successfully');
//   }
// });