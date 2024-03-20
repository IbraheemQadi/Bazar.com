const axios = require("axios");
const { json } = require("body-parser");
const express = require("express");
const fs = require("fs");
app.use(express.json());

const app = express();
const PORT = 3001;
let database;
let jsonData;

// Assuming your JSON file is named 'data.json'
const filePath = "../database.json";

// Read the file asynchronously

fs.readFile("../database.json", "utf8", (err, data) => {
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

app.put("/ORDER_WEBSERVICE_IP/purchase/:id", (req, res) => {
  const found = database.some(
    (database) => database.ID === parseInt(req.params.id)
  );
  if (found) {
    const dataToSend = parseInt(req.params.id);
    const serverUrl = "http://localhost:3005/cheack_id";

    axios
      .post(serverUrl, {
        number: dataToSend,
      })
      .then((response) => {
        if (response.data) {
          //  console.log("Data sent successfully:", dataToSend, response.data);
          // decremnt catalog
          database.forEach((Element) => {
            if (Element.ID === dataToSend) {
              Element.quantity = Element.quantity - 1;

              // res.json({ msg: "book update ", Element });
              // console.log(database);
            }
          });
          //update
          const updmemper = req.body;
          database.forEach((Element) => {
            if (Element.ID === parseInt(req.params.id)) {
              Element.price = updmemper.price ? updmemper.price : Element.price;
              Element.quantity = updmemper.quantity
                ? updmemper.quantity
                : Element.quantity;
              res.json({ msg: "book update ", Element });
              console.log(database);

              fs.writeFileSync("../database.json", JSON.stringify(database));
            }
          });
        }

        // Send the response here inside the Axios .then() block
      })
      .catch((error) => {
        console.error("Error sending data:", error);
        // Send an error response if there's an issue with Axios request
        res.status(500).json({ error: "Error sending data" });
      });
  } else {
    res.json("there are no id same u send");
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
