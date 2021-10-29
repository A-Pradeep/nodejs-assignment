const express = require("express");
const fs = require("fs");
const { prepareCsv } = require("./lib/csv_helper");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const consoleRoutes = require("./Routes/console");

if (
  fs.existsSync("Data/authors.csv", "Data/magazines.csv", "Data/authors.csv")
) {
  // Prepare CSV Data
  prepareCsv();

  app.use("/console/", consoleRoutes);
  app.listen(port, () => {
    console.log("Server running on port " + port);
  });
} else {
  console.log("The CSV File does not exist");
}
