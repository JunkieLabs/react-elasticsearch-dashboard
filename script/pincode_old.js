const fs = require('fs');
const elasticsearch = require('elasticsearch');

const index = 'pincodes';
const type = 'pincodes';

const data = JSON.parse(fs.readFileSync('data/pincode.json'));

const bulk = [];

for (const pincode in data) {
  const document = {
    "pincode": pincode,
    "lat": data[pincode].lat,
    "lng": data[pincode].lng
  };

  bulk.push({
    "index": {
      "_index": index,
      "_type": type
    }
  });
  bulk.push(document);
}

const client = new elasticsearch.Client({
  host: '192.168.1.16:9200'
});

console.log("bulk: ", bulk[1])

// client.bulk({
//   body: bulk
// }, (err, res) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log('Documents added successfully');
//   }
// });