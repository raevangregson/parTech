const express = require('express');
const bodyParser = require('body-parser');
const https = require("https");
var cors = require('cors')
const url = "https://www.partechgss.com/inventory";

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/inventory', (req, res) => {
    let body = "";
    https.get(url, httpRes => {
        httpRes.setEncoding("utf8");
        httpRes.on("data", data => {
          body += data;
        });
        httpRes.on("end", () => {
          res.send(body.toString('utf8'))
        })
      });
});

app.listen(3000, () =>
  console.log('Express server is running on localhost:3000')
);
    
