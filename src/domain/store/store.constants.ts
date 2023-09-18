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

    loadingStage: {
        initial: 1,
        loading: 2,
        loaded: 3
    
    }

    

}