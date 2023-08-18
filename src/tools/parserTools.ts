export const isNumeric = (val: string | number): boolean => {
   return !isNaN(Number(val));
}

export const parsePaths = (val: string): string[] => {
   var paths = val.split("/").filter(val => val ? true : false);

   return paths;

}


interface ToNumberOptions {
   default?: number;
   min?: number;
   max?: number;
}

export class TransformHelper {

   static toLowerCase(value: string): string {
      return value.toLowerCase();
   }

   static trim(value: string): string {
      return value.trim();
   }

   static toDate(value: string): Date {
      return new Date(value);
   }

   static toBoolean(value: string): boolean {
      value = value.toLowerCase();

      return value === "true" || value === "1" ? true : false;
   }

   static toNumber(value?: string, opts: ToNumberOptions = {}): number {
      let newValue: number = Number.parseInt(value || String(opts.default), 10);

      if (Number.isNaN(newValue)) {
         newValue = opts.default ?? 0;
      }

      if (opts.min) {
         if (newValue < opts.min) {
            newValue = opts.min;
         }
      }
      if (opts.max) {
         if (newValue > opts.max) {
            newValue = opts.max;
         }
      }

      console.log("tonumber: ", newValue)

      return newValue;
   }

}