export const ElasticConstants = {

    
    datatype : {
        number:"number",
        string:"string"
    },

    indexes:{

        testTime:{
           _: "test_time",
           age:"user_age",
           channelName:"channel_name",
           channelNumber:"channel_number",
           volume:"volume",
        },

        eventLogs:{
            _: "event_log",
            age:"users_age",
            channelName:"channel_name",
            channelNumber:"channel_number",
            volume:"volume",
            pincode:"pincode",
            bouquet:"bouquet_name",
            deviceId:"device_id",
            timestamp:"timestamp"
         },
        cities:{
            _: "cities",
            city:"city",
            location:"location",

        },
        pincodes:{
            _: "pincodes",
            pincode:"pincode",
            location:"location",

        },

      

    },

    checks:{
        device:{
            stateActive: "active",
            stateInActive: "inactive",
            stateConnected: "connected",
            stateAll: "all",

            timeOffsetActive: 4,//hour 
            timeOffsetConnected: 2,//hour

        }
    },

    configs:{
        timeSeriesInterval: 3 // hour
    }

    
}
