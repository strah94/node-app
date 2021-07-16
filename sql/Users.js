const poolMYSQL = require("../config/db");

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    poolMYSQL.getConnection((err, conn) => {
      let sql = "SELECT * FROM `users` WHERE `email` = ?";
      let query = conn.query(sql, [email], (err, result) => {
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

const addUser = (firstName, lastName, email, password) => {
  let post = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
    role: "basic",
  };
  return new Promise((resolve, reject) => {
    poolMYSQL.getConnection((err, conn) => {
      let sql = `INSERT INTO users SET ?`;
      let query = conn.query(sql, post, (err, result) => {
        if (err) {
          reject(err);
        }
        conn.release();
        resolve((result = "ok"));
        //console.log(result)
      });
    });
  });
};

module.exports = { getUserByEmail, addUser };
