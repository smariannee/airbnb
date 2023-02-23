const mysql = require("mysql");
require("dotenv").config();

const client = mysql.createPool({
  connectionLimit: 5,
  host: "airbnb.ct0ai2w9hlpl.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "rootroot",
  database: "airbnb",
  port: 3306
});

const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    client.getConnection((err, conn) => {
      console.log("ccc "+err)
      if (err) reject(err);
      conn.query(sql, params, (err, rows) => {
        console.log("ccc "+err)
        if (err) reject(err);
        conn.release();
        resolve(rows);
      });
    });
  });
};

module.exports = { query };
