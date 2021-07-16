const mysql = require("mysql");

const poolMYSQL = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "node_app",
});

module.exports = poolMYSQL;
