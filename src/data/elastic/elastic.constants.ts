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
            _: "test_script",
            age:"users_age",
            channelName:"channel_name",
            channelNumber:"channel_number",
            volume:"volume",
            location:"location",
            pincode:"pincode",
            gender:"users_gender",
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

        },
        gender: {
            all:"_",
            male: "Male",
            female: "Female",
            other: "Others"
        },
        aggs: {
            subAggsType:{
                byDay: "byDay"
            }
        }
    },

    configs:{
        timeSeriesInterval: 3 // hour
    }

    
}
