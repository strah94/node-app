import React, { useEffect, useContext, Fragment, useState } from "react";
import AuthContext from "../../context/auth/authContext";
import PostsContext from "../../context/posts/postsContext";
import axios from "axios";

const PermissionsModal = () => {
  const authContext = useContext(AuthContext);
  const postsContext = useContext(PostsContext);

  const [allUsers, setAllUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const { user } = authContext;
  const {
    getAllPermissions,
    usersPermissions,
    permissionsModal,
    hidePermissionsModal,
    addPermission,
    deletePermission,
  } = postsContext;

  useEffect(async () => {
    if (user) {
      getAllPermissions(user.id);
      user.role == "admin" && setIsAdmin(true);

      const res = await axios.get("/api/users", {});
      const users = await res.data;
      setAllUsers(users);
    }
  }, [user]);

  useEffect(() => {
    user && getAllPermissions(user.id);
  }, []);

  const handleOnChange = (e) => {
    addPermission(user.id, e.target.value);
    getAllPermissions(user.id);
  };

  const handleOnHide = (e) => {
    console.log("handle on hide");
  };

  const handleOnClick = (e) => {
    deletePermission(e.target.value);
    getAllPermissions(user.id);
  };

  return (
    <Fragment>
      {permissionsModal && (
        <div className="modal">
          <button className="delete-post" onClick={hidePermissionsModal}>
            X
          </button>
          <p>Users that can edit your posts:</p>
          {usersPermissions &&
            usersPermissions.map((user, index) => (
              <div style={{ display: "flex" }} key={index}>
                <p>{user.first_name}</p>
                <button
                  className="remove-permission"
                  value={user.id}
                  onClick={handleOnClick}
                >
                  X
                </button>
              </div>
            ))}

          <select onChange={handleOnChange} className="select" defaultValue="">
            <option value="" disabled>
              Add new permission
            </option>
            {allUsers.map((user, index) => {
              return (
                <option value={user.id} key={index}>
                  {user.first_name}
                </option>
              );
            })}
          </select>

          {isAdmin && (
            <div>
              <p>Hidden users:</p>
              <select
                onChange={handleOnHide}
                className="select"
                defaultValue=""
              >
                <option value="" disabled>
                  Hide users
                </option>
                {allUsers.map((user, index) => {
                  return (
                    <option value={user.id} key={index}>
                      {user.first_name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default PermissionsModal;
