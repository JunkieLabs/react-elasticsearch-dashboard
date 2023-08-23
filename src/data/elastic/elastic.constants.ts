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
        cities:{
            _: "cities",
            city:"city",
            location:"location",

        },
        pincodes:{
            _: "pincodes",
            pincode:"pincode",
            location:"location",

        }

    }

    
}
