const axios = require("axios");
const { json } = require("body-parser");
const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3001;
let database;
let jsonData;

// Assuming your JSON file is named 'data.json'
app.use(express.json());

app.put("/ORDER_WEBSERVICE_IP/purchase/:id", (req, res) => {
  const dataToSend = parseInt(req.params.id);
  const serverUrl = "http://localhost:3005/cheack_id";
  const data = { number: dataToSend };
  const updmemper = req.body;
  const aggregatedData = { data, updmemper };
  console.log(aggregatedData);
  axios

    .post(serverUrl, aggregatedData)
    .then((response) => {
      res.json(response.data);

      /*  if (response.data) {
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
      }*/

      // Send the response here inside the Axios .then() block
    })
    .catch((error) => {
      console.error("Error sending data:", error);
      // Send an error response if there's an issue with Axios request
      res.status(500).json({ error: "Error sending data" });
    });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
