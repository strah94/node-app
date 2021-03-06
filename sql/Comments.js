const poolMYSQL = require("../config/db");

const getAllComments = () => {
  return new Promise((resolve, reject) => {
    poolMYSQL.getConnection((err, conn) => {
      let sql =
        "SELECT * FROM `comments` JOIN `users` ON `comments`.`owner_id`=`users`.`id`";
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

const deleteComments = (postID) => {
  return new Promise((resolve, reject) => {
    poolMYSQL.getConnection((err, conn) => {
      let sql = "DELETE FROM `comments` WHERE `post_id`= ? ";
      let query = conn.query(sql, [postID], (err, result) => {
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

module.exports = { getAllComments, addComment, deleteComments };
