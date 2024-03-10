"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import random from 'random';
const luxon_1 = require("luxon");
const elasticsearch_1 = require("@elastic/elasticsearch");
const random = require("fix-esm").require("random");
const esIndex = 'test_script';
var cities = {
    "Chennai": { "coordinates": [80.2785, 13.0878], "pincodes": ["600001", "600002", "600003"] },
    "Bangalore": { "coordinates": [77.5937, 12.9719], "pincodes": ["560001", "560002", "560003"] },
    "Delhi": { "coordinates": [77.2090, 28.6139], "pincodes": ["110001", "110002", "110003"] },
    "Mumbai": { "coordinates": [72.8777, 19.0760], "pincodes": ["400001", "400002", "400003"] }
};
// Creating channel names array
const channelNames = Array.from({ length: 100 }, (_, i) => `Channel ${i + 1}`);
// Creating channel numbers array
const channelNumbers = Array.from({ length: 100 }, (_, i) => (i + 1).toString());
// Creating channel mapping object
const channelMapping = {};
channelNames.forEach((name, index) => {
    channelMapping[name] = channelNumbers[index];
});
// Creating device IDs array
const deviceIds = Array.from({ length: 10 }, (_, i) => `Device ${i + 1}`);
// Creating genders array
const genders = ["Male", "Female"];
// Creating bouquet names array
const boquetNames = Array.from({ length: 20 }, (_, i) => `Boquet ${i + 1}`);
// Randomly associate device_ids with city coordinates
const deviceToCity = {};
const deviceToPincode = {};
// Define base timestamp
const baseTimestamp = luxon_1.DateTime.now(); //.fromISO("2024-03-10T00:00:55.000");
const assign = async () => {
    // const random  = await import("random");
    deviceIds.forEach(deviceId => {
        let city = random.default.choice(Object.keys(cities)) ?? "";
        let pincode = random.default.choice(cities[`${city}`].pincodes) ?? "";
        deviceToCity[`${deviceId}`] = city;
        deviceToPincode[`${deviceId}`] = pincode;
    });
};
const extract = async () => {
    let data = [];
    for (let i = 0; i < 10000; i++) {
        for (let j = 0; j < 4; j++) {
            const num_users = Math.floor(Math.random() * 4) + 1; // Decide number of users for this record (between 1 to 4)
            const users_gender = Array.from({ length: num_users }, () => genders[Math.floor(Math.random() * genders.length)]);
            const users_age = Array.from({ length: num_users }, () => Math.floor(Math.random() * 96) + 5); // Generating ages between 5 to 100
            const chosen_channel_name = channelNames[Math.floor(Math.random() * channelNames.length)];
            const chosen_channel_number = channelMapping[chosen_channel_name];
            const chosen_device_id = deviceIds[Math.floor(Math.random() * deviceIds.length)];
            const chosen_city = deviceToCity[chosen_device_id];
            const chosen_coordinates = cities[chosen_city].coordinates;
            const chosen_pincode = deviceToPincode[chosen_device_id];
            const record = {
                "channel_name": chosen_channel_name,
                "channel_number": chosen_channel_number,
                "bouquet_name": boquetNames[Math.floor(Math.random() * boquetNames.length)],
                "device_id": chosen_device_id,
                "event": "Timer",
                "timestamp": baseTimestamp.minus({ hours: i + (Math.random() * 10) }).toISO(),
                "pincode": chosen_pincode,
                "location": { "type": "Point", "coordinates": chosen_coordinates },
                "users_gender": users_gender,
                "users_age": users_age
            };
            data.push(record);
        }
    }
    const bulk = [];
    for (const cityItem of data) {
        const document = cityItem;
        // console.log("event_logs index: ", cityItem,)
        bulk.push({
            "index": {
                "_index": esIndex,
                //   "_type": type
            }
        });
        bulk.push(document);
    }
    return bulk;
};
const upload = async (bulk) => {
    console.log("Upload: ", process.env.ELASTIC_URL);
    let client;
    if (process.env.CA_64_KEY) {
        client = new elasticsearch_1.Client({
            node: process.env.ELASTIC_URL,
            tls: {
                ca: Buffer.from(process.env.CA_64_KEY, 'base64').toString('utf8'),
                checkServerIdentity: (host, cert) => {
                    return undefined;
                }
            },
            auth: {
                username: process.env.ELASTIC_USERNAME ?? "",
                password: process.env.ELASTIC_PASSWORD ?? ""
            }
        });
    }
    else {
        client = new elasticsearch_1.Client({
            node: process.env.ELASTIC_URL,
        });
    }
    let exist = await client.indices.exists({ index: esIndex });
    console.log("exits: ", exist);
    if (exist) {
        let isDeleted = await client.indices.delete({
            index: esIndex
        });
        console.log("IsDeleted: ", isDeleted);
        // , (err, res) => {
        //     if (err) {
        //         console.error(err);
        //     } else {
        //         console.log('Index deleted successfully');
        //     }
        // });
    }
    let isCreated = await client.indices.create({
        index: esIndex,
        mappings: {
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
        settings: {
            "index": {
                "mapping": {
                    "total_fields": {
                        "limit": 2000
                    }
                }
            }
        }
    });
    if (isCreated) {
        let result = await client.bulk({
            body: bulk
        });
        // console.log("result: ", result)
        return true;
    }
    return false;
    // console.log("bulk: ", bulk[1])
};
const complete = async () => {
    assign();
    let bulk = await extract();
    console.log("bulk: ", bulk.length);
    return await upload(bulk);
};
require("dotenv").config();
complete().then((result) => {
    console.log("Result: ", result);
});
