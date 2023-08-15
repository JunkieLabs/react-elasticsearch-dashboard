export const isNumeric = (val: string| number) : boolean => {
    return !isNaN(Number(val));
 }

 export const parsePaths = (val: string): string[] =>{
    var paths = val.split("/").filter(val => val ? true : false);

    return paths;
      
 }