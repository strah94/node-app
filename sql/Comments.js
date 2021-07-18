const poolMYSQL = require("../config/db");

const getAllComments = () => {
  return new Promise((resolve, reject) => {
    poolMYSQL.getConnection((err, conn) => {
      let sql = "SELECT * FROM `comments`";
      let query = conn.query(sql, (err, result) => {
        if (err) {
          reject(err);
        }
        conn.release();
        resolve(result);
        console.log(result);
      });
    });
  });
};

module.exports = { getAllComments };
