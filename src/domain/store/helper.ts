import { StoreConstants } from "./store.constants"

export const StoreHelper = {

    filterCommon : {
        genderToElasticGender: (gender: string): string | undefined => {

            if(gender == StoreConstants.filterCommon.gender.all){
                return undefined
            }else return gender;
 
        }
    },

   
}