const express = require("express");
const _api = require("../lib/api_helper");
const router = express.Router();
const fs = require("fs");

// Getting Books and magazines
router.get("/", async (_, res) => {
  try {
    const csvData = await _api.getAllData();
    res.status(200).send(csvData);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// Get book or magazine by its ISBN / Authors Email
router.get("/search", async ({ query }, res) => {
  if (!query.data && !query.type) {
    return res
      .status(400)
      .json({ errMessage: "Both data and type are required." });
  }
  try {
    const csvData = await _api.getDataById(query.type, query.data);
    res.status(200).send(csvData);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// Get all books and magazines sort by title
router.get("/sort", async (_, res) => {
  try {
    const csvData = await _api.getSortedData();
    res.status(200).send(csvData);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// Add new book and magazine
router.post("/add", async ({ body, headers }, res) => {
  try {
    if (!body.book || !body.magazine) {
      return res
        .status(400)
        .json({ error: "Both book and magazine data required" });
    }
    const csvData = await _api.addNewData(
      body.book,
      body.magazine,
      headers["update-data"]
    );
    res.status(200).send(csvData);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// Download created csv file
router.get("/download", async ({ query }, res) => {
  let filepath = `Download/${query.file}`;
  try {
    if (fs.existsSync(filepath)) {
      res.status(200).download(filepath);
    } else {
      res.status(404).json({ message: "Oops, file does not exist." });
    }
  } catch (err) {
    res.status(500).json({
      message: "seems like server is on rest. Try sometime later",
      err,
    });
  }
});

module.exports = router;
