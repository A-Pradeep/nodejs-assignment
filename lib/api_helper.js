const { generateCsv } = require("./csv_helper");

const _getCombinedData = async () => {
  return [...global.books, ...global.magazines];
};

exports.getAllData = async () => {
  let combinedCsv = {
    books: global.books,
    magazines: global.magazines,
  };
  return combinedCsv;
};

exports.getDataById = async (queryType, queryId) => {
  let combinedData = await _getCombinedData();
  const filteredData = combinedData.filter((element) =>
    element[queryType].includes(queryId)
  );
  return filteredData;
};

exports.getSortedData = async () => {
  let combinedData = await _getCombinedData();
  return combinedData.sort((a, b) => a.title.localeCompare(b.title));
};

exports.addNewData = async (bookData, magazineData, updateData = false) => {
  let combinedCsv = {
    books: [...global.books, bookData],
    magazines: [...global.magazines, magazineData],
  };
  if (updateData) {
    global.books = combinedCsv.books;
    global.magazines = combinedCsv.magazines;
  }

  const result = await generateCsv(combinedCsv);
  return result;
};
