export const StoreConstants = {

    filterCommon : {
        ageRange:[0, 100], 
        gender: {
            all: "All",
            male: "Male",
            female: "Female",
            other: "Others"
        }
    },

    configuration:{

        filters:{
            filterAge: "age",
            filterGender: "gender",
            filterRegion: "region",
            filterPincode: "pincode",
            filterBouquet: "bouquet"
        }


    },

    channelPerformance:{
        filters:{
            plotBouquetIdentifier:"bouquet",
            plotChannelIdentifier:"channel",
            
        }
    },

    reportGeneration: {
        stage: {
            initial: 1,
            loading: 2,
            loaded: 3
        }
    },

    auth:{
        stage:{
            
            initial: 0,
            loaded: 1
        }
       
    },
    initialStage: {
        initial: 1,
        loaded: 2
    
    },
    loadingStage: {
        loading: 2,
        loaded: 3
    
    },
    runningStage:{
        notRunning: 0,
        running: 1,
        completed: 2
    }

    

}