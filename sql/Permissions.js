const poolMYSQL = require("../config/db");

const getAllPermissions = (ownerID) => {
  return new Promise((resolve, reject) => {
    poolMYSQL.getConnection((err, conn) => {
      let sql =
        "SELECT * FROM `permissions` JOIN `users` ON `permissions`.`write_user_id`=`users`.id WHERE `user_id`=? ";
      let query = conn.query(sql, [ownerID], (err, result) => {
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

const addPermission = (userID, permissionsUserID) => {
  return new Promise((resolve, reject) => {
    poolMYSQL.getConnection((err, conn) => {
      let sql =
        "INSERT INTO  `permissions` (`user_id`,`write_user_id`) VALUES(?,?)";
      let query = conn.query(
        sql,
        [userID, permissionsUserID],
        (err, result) => {
          if (err) {
            reject(err);
          }
          conn.release();
          resolve((result = "ok"));
          // console.log(result);
        }
      );
    });
  });
};

const deletePermission = (userID, permissionsUserID) => {
  return new Promise((resolve, reject) => {
    poolMYSQL.getConnection((err, conn) => {
      let sql =
        "DELETE FROM  `permissions` WHERE `user_id`=? AND `write_user_id`= ? ";
      let query = conn.query(
        sql,
        [userID, permissionsUserID],
        (err, result) => {
          if (err) {
            reject(err);
          }
          conn.release();
          resolve((result = "ok"));
          // console.log(result);
        }
      );
    });
  });
};

const findPermission = (userID, permissionsUserID) => {
  return new Promise((resolve, reject) => {
    poolMYSQL.getConnection((err, conn) => {
      let sql =
        "SELECT * FROM  `permissions` WHERE `user_id`= ? AND write_user_id= ?";
      let query = conn.query(
        sql,
        [userID, permissionsUserID],
        (err, result) => {
          if (err) {
            reject(err);
          }
          conn.release();
          resolve(result);
          // console.log(result);
        }
      );
    });
  });
};

module.exports = {
  getAllPermissions,
  addPermission,
  deletePermission,
  findPermission,
};
