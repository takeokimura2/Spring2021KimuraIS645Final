// Add required packages
const express = require("express");
const app = express();
const dblib = require("./dblib.js");

require('dotenv').config()

const multer = require("multer");
const upload = multer();

// Set up EJS
app.set("view engine", "ejs");

// Add database package and connection string (can remove ssl)
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Start listener
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started (http://localhost:3000/) !");
});

// Setup routes
app.get("/", (req, res) => {
  //res.send ("Hello world...");
  res.render("index");
});

//sum of series tab
app.get("/sumofseries", async (req, res) => {
  // Omitted validation check
  //const totRecs = await dblib.getTotalRecords();

  //Create an empty input object (To populate form with values)
  const input = {
    startnumber: "",
    endnumber: "",
    increment: "",
  };

  res.render("sumofseries", {
    type: "get",
    input: input,
  });
});


app.post("/sumofseries", async (req, res) => {


  //console.log("sum of series user input is: ", req.body)

});


app.get("/import", async (req, res) => {

  const totRecs = await dblib.getTotalRecords();

  res.render("import", {
    type: "get",
    totRecs: totRecs.totRecords,
  });
});

app.post("/import", upload.single('filename'), async (req, res) => {
  if (!req.file || Object.keys(req.file).length === 0) {
    message = "Error: Import file not uploaded";
    return res.send(message);
  };
  //Read file line by line, inserting records
  const buffer = req.file.buffer;
  const lines = buffer.toString().split(/\r?\n/);

  console.log(lines);

  const totRecs = await dblib.getTotalRecords();

  importResult = dblib.importbooks(lines)
    .then(result => {
      console.log("result from importbooks is:", result);

      res.render("import", {
        type: "post",
        totRecs: totRecs.totRecords,
        totalCount: result.totalCount,
        successCount: result.successCount,
        errorCount: result.errorCount,
        errorList: result.errorList,
        msg: "success",
      })
    })
    .catch(err => {
      console.log("error detail:", result);
      res.render("import", {
        type: "post",
        msg: `Error: ${err.message}`,
      });
    });

})