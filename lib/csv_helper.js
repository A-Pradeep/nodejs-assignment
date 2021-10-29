const fs = require("fs");
const converter = require("json-2-csv");

global.books = [];
global.authors = [];
global.magazines = [];

filePaths = ["books", "authors", "magazines"];

async function prepareCsvData() {
  filePaths.forEach((filePath) => {
    fs.readFile(`Data/${filePath}.csv`, function (err, data) {
      if (err) {
        throw ("An error occurred while reading the file.", err);
      }

      let csv = data.toString();
      converter
        .csv2jsonAsync(csv, { delimiter: { field: ";" } })
        .then((data) => {
          switch (filePath) {
            case "books":
              global.books = data;
              break;
            case "authors":
              global.authors = data;
              break;
            default:
              global.magazines = data;
              break;
          }
        })
        .catch((err) => {
          throw "ERROR: " + err.message;
        });
    });
  });
}

async function generateCsvData(data) {
  let new_date = new Date();
  let fileName = new_date.toISOString();
  converter
    .json2csvAsync(data, { delimiter: { field: ";", wrap: "", eol: "\n" } })
    .then(async (data) => {
      try {
        fs.writeFile(`Download/${fileName}.csv`, data, function (err) {
          if (err) {
            throw err;
          }
        });
      } catch (error) {
        throw error;
      }
    })
    .catch((err) => {
      throw "ERROR: " + err.message;
    });

  return {
    message: "New csv file has been created.",
    url: `http://${
      process.env.NODE_HOST || `localhost:${process.env.PORT || 3001}`
    }/console/download?file=${fileName}.csv`,
  };
}

module.exports.prepareCsv = prepareCsvData;
module.exports.generateCsv = generateCsvData;
