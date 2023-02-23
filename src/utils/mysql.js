const mysql = require("mysql");
require("dotenv").config();

const client = mysql.createPool({
  connectionLimit: 5,
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
  port: process.env.RDS_PORT,
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
