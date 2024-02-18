"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xlsx_1 = __importDefault(require("xlsx"));
const elasticsearch_1 = require("@elastic/elasticsearch");
const extract = () => __awaiter(void 0, void 0, void 0, function* () {
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
});
const upload = (bulk) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log("Upload: ", process.env.ELASTIC_URL);
    const esIndex = 'cities';
    let client;
    if (process.env.CA_64_KEY) {
        client = new elasticsearch_1.Client({
            node: process.env.ELASTIC_URL,
            tls: {
                ca: Buffer.from(process.env.CA_64_KEY, 'base64').toString('utf8')
            },
            auth: {
                username: (_a = process.env.ELASTIC_USERNAME) !== null && _a !== void 0 ? _a : "",
                password: (_b = process.env.ELASTIC_PASSWORD) !== null && _b !== void 0 ? _b : ""
            }
        });
    }
    else {
        client = new elasticsearch_1.Client({
            node: process.env.ELASTIC_URL,
        });
    }
    let exist = yield client.indices.exists({ index: esIndex });
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
    let isCreated = yield client.indices.create({
        index: esIndex,
        mappings: { "properties": {
                "location": {
                    "type": "geo_point"
                }
            } }
    });
    if (isCreated) {
        let result = yield client.bulk({
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
});
const complete = () => __awaiter(void 0, void 0, void 0, function* () {
    let bulk = yield extract();
    console.log("Result: ", bulk);
    yield upload(bulk);
});
require("dotenv").config();
complete().then((result) => {
    console.log("Result: ", result);
});
