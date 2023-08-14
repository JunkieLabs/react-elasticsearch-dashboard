export const isNumeric = (val: string| number) : boolean => {
    return !isNaN(Number(val));
 }