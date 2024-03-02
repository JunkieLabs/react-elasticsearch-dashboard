"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xlsx_1 = __importDefault(require("xlsx"));
const elasticsearch_1 = require("@elastic/elasticsearch");
const extract = async () => {
    // Load the XLSX file
    const workbook = xlsx_1.default.readFile('data/city_list.xlsx');
    // Assume the first sheet is the one you want to work with
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    // Define the column names
    const columnNames = ['City Name', 'Latitude', 'Longitude'];
    // Convert XLSX data to an array of objects
    /**
     * any[]
     */
    const data = xlsx_1.default.utils.sheet_to_json(worksheet, { header: columnNames });
    console.log(data); // Array of objects with column data
    const index = 'cities';
    const bulk = [];
    for (const cityItem of data) {
        const document = {
            "city": cityItem["City Name"],
            "location": {
                "lat": cityItem['Latitude'],
                "lon": cityItem['Longitude']
            }
            // "_type":type
        };
        console.log("cityItem index: ", cityItem);
        bulk.push({
            "index": {
                "_index": index,
                //   "_type": type
            }
        });
        bulk.push(document);
    }
    return bulk;
};
const upload = async (bulk) => {
    console.log("Upload: ", process.env.ELASTIC_URL);
    const esIndex = 'cities';
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
        let isDeleted = client.indices.delete({
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
    const settings = {
        "mappings": {
            "properties": {
                "location": {
                    "type": "geo_point"
                }
            }
        }
    };
    let isCreated = await client.indices.create({
        index: esIndex,
        mappings: { "properties": {
                "location": {
                    "type": "geo_point"
                }
            } }
    });
    if (isCreated) {
        let result = await client.bulk({
            body: bulk
        });
        console.log("result: ", result);
    }
    // console.log("bulk: ", bulk[1])
    // client.indices.create({
    //     index: index,
    //     body: settings
    // }, (err, res) => {
    //     if (err) {
    //         console.error(err);
    //     } else {
    //         client.bulk({
    //             body: bulk
    //         }, (err, res) => {
    //             if (err) {
    //                 console.error(err);
    //             } else {
    //                 console.log('Documents added successfully');
    //             }
    //         });
    //     }
    // });
};
const complete = async () => {
    let bulk = await extract();
    console.log("Result: ", bulk);
    await upload(bulk);
};
require("dotenv").config();
complete().then((result) => {
    console.log("Result: ", result);
});
