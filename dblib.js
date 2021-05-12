// Add packages
require("dotenv").config();
// Add database package and connection string
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

//function to get the total records of books in the database
const getTotalRecords = () => {
  sql = "SELECT COUNT(*) FROM book";
  return pool.query(sql)
    .then(result => {
      return {
        msg: "success",
        totRecords: result.rows[0].count
      }
    })
    .catch(err => {
      return {
        msg: `Error: ${err.message}`
      }
    });
};

const importbooks = async (lines) => {

  const sql = "INSERT INTO book (book_id, title, total_pages, rating, isbn, published_date) VALUES ($1, $2, $3, $4, $5, $6)";

  let totalCount = 0;
  let successCount = 0;
  let errorCount = 0;
  let errorList = [];

  for (line of lines) {

    book = line.split(",");



    bookarray = [];

    book.forEach(bookElement => {
      if (bookElement === "Null") {
        bookarray.push(bookElement.toLowerCase())
      }
      else {
        bookarray.push(bookElement)
      }
    })

    console.log(bookarray);

    await pool.query(sql, bookarray)
      .then(result => {

        totalCount += 1;
        successCount += 1;

      })
      .catch(err => {

        totalCount += 1;
        errorCount += 1;
        message = `Customer ID: ${customer[0]} - ` + err;
        //console.log(message);
        errorList.push(message)
      });
  };

  return {
    totalCount: totalCount,
    successCount: successCount,
    errorCount: errorCount,
    errorList: errorList
  }
}

module.exports.getTotalRecords = getTotalRecords;
module.exports.importbooks = importbooks;