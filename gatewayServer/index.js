const axios = require("axios");
const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.get("/CATALOG_WEBSERVICE_IP/info/:id", (req, res) => {
  const dataToSend = parseInt(req.params.id);
  const serverUrl = "http://localhost:3005/id";

  axios
    .post(serverUrl, {
      number: dataToSend,
    })
    .then((response) => {
      console.log("Data sent successfully:", dataToSend);
      // Send the response here inside the Axios .then() block
      res.json(response.data);
    })
    .catch((error) => {
      console.error("Error sending data:", error);
      // Send an error response if there's an issue with Axios request
      res.status(500).json({ error: "Error sending data" });
    });
});
/// serch to topic
app.get("/CATALOG_WEBSERVICE_IP/search/:topic", (req, res) => {
  const dataToSend = req.params.topic;
  const serverUrl = "http://localhost:3005/topic";
  axios
    .post(serverUrl, {
      topic: dataToSend,
    })
    .then((response) => {
      console.log("Data sent successfully:", dataToSend);
      // Send the response here inside the Axios .then() block
      res.json(response.data);
    })
    .catch((error) => {
      console.error("Error sending data:", error);
      // Send an error response if there's an issue with Axios request
      res.status(500).json({ error: "Error sending data" });
    });
});
///// for update

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
