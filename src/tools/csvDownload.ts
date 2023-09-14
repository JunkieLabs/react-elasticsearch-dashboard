import { mkConfig, generateCsv, download } from "export-to-csv";


export const exportToCsv2 = (filename: string, rows: any[]) => {


    // mkConfig merges your options with the defaults
    // and returns WithDefaults<ConfigOptions>
    const csvConfig = mkConfig({ useKeysAsHeaders: true, filename:filename });
    // Converts your Array<Object> to a CsvOutput string based on the configs
    const csv = generateCsv(csvConfig)(rows);

    download(csvConfig)(csv)

}

// export const exportToCsv = (filename: string, rows: any[], ) => {
//     var processRow = (row: any) => {
//         var finalVal = '';
//         for (var j = 0; j < row.length; j++) {
//             var innerValue = row[j] === null ? '' : row[j].toString();
//             if (row[j] instanceof Date) {
//                 innerValue = row[j].toLocaleString();
//             };
//             var result = innerValue.replace(/"/g, '""');
//             if (result.search(/("|,|\n)/g) >= 0)
//                 result = '"' + result + '"';
//             if (j > 0)
//                 finalVal += ',';
//             finalVal += result;
//         }
//         return finalVal + '\n';
//     };

//     var csvFile = '';
//     for (var i = 0; i < rows.length; i++) {
//         csvFile += processRow(rows[i]);
//     }

//     var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
//     // if (navigator.msSaveBlob) { // IE 10+
//     //     navigator.msSaveBlob(blob, filename);
//     // } else {
//     //     var link = document.createElement("a");
//     //     if (link.download !== undefined) { // feature detection
//     //         // Browsers that support HTML5 download attribute
//     //         var url = URL.createObjectURL(blob);
//     //         link.setAttribute("href", url);
//     //         link.setAttribute("download", filename);
//     //         link.style.visibility = 'hidden';
//     //         document.body.appendChild(link);
//     //         link.click();
//     //         document.body.removeChild(link);
//     //     }
//     // }

//     const link = document.createElement('a');
//     if(window && (typeof window !== "undefined") ){
//         link.href = (window as any).URL.createObjectURL(blob);
//         link.download = `${filename}.csv`;
//         document.body.appendChild(link);
//         link.click();
//     }

// }