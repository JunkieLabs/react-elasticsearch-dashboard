const fs = require('fs');
const elasticsearch = require('elasticsearch');

const index = 'pincodes';
// const type = 'pincodes';
const type = 'geo_points';
const data = JSON.parse(fs.readFileSync('data/pincode.json'));

const bulk = [];

for (const pincode in data) {
  const document = {
    "pincode": pincode,
    "location": {
      "lat": data[pincode].lat,
      "lon": data[pincode].lng
    }
    // "_type":type
  };

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

client.indices.delete({
  index: 'pincodes'
}, (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Index deleted successfully');
  }
});

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