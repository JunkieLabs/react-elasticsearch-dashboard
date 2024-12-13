// import random from 'random';
import { DateTime, Duration } from 'luxon';
import { ClientOptions, Client } from '@elastic/elasticsearch';

const random = require("fix-esm").require("random");

const esIndex = 'test_script';
var cities: { [key: string]: any } = {
    "Chennai": { "coordinates": [80.2785, 13.0878], "pincodes": ["600001", "600002", "600003"] },
    "Bangalore": { "coordinates": [77.5937, 12.9719], "pincodes": ["560001", "560002", "560003"] },
    "Delhi": { "coordinates": [77.2090, 28.6139], "pincodes": ["110001", "110002", "110003"] },
    "Mumbai": { "coordinates": [72.8777, 19.0760], "pincodes": ["400001", "400002", "400003"] }
}

// Creating channel names array
const channelNames: string[] = Array.from({ length: 100 }, (_, i) => `Channel ${i + 1}`);

// Creating channel numbers array
const channelNumbers: string[] = Array.from({ length: 100 }, (_, i) => (i + 1).toString());

// Creating channel mapping object
const channelMapping: { [key: string]: string } = {};
channelNames.forEach((name, index) => {
    channelMapping[name] = channelNumbers[index];
});

// Creating device IDs array
const deviceIds: string[] = Array.from({ length: 10 }, (_, i) => `Device ${i + 1}`);

// Creating genders array
const genders: string[] = ["Male", "Female"];

// Creating bouquet names array
const boquetNames: string[] = Array.from({ length: 20 }, (_, i) => `Boquet ${i + 1}`);

// Randomly associate device_ids with city coordinates
const deviceToCity: { [key: string]: string } = {};
const deviceToPincode: { [key: string]: string } = {};


// Define base timestamp
const baseTimestamp: DateTime = DateTime.now()//.fromISO("2024-03-10T00:00:55.000");

const assign = async () => {
    // const random  = await import("random");

    deviceIds.forEach(deviceId => {

        let city: string = random.default.choice(Object.keys(cities)) ?? "";
        let pincode: string = random.default.choice(cities[`${city}`].pincodes) ?? "";

        deviceToCity[`${deviceId}`] = city;
        deviceToPincode[`${deviceId}`] = pincode;
    });

}

const extract = async (start:number=0, end:number=1000): Promise<any[]> => {


    let data = [];
    for (let i = start; i < end; i++) {


        for (let j = 0; j < 4; j++) {
            const num_users: number = Math.floor(Math.random() * 4) + 1; // Decide number of users for this record (between 1 to 4)
            const users_gender: string[] = Array.from({ length: num_users }, () => genders[Math.floor(Math.random() * genders.length)]);
            const users_age: number[] = Array.from({ length: num_users }, () => Math.floor(Math.random() * 96) + 5); // Generating ages between 5 to 100

            const chosen_channel_name: string = channelNames[Math.floor(Math.random() * channelNames.length)];
            const chosen_channel_number: string = channelMapping[chosen_channel_name];
            const chosen_device_id: string = deviceIds[Math.floor(Math.random() * deviceIds.length)];
            const chosen_city: string = deviceToCity[chosen_device_id];
            const chosen_coordinates: [number, number] = cities[chosen_city].coordinates;
            const chosen_pincode: string = deviceToPincode[chosen_device_id];

            const record: any = {
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
    for (const item of data) {
        const document = item;
    
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
}


const clearAndCreate = async () =>{

    let client: Client;


    if (process.env.CA_64_CRT) {
        client = new Client({
            node: process.env.ELASTIC_URL,
            tls: {
                ca: Buffer.from(process.env.CA_64_CRT, 'base64').toString('utf8'),
                checkServerIdentity : (host, cert) => {
                    return undefined

                }
            },
            auth: {
                username: process.env.ELASTIC_USERNAME ?? "",
                password: process.env.ELASTIC_PASSWORD ?? ""
            }

        });
    } else {
        client = new Client({
            node: process.env.ELASTIC_URL,

        });
    }
    let exist = await client.indices.exists({ index: esIndex })
    if (exist) {
        let isDeleted = await client.indices.delete({
            index: esIndex
        })

        console.log("IsDeleted: ", isDeleted)
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

    return isCreated;
}

const upload = async (bulk: any[]) => {

    console.log("Upload: ", process.env.ELASTIC_URL)


    let client: Client;


    if (process.env.CA_64_CRT) {
        client = new Client({
            node: process.env.ELASTIC_URL,
            tls: {
                ca: Buffer.from(process.env.CA_64_CRT, 'base64').toString('utf8'),
                checkServerIdentity : (host, cert) => {
                    return undefined

                }
            },
            auth: {
                username: process.env.ELASTIC_USERNAME ?? "",
                password: process.env.ELASTIC_PASSWORD ?? ""
            }

        });
    } else {
        client = new Client({
            node: process.env.ELASTIC_URL,

        });
    }
    // let exist = await client.indices.exists({ index: esIndex })

    // console.log("exits: ", exist)

    // if (exist) {
    //     let isDeleted = await client.indices.delete({
    //         index: esIndex
    //     })

    //     console.log("IsDeleted: ", isDeleted)
    //     // , (err, res) => {
    //     //     if (err) {
    //     //         console.error(err);
    //     //     } else {
    //     //         console.log('Index deleted successfully');
    //     //     }
    //     // });
    // }

    // let isCreated = await client.indices.create({
    //     index: esIndex,
    //     mappings: {
    //         "properties": {
    //             // "channel_name": {
    //             //     "type": "text"
    //             // },
    //             // "bouquet_name": { "type": "text" },
    //             // "deviceId": { "type": "text" },
    //             "user_age": { "type": "integer" },
    //             "event": { "type": "text" },
    //             "timestamp": {
    //                 "type": "date",
    //                 "store": true
    //             },
    //             "message": { "type": "text" },
    //             "location": {
    //                 "type": "geo_point"
    //             }
    //         },
    //         "dynamic_templates": [
    //             {
    //                 "timestamps": {
    //                     "match_mapping_type": "date",
    //                     "mapping": {
    //                         "type": "date",
    //                         "format": "strict_date_optional_time||epoch_millis",
    //                         "store": true
    //                     }
    //                 }
    //             }
    //         ],
    //         "date_detection": true
    //     },
    //     settings: {
    //         "index": {
    //             "mapping": {
    //                 "total_fields": {
    //                     "limit": 2000
    //                 }
    //             }
    //         }
    //     }
    // });

        let result = await client.bulk({
            body: bulk
        })
        // console.log("result: ", result)

        return true

    
    return false
    // console.log("bulk: ", bulk[1])


}


const complete = async () => {

   await  assign()

    var isCreated = await clearAndCreate();

    if(!isCreated){
        return false;
    }
    console.log("created: ")
    let bulk = await extract(0, 500)
    console.log("bulk: ", bulk.length)
    var isuploaded =  await upload(bulk)

    console.log("isuploaded: ", isuploaded);
     bulk = await extract(500, 1000)
    console.log("bulk 2: ", bulk.length)
    return await upload(bulk)
    // return isuploaded;

}

require("dotenv").config();




complete().then((result) => {
    console.log("Result: ", result)
});