# Steps to put data on elastic search


1. add City list

```
$ node city_list.js

```


2. add indexing data: at event_logs 

- make sure of setting as:

```javascript
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

```