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

const addComment = (text, postID, userID) => {
  return new Promise((resolve, reject) => {
    poolMYSQL.getConnection((err, conn) => {
      let sql =
        "INSERT INTO  `comments` (`post_id`,`comment_text`,`owner_id`) VALUES(?,?,?)";
      let query = conn.query(sql, [postID, text, userID], (err, result) => {
        if (err) {
          reject(err);
        }
        conn.release();
        resolve((result = "ok"));
        // console.log(result);
      });
    });
  });
};

module.exports = { getAllComments, addComment };
