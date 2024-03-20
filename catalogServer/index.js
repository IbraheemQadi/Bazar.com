// Import necessary modules
const express = require("express");
const bodyParser = require("body-parser");
// Create an Express application
const app = express();
app.use(bodyParser.json());
let database;
let jsonData;

// Assuming your JSON file is named 'data.json'
const filePath = "database.json";

// Read the file asynchronously
const fs = require("fs");
fs.readFile("database.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  try {
    // Parse the JSON data
    jsonData = JSON.parse(data);
    database = Object.values(jsonData);

    // Now 'jsonData' contains the contents of your JSON file
    //console.log(jsonData);
  } catch (error) {
    console.error("Error parsing JSON data:", error);
  }
});
// Define a route handler for the POST request to /receive
app.post("/id", (req, res) => {
  const dataToSend = req.body.number;

  const found = database.some((database) => database.ID === dataToSend);

  console.log(found);
  console.log(dataToSend);
  if (found) {
    const filteredData = database
      .filter((item) => {
        return item.ID === dataToSend;
      })
      .map((item) => ({
        title: item.title,
        quantity: item.quantity,
        price: item.price,
      }));
    //const a = json.parse(filteredData);
    res.send(filteredData);
  } else {
    res.send("No ID same u send");
  }
});
/// for topic
app.post("/topic", (req, res) => {
  const dataToSend = req.body.topic;
  if (database.some((item) => item.topic.includes(dataToSend))) {
    const filteredData = database
      .filter((item) => item.topic.includes(dataToSend))
      .map((item) => ({
        ID: item.ID,
        title: item.title,
        // Add other properties as needed
      }));
    console.log("filter data =", filteredData);

    res.send(filteredData);
  } else {
    res.send("there is No topic same u send");
  }
});
// cheak id
app.post("/cheack_id", (req, res) => {
  const dataToSend = req.body.number;

  const found = database.some((database) => database.ID === dataToSend);
  res.send(found);
});

// Start the server
const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
