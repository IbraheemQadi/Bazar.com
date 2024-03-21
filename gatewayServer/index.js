const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

const CATALOG_SERVER_URL = "http://localhost:3001";
const ORDER_SERVER_URL = "http://localhost:3002";

app.get("/", (req, res) => {
  res.send("Gateway server is running");
});

app.get("/search/:topic", (req, res) => {
  const topic = req.params.topic;
  const requestURL = `${CATALOG_SERVER_URL}/search/${encodeURIComponent(
    topic
  )}`;

  axios
    .get(requestURL)
    .then((response) => res.json(response.data))
    .catch((error) => res.status(500).json({ error: error.message }));
});

app.get("/info/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const requestURL = `${CATALOG_SERVER_URL}/info/${bookId}`;

  axios
    .get(requestURL)
    .then((response) => res.json(response.data))
    .catch((error) => res.status(500).json({ error: error.message }));
});

app.post("/purchase/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const requestURL = `${ORDER_SERVER_URL}/purchase/${bookId}`;

  axios
    .post(requestURL)
    .then((response) => res.json(response.data))
    .catch((error) => res.status(500).json({ error: error.message }));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
