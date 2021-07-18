const poolMYSQL = require("../config/db");

const getAllPosts = () => {
  return new Promise((resolve, reject) => {
    poolMYSQL.getConnection((err, conn) => {
      let sql = "SELECT * FROM `posts`";
      let query = conn.query(sql, (err, result) => {
        if (err) {
          reject(err);
        }
        conn.release();
        resolve(result);
        // console.log(result);
      });
    });
  });
};

const addPost = (title, postText, userID) => {
  return new Promise((resolve, reject) => {
    poolMYSQL.getConnection((err, conn) => {
      let sql =
        "INSERT INTO  `posts` (`post_title`,`post_text`,`owner_id`,`edited`) VALUES(?,?,?,0)";
      let query = conn.query(sql, [title, postText, userID], (err, result) => {
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

module.exports = { getAllPosts, addPost };
