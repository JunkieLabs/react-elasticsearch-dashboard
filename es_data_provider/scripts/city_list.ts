import XLSX from 'xlsx';
import fs from 'fs';
import { ClientOptions, Client } from '@elastic/elasticsearch';


export interface CityEntity {
    ['City Name']: string
    ['Latitude']: number
    ['Longitude']: number
}
const extract = async (): Promise<any[]> => {

    // Load the XLSX file
    const workbook = XLSX.readFile('data/city_list.xlsx');


    // Assume the first sheet is the one you want to work with
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Define the column names
    const columnNames = ['City Name', 'Latitude', 'Longitude'];


    // Convert XLSX data to an array of objects
    /**
     * any[]
     */
    const data = XLSX.utils.sheet_to_json<CityEntity>(worksheet, { header: columnNames });

    // console.log(data); // Array of objects with column data

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

        console.log("cityItem index: ", cityItem,)


        bulk.push({
            "index": {
                "_index": index,
                //   "_type": type
            }
        });
        bulk.push(document);
    }

    return bulk


}


const upload = async (bulk: any[]) => {

    console.log("Upload: ", process.env.ELASTIC_URL)


    const esIndex = 'cities';
    let client: Client;


    if (process.env.CA_64_CRT) {

        console.log("Upload 2: ", process.env.CA_64_CRT)

        client = new Client({
            node: process.env.ELASTIC_URL,
            tls: {
                ca: Buffer.from(process.env.CA_64_CRT, 'base64').toString('utf8'),
                checkServerIdentity: (host, cert) => {
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

    console.log("exits: ", exist)

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
        mappings: {
            "properties": {
                "location": {
                    "type": "geo_point"
                }
            }
        }
    });

    if (isCreated) {
        let result = await client.bulk({
            body: bulk
        })

        console.log("result: ", result)
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
}

const complete = async () => {
    let bulk = await extract()
    console.log("Result: ", bulk)
    await upload(bulk)

}

require("dotenv").config();




complete().then((result) => {
    console.log("Result: ", result)
});