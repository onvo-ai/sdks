import { utils, write } from "xlsx";
import jsonexport from "jsonexport/dist";

export async function exportCSVFileServer(items: any[]) {
  var csv = await jsonexport(items);
  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  return blob;
}

export async function exportCSVFile(items: any[], fileTitle: string) {
  var exportedFilename = fileTitle + ".csv" || "export.csv";
  var blob = await exportCSVFileServer(items);

  var link = document.createElement("a");
  if (link.download !== undefined) {
    // feature detection
    // Browsers that support HTML5 download attribute
    var url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", exportedFilename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export async function exportExcelFileServer(items: any[]) {
  var ws = utils.json_to_sheet(items);
  var wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Data");
  /* generate array buffer */
  var wbout = write(wb, { type: "array", bookType: "xlsx" });
  /* create data URL */
  return new Blob([wbout], { type: "application/octet-stream" });
}

export async function exportExcelFile(items: any[], fileTitle: string) {
  let blob = await exportExcelFileServer(items);
  var url = URL.createObjectURL(blob);

  var exportedFilename = fileTitle + ".xlsx" || "export.xlsx";
  var link = document.createElement("a");

  console.log(exportedFilename);

  if (link.download !== undefined) {
    link.setAttribute("href", url);
    link.setAttribute("download", exportedFilename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function downloadURIToFile(uri: string, name: string) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const cleanCell = (str: string) => {
  const regex = /^\[(.+)\]\(#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\)/;
  const myMatch = (str + "").match(regex);
  if (myMatch) {
    const [_, value, color] = myMatch;
    return value;
  } else {
    return str;
  }
};
