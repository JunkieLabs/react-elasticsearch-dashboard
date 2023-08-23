const XLSX = require('xlsx');
const fs = require('fs');
const elasticsearch = require('elasticsearch');

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
const data = XLSX.utils.sheet_to_json(worksheet, { header: columnNames });

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
  
console.log("cityItem index: ", cityItem, )


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


if(client.indices.exists({index: index})){

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
        "location": {
          "type": "geo_point"
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